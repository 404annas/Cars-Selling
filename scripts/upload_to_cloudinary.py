import json
import requests
import os
import time

# Load configuration from .env if it exists
def load_env():
    env_vars = {}
    if os.path.exists(".env"):
        with open(".env", "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    key, value = line.strip().split("=", 1)
                    env_vars[key] = value
    return env_vars

env = load_env()

# Cloudinary configuration
CLOUD_NAME = env.get("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "dozwtxbw8")
UPLOAD_PRESET = env.get("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET", "elite-motor")
JSON_FILE = "browse_all_cars.json"
BACKUP_FILE = "browse_all_cars_backup.json"

def upload_image(image_url):
    """Uploads an image to Cloudinary using an unsigned upload preset."""
    if not image_url or "cloudinary.com" in image_url:
        return image_url

    print(f"Uploading: {image_url}")
    
    url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"
    data = {
        "upload_preset": UPLOAD_PRESET,
        "file": image_url
    }
    
    try:
        response = requests.post(url, data=data)
        response.raise_for_status()
        result = response.json()
        return result.get("secure_url")
    except Exception as e:
        print(f"Error uploading {image_url}: {e}")
        return image_url

def main():
    if not CLOUD_NAME or not UPLOAD_PRESET:
        print("Error: Cloudinary credentials not found in .env or script defaults.")
        return

    # Load JSON data
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found.")
        return

    with open(JSON_FILE, "r") as f:
        cars = json.load(f)

    # Backup original file
    with open(BACKUP_FILE, "w") as f:
        json.dump(cars, f, indent=4)
    print(f"Backup created at {BACKUP_FILE}")

    updated_count = 0
    total = len(cars)

    for i, car in enumerate(cars):
        original_image = car.get("image")
        if original_image:
            new_url = upload_image(original_image)
            if new_url != original_image:
                car["image"] = new_url
                updated_count += 1
        
        print(f"Progress: {i+1}/{total} (Updated: {updated_count})")
        # Small delay to avoid hitting rate limits too fast
        time.sleep(0.5)

    # Save updated JSON
    with open(JSON_FILE, "w") as f:
        json.dump(cars, f, indent=4)

    print(f"\nDone! Updated {updated_count} image URLs in {JSON_FILE}.")

if __name__ == "__main__":
    main()
