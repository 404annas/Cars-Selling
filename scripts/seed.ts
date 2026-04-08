/**
 * seed.ts — Migrates static car data into MongoDB using Cloudinary image URLs
 * ─────────────────────────────────────────────────────────────────────────────
 * Run AFTER upload-images.ts:
 *   1. npm run upload-images   (uploads images → produces cloudinary-map.json)
 *   2. npm run seed            (seeds MongoDB using Cloudinary URLs)
 */

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// ── Load Cloudinary URL map ────────────────────────────────────────────────

const MAP_PATH = path.resolve(process.cwd(), "scripts/cloudinary-map.json");
if (!fs.existsSync(MAP_PATH)) {
  console.error(
    "❌  scripts/cloudinary-map.json not found.\n" +
      "   Run `npm run upload-images` first to upload images to Cloudinary.",
  );
  process.exit(1);
}

const cloudinaryMap: Record<string, string> = JSON.parse(
  fs.readFileSync(MAP_PATH, "utf-8"),
);

/**
 * Resolve one or more filenames to their Cloudinary URLs.
 * Falls back to the raw filename string if not found in the map.
 */
function resolveImages(...filenames: string[]): string[] {
  return filenames.map((f) => {
    const url = cloudinaryMap[f];
    if (!url) {
      console.warn(
        `  ⚠️  No Cloudinary URL for "${f}" — using filename as fallback`,
      );
    }
    return url ?? f;
  });
}

// ── Raw static car data — defines image filenames per car ─────────────────

interface RawCar {
  id: number;
  name: string;
  tagline: string;
  price: string;
  description: string;
  specs: {
    mileage: string;
    engine: string;
    transmission: string;
    fuel: string;
    year: string;
    color: string;
  };
  highlights: string[];
  imageFiles: string[]; // asset filenames — resolved to Cloudinary URLs at seed time
  dealer: string;
  dealerLocation: string;
  license: string;
}

