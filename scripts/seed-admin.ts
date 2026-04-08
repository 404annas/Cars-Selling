/**
 * seed-admin.ts — Creates the initial admin user in MongoDB
 *
 * Run ONCE after first deploy:
 *   npm run seed-admin
 *
 * Set these in .env.local before running:
 *   MONGODB_URI=...
 *   ADMIN_EMAIL=admin@elitemotorcars.com.au
 *   ADMIN_PASSWORD=your_secure_password
 *   ADMIN_NAME=Admin
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@elitemotorcars.com.au";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@123!";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin";

if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not defined in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  passwordHash: String,
  name: String,
  role: { type: String, default: "admin" },
}, { timestamps: true });

async function seedAdmin() {
  console.log("🔐  Seeding admin user...\n");
  await mongoose.connect(MONGODB_URI);

  const UserModel = mongoose.models.User ?? mongoose.model("User", UserSchema);

  const existing = await UserModel.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`  ⚠️  Admin already exists: ${ADMIN_EMAIL}`);
    console.log("     To reset the password, delete the user from MongoDB and re-run.\n");
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await UserModel.create({
    email: ADMIN_EMAIL,
    passwordHash,
    name: ADMIN_NAME,
    role: "superadmin",
  });

  console.log(`  ✅  Admin user created!`);
  console.log(`     Email   : ${ADMIN_EMAIL}`);
  console.log(`     Password: ${ADMIN_PASSWORD}`);
  console.log(`     Role    : superadmin\n`);
  console.log("  ⚠️  IMPORTANT: Change this password immediately after first login!\n");

  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error("❌  seed-admin failed:", err);
  mongoose.disconnect().catch(() => {});
  process.exit(1);
});