const rawCars: RawCar[] = [
  {
    id: 0,
    name: "2007 Mitsubishi Lancer Evolution X GSR RYUSHON",
    tagline: "1 Year rego + Ctp",
    price: "34,999",
    description:
      "This is not your average Evo. A proper, clean, Evo X built on the legendary CZ4A chassis With some mods —raw performance, razor-sharp handling, and pure JDM aggression.",
    specs: {
      mileage: "94,800 km",
      engine: "2.0L",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2007",
      color: "Red",
    },
    highlights: [
      "2x orignal keys",
      "5 Years mechanical Warranty",
      "Aftermarket HKS Exhaust",
      "Upgraded intake's & Turbo piping",
      "HKS Cone performance air filter",
      "BlitzTurbo boost guage",
      "Brembo brakes",
      "Work emotion wheels – lightweight, aggressive stance",
      "Recaro Leather bucket seats – race-ready support",
      "Iconic Evo AWD performance & turbo power",
      "Engine: 4B11T 2.0L DOHC Turbocharged Inline-4 (MIVEC)",
      "Drivetrain: Full-time AWC (All Wheel Control)",
    ],
    imageFiles: [
      "car37.jpeg",
      "car37-7.jpeg",
      "car37-9.jpeg",
      "car37-2.jpeg",
      "car37-1.jpeg",
      "car37-8.jpeg",
      "car37-12.jpeg",
      "car37-3.jpeg",
      "car37-4.jpeg",
      "car37-5.jpeg",
      "car37-6.jpeg",
      "car37-10.jpeg",
      "car37-11.jpeg",
      "car37-13.jpeg",
      "car37-14.jpeg",
      "car37-15.jpeg",
      "car37-16.jpeg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 1,
    name: "2007 LEXUS LS600H V8 5000CC",
    tagline: "5 Year's warranty for peace of mind",
    price: "29,999",
    description:
      "This 2007 Lexus LS600h is a rare find in such immaculate condition. With only 89,000 km on the odometer, this vehicle has been meticulously cared for and maintained.",
    specs: {
      mileage: "89,000 km",
      engine: "5.0L Hybrid",
      transmission: "Hybrid",
      fuel: "Hybrid",
      year: "2007",
      color: "Black",
    },
    highlights: [
      "6 months rego & Ctp",
      "439hp stock",
      "Full Aimgain body kit",
      "Rare spec in prestine condition",
      "Mark levinson Sound system",
      "Adjustable suspension",
      "Soft closing doors",
      "3x keys (2x remote 1x card)",
      "Dual-zone automatic Climate Control",
      "Power-Adjustable Front Seats",
      "Keyless Entry & Push-button start",
      "Pre-Collision System",
      "Lane Departure Alert",
      "Adaptive Cruise Control",
      "Premium wood trim",
      "Finance available",
    ],
    imageFiles: [
      "car34-1.jpg",
      "car34-2.jpg",
      "car34-3.jpg",
      "car34-4.jpg",
      "car34-5.jpg",
      "car34-6.jpg",
      "car34-7.jpg",
      "car34-8.jpg",
      "car34-9.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 2,
    name: "2007 LEXUS LS460 V8 4600CC",
    tagline: "5 years extended warranty",
    price: "21,999",
    description:
      "This 2007 Lexus LS460 is a timeless luxury sedan offering a perfect blend of performance, comfort, and reliability. With only 99,000 km on the odometer.",
    specs: {
      mileage: "99,000 km",
      engine: "4.6L Automatic",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2007",
      color: "White",
    },
    highlights: [
      "Auction Grade 4B",
      "360 parking sensors",
      "Adjustable suspension",
      "Soft closing doors",
      "Full service history & log books",
      "2x keys",
      "Leather Interior",
      "Dual-zone automatic Climate Control",
      "Power-Adjustable Front Seats",
      "Memory Front Seats",
      "Heated & Ventilated Front Seats + Rear seats",
      "Keyless Entry & Push-button start",
      "Pre-Collision System",
      "Lane Departure Alert",
      "Adaptive Cruise Control",
      "Premium wood trim",
      "7 Driving modes",
      "Rear recliner seats",
      "10 Air bags",
    ],
    imageFiles: [
      "car35-1.jpg",
      "car35-2.jpg",
      "car35-3.jpg",
      "car35-4.jpg",
      "car35-5.jpg",
      "car35-6.jpg",
      "car35-7.jpg",
      "car35-8.jpg",
      "car35-9.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 3,
    name: "2013 Toyota Prius Hybrid",
    tagline: "3 months Rego + CTP Included",
    price: "14,999",
    description:
      "This 2013 Toyota Prius Hybrid is a reliable and fuel-efficient hybrid vehicle. With only 138,000 km on the odometer, it's in excellent condition.",
    specs: {
      mileage: "138,000 km",
      engine: "1.8L Hybrid",
      transmission: "Hybrid",
      fuel: "Hybrid",
      year: "2013",
      color: "White",
    },
    highlights: [
      "Reliable and fuel efficient",
      "2x Keys",
      "Keyless Entry with Push Button Start",
      "Dual-Zone Climate Control",
      "Automatic Folding Mirrors",
      "3 Driving Modes: Power, Eco & EV",
      "Full Log Books & Complete Service History",
      "1,3 & 5 Years Hybrid Battery Warranty Available",
      "Finance Available",
      "Rent to own Available",
    ],
    imageFiles: [
      "car36-1.jpg",
      "car36-2.jpg",
      "car36-3.jpg",
      "car36-4.jpg",
      "car36-5.jpg",
      "car36-6.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  // ── SOLD CARS ──────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Toyota Prius 2011",
    tagline: "Reliable Hybrid Technology - Excellent Economy",
    price: "SOLD",
    description:
      "SOLD - This 2011 Toyota Prius represents the gold standard in hybrid efficiency. Perfect for city driving and long commutes alike.",
    specs: {
      mileage: "64,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2011",
      color: "Pearl White",
    },
    highlights: [
      "Push Button Start",
      "Reverse Camera",
      "Keyless Entry",
      "Climate Control",
      "Bluetooth Connectivity",
    ],
    imageFiles: [
      "car1-1.avif",
      "car1-2.avif",
      "car1-3.avif",
      "car1-4.avif",
      "car1-5.avif",
      "car1-6.avif",
      "car1-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 5,
    name: "Toyota Crown Sedan 2010",
    tagline: "Luxury Meets Reliability - V6 Power",
    price: "SOLD",
    description:
      "SOLD - Experience true luxury with the Toyota Crown. This sedan offers a whisper-quiet cabin and premium materials.",
    specs: {
      mileage: "89,000 km",
      engine: "3.5L V6",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2010",
      color: "Black",
    },
    highlights: [
      "Leather Seats",
      "Electric Power Seats",
      "Soft Close Doors",
      "Premium Sound System",
      "Cruise Control",
    ],
    imageFiles: [
      "car2-1.avif",
      "car2-2.avif",
      "car2-3.avif",
      "car2-4.avif",
      "car2-5.avif",
      "car2-6.avif",
      "car2-7.avif",
      "car2-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 6,
    name: "Honda Vezel 2014",
    tagline: "Compact SUV with Hybrid Efficiency",
    price: "SOLD",
    description:
      "SOLD - The Honda Vezel (HR-V) combines the practicality of an SUV with the fuel efficiency of a hybrid hatch.",
    specs: {
      mileage: "99,000 km",
      engine: "1.5L Hybrid",
      transmission: "Automatic",
      fuel: "Hybrid",
      year: "2014",
      color: "Silver",
    },
    highlights: [
      "Magic Seats",
      "Sport Mode",
      "Paddle Shifters",
      "Touchscreen Display",
      "LED Headlights",
    ],
    imageFiles: [
      "car3-1.avif",
      "car3-2.avif",
      "car3-3.avif",
      "car3-4.avif",
      "car3-5.avif",
      "car3-6.avif",
      "car3-7.avif",
      "car3-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 7,
    name: "LEXUS LS460 V8 2012",
    tagline: "The Pinnacle of Japanese Luxury",
    price: "SOLD",
    description:
      "SOLD - A flagship luxury sedan powered by a silky smooth V8 engine.",
    specs: {
      mileage: "93,000 km",
      engine: "4.6L V8",
      transmission: "8-Speed Auto",
      fuel: "Petrol",
      year: "2012",
      color: "Black",
    },
    highlights: [
      "Mark Levinson Audio",
      "Heated/Cooled Seats",
      "Sunroof",
      "Air Suspension",
      "Radar Cruise Control",
    ],
    imageFiles: [
      "car4-1.avif",
      "car4-2.avif",
      "car4-3.avif",
      "car4-4.avif",
      "car4-5.avif",
      "car4-6.avif",
      "car4-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 8,
    name: "Lexus LS460 2006 V8 Luxury",
    tagline: "Classic V8 Power and Comfort",
    price: "SOLD",
    description: "SOLD - An iconic model that redefined the luxury market.",
    specs: {
      mileage: "135,000 km",
      engine: "4.6L V8",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2006",
      color: "Silver",
    },
    highlights: [
      "Wood Grain Trim",
      "Memory Seats",
      "Rear Shade",
      "Parking Sensors",
      "Dual Zone Climate",
    ],
    imageFiles: [
      "car5-1.avif",
      "car5-2.avif",
      "car5-3.avif",
      "car5-4.avif",
      "car5-5.avif",
      "car5-6.avif",
      "car5-7.avif",
      "car5-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 9,
    name: "Mitsubishi Lancer Evolution 2007",
    tagline: "Rally Bred Performance Icon",
    price: "SOLD",
    description:
      "SOLD - A legend of the streets with raw turbocharged performance.",
    specs: {
      mileage: "50,200 km",
      engine: "2.0L Turbo",
      transmission: "Dual-Clutch",
      fuel: "Petrol",
      year: "2007",
      color: "Red",
    },
    highlights: [
      "Recaro Seats",
      "Brembo Brakes",
      "AWC System",
      "Turbocharged",
      "Sport Suspension",
    ],
    imageFiles: [
      "car6-1.avif",
      "car6-2.avif",
      "car6-3.avif",
      "car6-4.avif",
      "car6-5.avif",
      "car6-6.avif",
      "car6-7.avif",
      "car6-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 10,
    name: "Lexus LS460 V8 2007",
    tagline: "Executive Travel at its Best",
    price: "SOLD",
    description:
      "SOLD - Another fine example of the LS460 lineage offering exceptional value.",
    specs: {
      mileage: "154,000 km",
      engine: "4.6L V8",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2007",
      color: "Grey",
    },
    highlights: [
      "Leather Interior",
      "Navigation System",
      "Alloy Wheels",
      "Auto Headlights",
      "Rain Sensing Wipers",
    ],
    imageFiles: [
      "car7-1.avif",
      "car7-2.avif",
      "car7-3.avif",
      "car7-4.avif",
      "car7-5.avif",
      "car7-6.avif",
      "car7-7.avif",
      "car7-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 11,
    name: "Toyota C-HR Hybrid G Mode-Nero",
    tagline: "Stylish Crossover with Hybrid Tech",
    price: "SOLD",
    description:
      "SOLD - The C-HR stands out with its futuristic design and Nero styling pack.",
    specs: {
      mileage: "60,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2018",
      color: "Two-Tone",
    },
    highlights: [
      "Blind Spot Monitor",
      "Lane Assist",
      "Heated Seats",
      "Nero Styling Pack",
      "Adaptive Cruise",
    ],
    imageFiles: [
      "car8-1.avif",
      "car8-2.avif",
      "car8-3.avif",
      "car8-4.avif",
      "car8-5.avif",
      "car8-6.avif",
      "car8-7.avif",
      "car8-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 12,
    name: "Mercedes-Benz S400h Hybrid",
    tagline: "German Engineering Hybrid Efficiency",
    price: "SOLD",
    description:
      "SOLD - The S-Class is the benchmark for luxury combined with hybrid technology.",
    specs: {
      mileage: "40,000 km",
      engine: "3.5L Hybrid",
      transmission: "Automatic",
      fuel: "Hybrid",
      year: "2015",
      color: "Black",
    },
    highlights: [
      "Burmester Sound",
      "Panoramic Roof",
      "Massage Seats",
      "Digital Dash",
      "Ambient Lighting",
    ],
    imageFiles: [
      "car9-1.avif",
      "car9-2.avif",
      "car9-3.avif",
      "car9-4.avif",
      "car9-5.avif",
      "car9-6.avif",
      "car9-7.avif",
      "car9-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 13,
    name: "Honda Grace Hybrid EX 2015",
    tagline: "Compact Sedan Perfection",
    price: "SOLD",
    description:
      "SOLD - The Honda Grace offers immense reliability, great fuel economy, and a spacious interior.",
    specs: {
      mileage: "43,000 km",
      engine: "1.5L Hybrid",
      transmission: "DCT",
      fuel: "Hybrid",
      year: "2015",
      color: "Pearl White",
    },
    highlights: [
      "Paddle Shifters",
      "Smart Key",
      "LED Lights",
      "Rear Vents",
      "Econ Mode",
    ],
    imageFiles: [
      "car10-1.avif",
      "car10-2.avif",
      "car10-3.avif",
      "car10-4.avif",
      "car10-5.avif",
      "car10-6.avif",
      "car10-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 14,
    name: "Toyota Yaris Hybrid G AWD 2020",
    tagline: "Modern Safe and AWD",
    price: "SOLD",
    description:
      "SOLD - A late-model Yaris with AWD and Toyota Safety Sense technology.",
    specs: {
      mileage: "10,000 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2020",
      color: "Red",
    },
    highlights: [
      "Apple CarPlay",
      "Lane Trace Assist",
      "Pre-Collision Safety",
      "AWD System",
      "Digital Cluster",
    ],
    imageFiles: [
      "car11-1.avif",
      "car11-2.avif",
      "car11-3.avif",
      "car11-4.avif",
      "car11-5.avif",
      "car11-6.avif",
      "car11-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 15,
    name: "Lexus LS460 V8 RWD 2013",
    tagline: "Updated Facelift Model",
    price: "SOLD",
    description:
      "SOLD - The 2013 facelift brought the spindle grille and modernized interior to the LS460.",
    specs: {
      mileage: "80,000 km",
      engine: "4.6L V8",
      transmission: "8-Speed Auto",
      fuel: "Petrol",
      year: "2013",
      color: "White",
    },
    highlights: [
      "Spindle Grille",
      "Updated Infotainment",
      "Blind Spot Monitor",
      "Soft Close Doors",
      "19-inch Alloys",
    ],
    imageFiles: [
      "car12-1.avif",
      "car12-2.avif",
      "car12-3.avif",
      "car12-4.avif",
      "car12-5.avif",
      "car12-6.avif",
      "car12-7.avif",
      "car12-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 16,
    name: "Honda Fit Hybrid eHEV",
    tagline: "The Ultimate City Hatchback",
    price: "SOLD",
    description:
      "SOLD - The new generation Fit features the e:HEV system which feels more like an EV to drive.",
    specs: {
      mileage: "10,000 km",
      engine: "1.5L e:HEV",
      transmission: "e-CVT",
      fuel: "Hybrid",
      year: "2021",
      color: "Blue",
    },
    highlights: [
      "Honda Sensing",
      "Electronic Parking Brake",
      "Magic Seats",
      "Digital Cockpit",
      "LED Projectors",
    ],
    imageFiles: [
      "car13-1.avif",
      "car13-2.avif",
      "car13-3.avif",
      "car13-4.avif",
      "car13-5.avif",
      "car13-6.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 17,
    name: "Suzuki Swift Hybrid Hatchback",
    tagline: "JDM Ultra-Efficient Hatchback",
    price: "SOLD",
    description:
      "SOLD - Imported directly from the JDM market with mild-hybrid system.",
    specs: {
      mileage: "40,000 km",
      engine: "1.2L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2017",
      color: "Black",
    },
    highlights: [
      "Paddle Shifters",
      "Mild Hybrid",
      "Sport Seats",
      "Keyless Start",
      "Alloy Wheels",
    ],
    imageFiles: [
      "car14-1.avif",
      "car14-2.avif",
      "car14-3.avif",
      "car14-4.avif",
      "car14-5.avif",
      "car14-6.avif",
      "car14-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 18,
    name: "Honda Fit Hybrid 2018",
    tagline: "Sporty Facelift Model",
    price: "SOLD",
    description:
      "SOLD - The 2018 facelift Fit Hybrid offers sharper styling and improved DCT transmission.",
    specs: {
      mileage: "55,000 km",
      engine: "1.5L Hybrid",
      transmission: "DCT",
      fuel: "Hybrid",
      year: "2018",
      color: "Grey",
    },
    highlights: [
      "S-Package Styling",
      "LED Lights",
      "Cruise Control",
      "Safety Sense",
      "Reverse Cam",
    ],
    imageFiles: [
      "car15-1.avif",
      "car15-2.avif",
      "car15-3.avif",
      "car15-4.avif",
      "car15-5.avif",
      "car15-6.avif",
      "car15-7.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 19,
    name: "Toyota Crown RS Advance 2019",
    tagline: "The Future of Japanese Luxury",
    price: "SOLD",
    description:
      "SOLD - The 15th Generation Crown is a technological marvel with next-gen connectivity.",
    specs: {
      mileage: "40,000 km",
      engine: "2.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2019",
      color: "White",
    },
    highlights: [
      "Connected Services",
      "Lane Tracing",
      "Heads Up Display",
      "Digital Mirror",
      "RS Bodykit",
    ],
    imageFiles: [
      "car16-1.avif",
      "car16-2.avif",
      "car16-3.avif",
      "car16-4.avif",
      "car16-5.avif",
      "car16-6.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 20,
    name: "Lexus LS460 V8 RWD 2007",
    tagline: "Timeless Elegance",
    price: "SOLD",
    description:
      "SOLD - A low mileage example of the classic LS460 known to last hundreds of thousands of km.",
    specs: {
      mileage: "200,000 km",
      engine: "4.6L V8",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2007",
      color: "Silver",
    },
    highlights: [
      "Mark Levinson",
      "Sunroof",
      "Leather",
      "Parking Assist",
      "Keyless Go",
    ],
    imageFiles: [
      "car17-1.avif",
      "car17-2.avif",
      "car17-3.avif",
      "car17-4.avif",
      "car17-5.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 21,
    name: "Honda Vezel Hybrid 2014",
    tagline: "Best Selling Compact SUV",
    price: "SOLD",
    description:
      "SOLD - Another great Vezel with high driving position, great economy, and Honda reliability.",
    specs: {
      mileage: "60,000 km",
      engine: "1.5L Hybrid",
      transmission: "Automatic",
      fuel: "Hybrid",
      year: "2014",
      color: "Red",
    },
    highlights: [
      "Electric Park Brake",
      "City Brake Assist",
      "Eco Assist",
      "Folding Mirrors",
      "Climate Control",
    ],
    imageFiles: [
      "car18-1.avif",
      "car18-2.avif",
      "car18-3.avif",
      "car18-4.avif",
      "car18-5.avif",
      "car18-6.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 22,
    name: "Toyota C-HR Hybrid 2018",
    tagline: "Urban Crossover",
    price: "SOLD",
    description:
      "SOLD - Designed for the urban jungle. Handles like a hatchback but rides like an SUV.",
    specs: {
      mileage: "50,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2018",
      color: "Metal Stream",
    },
    highlights: [
      "Toyota Safety Sense",
      "Dual Zone Climate",
      "Auto High Beam",
      "8-inch Screen",
      "Alloy Wheels",
    ],
    imageFiles: [
      "car19-1.avif",
      "car19-2.avif",
      "car19-3.avif",
      "car19-4.avif",
      "car19-5.avif",
      "car19-6.avif",
      "car19-7.avif",
      "car19-8.avif",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 23,
    name: "2007 LEXUS LS600HL V8 5000CC",
    tagline: "Dual-zone automatic Climate Control",
    price: "29,000",
    description:
      "The LS600hL is the long-wheelbase hybrid version of the LS460 with rear-seat luxury.",
    specs: {
      mileage: "72,000 km",
      engine: "5.0L V8 Hybrid",
      transmission: "Automatic",
      fuel: "Hybrid",
      year: "2007",
      color: "Black",
    },
    highlights: [
      "439hp stock",
      "Fledermaus Cuervo 21 inch wheels",
      "Long wheel base",
      "Rare spec in prestine condition",
      "Mark levinson Sound system",
      "Adjustable suspension",
      "Soft closing doors",
      "2x keys",
      "Dual-zone automatic Climate Control",
      "Power-Adjustable Front Seats",
      "Memory Front Seats",
      "Front & rear Heated & ventilated seats",
      "Keyless Entry & Push-button start",
      "Pre-Collision System",
      "Lane Departure Alert",
      "Adaptive Cruise Control",
      "Premium wood trim",
    ],
    imageFiles: [
      "car20-1.jpg",
      "car20-2.jpg",
      "car20-3.jpg",
      "car20-4.jpg",
      "car20-5.jpg",
      "car20-6.jpg",
      "car20-7.jpg",
      "car20-8.jpg",
      "car20-9.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 24,
    name: "2013 BMW M5 F10 4.4L TWIN TURBO V8",
    tagline: "Finished in Bmw individual Frozen Blue Matte Metallic",
    price: "48,499",
    description:
      "The F10 M5 combines luxury with blistering speed. The 4.4L twin-turbo V8 produces 560hp, finished in rare Frozen Blue Matte Metallic.",
    specs: {
      mileage: "123,000 km",
      engine: "4.4L V8",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2013",
      color: "Frozen Blue Matte Metallic",
    },
    highlights: [
      "Finished in Bmw individual Frozen Blue Matte Metallic",
      "4.4L Twin turbo V8",
      "7 speed sports Dual Clutch",
      "2x keys",
      "Ventilated/Heated luxury seating",
      "Electric side blind package",
      "Bmw connect drive option",
      "Remote central locking",
      "Regenerative brakes",
      "360 parking sensors",
      "Available for immediate Delivery",
      "Finance Available",
    ],
    imageFiles: [
      "car21-1.jpg",
      "car21-2.jpg",
      "car21-3.jpg",
      "car21-4.jpg",
      "car21-5.jpg",
      "car21-6.jpg",
      "car21-7.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 25,
    name: "2024 Yaris Hybrid 4WD",
    tagline: "Brand new condition not a single scratch on the car",
    price: "SOLD",
    description:
      "This 2024 Yaris Hybrid 4WD is in pristine condition with only 6,500 km on the clock.",
    specs: {
      mileage: "6,500 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2024",
      color: "Red",
    },
    highlights: [
      "Apple carplay + Android Auto",
      "Reverse camera",
      "360 parking sensors",
      "Hybrid",
      "Brand new condition not a single scratch on the car",
      "Premium audio system with six speakers",
      "ABS, EBD, brake assist, traction and stability control",
      "4 Driving modes Eco/Ev/Normal/Sports",
      "Push Start",
      "Finance Available",
      "Rent to own Available",
    ],
    imageFiles: [
      "car22-1.jpg",
      "car22-2.jpg",
      "car22-3.jpg",
      "car22-4.jpg",
      "car22-5.jpg",
      "car22-6.jpg",
      "car22-7.jpg",
      "car22-8.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 26,
    name: "2009 Crown 3.5L V6 Hybrid",
    tagline: "Clean 10/10 condition no scratches or dent",
    price: "SOLD",
    description:
      "This 2009 Crown 3.5L V6 Hybrid is a rare find in immaculate condition with only 107,000 km.",
    specs: {
      mileage: "107,000 km",
      engine: "3.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2009",
      color: "Off White",
    },
    highlights: [
      "1 Year Rego + CTP Included",
      "2x keys",
      "Keyless entry + Push Start",
      "Cruise control",
      "3.5L Hybrid",
      "Full service history & log books",
      "Premium interior",
      "Driving modes (Sports,Snow,Eco,Ev)",
      "Clean 10/10 condition",
      "Reverse camera",
      "Finance Available",
      "Rent to own Available",
    ],
    imageFiles: [
      "car23-1.jpg",
      "car23-2.jpg",
      "car23-3.jpg",
      "car23-4.jpg",
      "car23-5.jpg",
      "car23-6.jpg",
      "car23-7.jpg",
      "car23-8.jpg",
      "car23-9.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 27,
    name: "2018 Toyota Prius C Hybrid",
    tagline: "Eligible for Uber X, Didi, Ubereats Etc",
    price: "SOLD",
    description:
      "This 2018 Toyota Prius C Hybrid is a reliable and fuel-efficient vehicle with 109,000 km.",
    specs: {
      mileage: "109,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2018",
      color: "Blue",
    },
    highlights: [
      "1 Year rego & ctp",
      "Keyless entry + Push Start",
      "Cruise control",
      "2x keys",
      "Hybrid",
      "Multimedia Steering wheel",
      "360 Parking sensors",
      "Reverse camera + Dashcam",
    ],
    imageFiles: [
      "car24-1.jpg",
      "car24-2.jpg",
      "car24-3.jpg",
      "car24-4.jpg",
      "car24-5.jpg",
      "car24-6.jpg",
      "car24-7.jpg",
      "car24-8.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 28,
    name: "2014 Toyota Prius c Aqua",
    tagline: "Eligible for Uber X, UberEats, Didi, DoorDash etc",
    price: "SOLD",
    description:
      "This 2014 Toyota Prius c / Aqua is a reliable and fuel-efficient hybrid vehicle with only 14,300 km.",
    specs: {
      mileage: "14,300 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2014",
      color: "Red",
    },
    highlights: [
      "1 year Rego & Ctp",
      "Retractable mirrors",
      "Reverse camera",
      "Push start",
      "Keyless entry",
      "Cruise control",
      "Apple carplay",
      "Eco mode",
      "Sports mode",
      "All 4 tyres like new",
    ],
    imageFiles: [
      "car25-1.jpg",
      "car25-2.jpg",
      "car25-3.jpg",
      "car25-4.jpg",
      "car25-5.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 29,
    name: "2020 YARIS HYBRID X 4WD",
    tagline: "1 year Rego & Ctp",
    price: "SOLD",
    description:
      "This 2020 Toyota Yaris Hybrid X 4WD is a reliable and fuel-efficient vehicle with 117,000 km.",
    specs: {
      mileage: "117,000 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2020",
      color: "White",
    },
    highlights: [
      "Keyless entry (2x keys)",
      "Hybrid",
      "Premium audio system with six speakers",
      "Parking sensors",
      "4 Driving modes Eco/Ev/Normal/Sports",
      "Push Start",
      "Gps Navigation",
      "New tyres",
    ],
    imageFiles: [
      "car26-1.jpg",
      "car26-2.jpg",
      "car26-3.jpg",
      "car26-4.jpg",
      "car26-5.jpg",
      "car26-6.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 30,
    name: "2020 YARIS HYBRID Z 4WD",
    tagline: "1 year Rego & Ctp",
    price: "SOLD",
    description:
      "This 2020 Toyota Yaris Hybrid Z 4WD is a reliable and fuel-efficient vehicle. Higher spec Z grade.",
    specs: {
      mileage: "117,000 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2020",
      color: "Blue",
    },
    highlights: [
      "Two tone interior",
      "Heads up Display",
      "Keyless entry (2x keys)",
      "Led Hid's sporty appearance",
      "Premium leather & fabric two tone interior",
      "Heated seats",
      "4 Driving modes Eco/Ev/Normal/Sports",
      "Push Start",
      "Reverse Camera + 360 Camera",
      "Dashcam hard wired installed",
      "New battery",
      "New tyres",
    ],
    imageFiles: [
      "car27-1.jpg",
      "car27-2.jpg",
      "car27-3.jpg",
      "car27-4.jpg",
      "car27-5.jpg",
      "car27-6.jpg",
      "car27-7.jpg",
      "car27-8.jpg",
      "car27-9.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 31,
    name: "2014 LEXUS CT200H F SPORT",
    tagline: "1 year Rego & Ctp",
    price: "SOLD",
    description:
      "This 2014 Lexus CT200H F Sport is a stylish hybrid luxury vehicle with only 79,000 km.",
    specs: {
      mileage: "79,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2014",
      color: "Silver",
    },
    highlights: [
      "Aggressive grille, spoiler, 17″ wheels",
      "Plush F Sport seats, steering wheel, pedals",
      "Hybrid",
      "Full Service History & Log books",
      "Heated seats",
      "Electric seats",
      "4 Driving modes Eco/Ev/Normal/Sports",
      "Reverse Camera",
      "Gps Navigation",
    ],
    imageFiles: [
      "car28-1.jpg",
      "car28-2.jpg",
      "car28-3.jpg",
      "car28-4.jpg",
      "car28-5.jpg",
      "car28-6.jpg",
      "car28-7.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 32,
    name: "2020 Lexus Ct200h Hybrid",
    tagline: "4 months rego",
    price: "SOLD",
    description:
      "This 2020 Lexus CT200H Hybrid is a well-maintained hybrid luxury vehicle with 188,000 km.",
    specs: {
      mileage: "188,000 km",
      engine: "1.8L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2020",
      color: "Silver",
    },
    highlights: [
      "Range: 650-800 kms on full tank",
      "Hybrid engine",
      "Eco mode",
      "Traction control",
      "2x keys",
      "Log books & Service history",
      "Reverse camera",
      "Parking sensors",
      "Bluetooth Connectivity",
      "Recently Serviced",
    ],
    imageFiles: [
      "car29-1.jpg",
      "car29-2.jpg",
      "car29-3.jpg",
      "car29-4.jpg",
      "car29-5.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 33,
    name: "2015 Audi A4 Quattro Sedan",
    tagline: "Great condition - full service history with Audi",
    price: "SOLD",
    description:
      "This 2015 Audi A4 Quattro Sedan is in excellent condition with a full Audi service history.",
    specs: {
      mileage: "131,000 km",
      engine: "2.0L Petrol",
      transmission: "Automatic",
      fuel: "Petrol",
      year: "2015",
      color: "Gray",
    },
    highlights: [
      "Top of the line model - full spec",
      "Great condition - full service history with Audi",
      "Freshly serviced - new brakes",
      "Full radar cruise control system",
      "Active blindspot assist system",
      "Active crash mitigation system",
      "Keyless entry and drive",
      "Sunroof",
      "Bang and Olufsen sound system",
      "Apple CarPlay and Android Auto",
      "2 keys",
      "Full paint correction and ceramic coated",
    ],
    imageFiles: [
      "car30-1.jpg",
      "car30-2.jpg",
      "car30-3.jpg",
      "car30-4.jpg",
      "car30-5.jpg",
      "car30-6.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 34,
    name: "2020 Toyota Vitz Yaris Hybrid",
    tagline: "Great condition - fresh Japanese import",
    price: "SOLD",
    description:
      "This 2020 Toyota Vitz / Yaris Hybrid is in excellent condition. Fresh Japanese import.",
    specs: {
      mileage: "43,000 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2020",
      color: "Silver",
    },
    highlights: [
      "Has a sporty look and feel",
      "Very comfortable drive and cheap to run",
      "Hybrid engine",
      "Eco mode",
      "Dashcam installed",
      "Log books & Service history",
      "Reverse camera",
      "Fresh Japanese import",
    ],
    imageFiles: [
      "car31-1.jpg",
      "car31-2.jpg",
      "car31-3.jpg",
      "car31-4.jpg",
      "car31-5.jpg",
      "car31-6.jpg",
    ],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 35,
    name: "2014 Honda Vezel HRV Hybrid",
    tagline: "Eligible for Uber X, UberEats, Didi, DoorDash etc",
    price: "SOLD",
    description:
      "This 2014 Honda Vezel / HRV Hybrid is in excellent condition. Fresh Japanese import with 102,000 km.",
    specs: {
      mileage: "102,000 km",
      engine: "1.5L Hybrid",
      transmission: "Automatic",
      fuel: "Hybrid",
      year: "2014",
      color: "Silver",
    },
    highlights: [
      "1 year Rego & Ctp",
      "2x keys",
      "Paddle shifters",
      "Push start",
      "Keyless entry",
      "Cruise control",
      "Apple carplay",
      "Dual climate zone",
      "All 4 brand new tyres just installed",
      "Fresh Japanese import",
    ],
    imageFiles: ["car32-1.jpg", "car32-2.jpg", "car32-3.jpg", "car32-4.jpg"],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
  {
    id: 36,
    name: "2019 Toyota Vitz Yaris Hybrid",
    tagline: "1 year rego",
    price: "SOLD",
    description:
      "This 2019 Toyota Vitz / Yaris Hybrid is in excellent condition. Fresh Japanese import with 92,000 km.",
    specs: {
      mileage: "92,000 km",
      engine: "1.5L Hybrid",
      transmission: "CVT",
      fuel: "Hybrid",
      year: "2019",
      color: "Silver",
    },
    highlights: [
      "Hybrid engine",
      "Eco mode",
      "Traction control",
      "Dashcam installed",
      "Log books & Service history",
      "Reverse camera",
      "Parking sensors",
      "Fresh Japanese import",
    ],
    imageFiles: ["car33-1.jpg", "car33-2.jpg", "car33-3.jpg"],
    dealer: "Elite Motor Cars",
    dealerLocation: "Sydney, Australia",
    license: "MD100405",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function parsePrice(raw: string): {
  priceAUD: number | null;
  status: "available" | "sold";
} {
  if (raw.toUpperCase() === "SOLD") return { priceAUD: null, status: "sold" };
  const num = parseFloat(raw.replace(/,/g, ""));
  return { priceAUD: isNaN(num) ? null : num, status: "available" };
}

function parseMileage(raw: string): number {
  return parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ── Minimal Mongoose schema (standalone for seed independence) ─────────────

const CarSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    name: String,
    tagline: String,
    description: String,
    priceAUD: { type: Number, default: null },
    status: {
      type: String,
      enum: ["available", "sold", "reserved"],
      default: "available",
    },
    specs: new mongoose.Schema(
      {
        mileageKm: Number,
        engineDisplacement: String,
        transmission: String,
        fuelType: String,
        year: Number,
        color: String,
        driveType: { type: String, default: null },
      },
      { _id: false },
    ),
    highlights: [String],
    images: [String],
    thumbnailUrl: String,
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    dealer: String,
    dealerLocation: String,
    licenseNumber: String,
    sortOrder: Number,
  },
  { timestamps: true },
);

// ── Seed ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅  Connected.\n");

  const CarModel = mongoose.models.Car ?? mongoose.model("Car", CarSchema);

  let inserted = 0;
  let skipped = 0;

  for (const raw of rawCars) {
    const { priceAUD, status } = parsePrice(raw.price);
    const slug = slugify(raw.name);

    // Idempotent — skip already-seeded cars
    const existing = await CarModel.findOne({ slug });
    if (existing) {
      console.log(`  ⚠️  Skipped (exists): ${raw.name}`);
      skipped++;
      continue;
    }

    // Resolve filenames → Cloudinary URLs
    const images = resolveImages(...raw.imageFiles);
    const thumbnailUrl = images[0] ?? "";

    const fuelMap: Record<string, string> = {
      hybrid: "Hybrid",
      petrol: "Petrol",
      diesel: "Diesel",
      electric: "Electric",
    };
    const fuelType = fuelMap[raw.specs.fuel.toLowerCase()] ?? "Petrol";

    await CarModel.create({
      slug,
      name: raw.name,
      tagline: raw.tagline,
      description: raw.description,
      priceAUD,
      status,
      specs: {
        mileageKm: parseMileage(raw.specs.mileage),
        engineDisplacement: raw.specs.engine,
        transmission: raw.specs.transmission,
        fuelType,
        year: parseInt(raw.specs.year, 10),
        color: raw.specs.color,
        driveType: null,
      },
      highlights: raw.highlights,
      images,
      thumbnailUrl,
      tags: status === "available" ? ["featured"] : [],
      isFeatured: status === "available",
      dealer: raw.dealer,
      dealerLocation: raw.dealerLocation,
      licenseNumber: raw.license,
      sortOrder: raw.id,
    });

    const priceLabel = priceAUD ? `AUD $${priceAUD.toLocaleString()}` : "SOLD";
    console.log(
      `  ✅  Inserted: [${status.toUpperCase()}] ${raw.name} — ${priceLabel} — ${images.length} images`,
    );
    inserted++;
  }

  console.log(
    `\n🎉  Seed complete! Inserted: ${inserted} | Skipped: ${skipped}`,
  );
  console.log(`\n   URLs sourced from: scripts/cloudinary-map.json`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  mongoose.disconnect().catch(() => {});
  process.exit(1);
});
