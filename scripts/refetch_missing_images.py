import json
import requests
import os
import time
import re
from urllib.parse import urljoin

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
JSON_FILE = "list_all_cars.json"

def get_car_image(url):
    """Scrapes an image from the given URL with multiple fallbacks."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        html = response.text
        
        # 1. Try og:image
        match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
        if match:
            return urljoin(url, match.group(1))

        # 2. Try twitter:image
        match = re.search(r'<meta[^>]*name=["\']twitter:image["\'][^>]*content=["\']([^"\']+)["\']', html)
        if match:
            return urljoin(url, match.group(1))

        # 3. Try finding the first large image in wp-content/uploads/
        # This often matches the main featured image in WordPress sites
        matches = re.findall(r'https?://[^"\']+/wp-content/uploads/[^"\']+\.(?:jpg|jpeg|png|webp|avif)', html)
        if matches:
            # Filter out icons or small UI elements if possible, or just take the first unique one
            # Usually the first one in the content area is the best
            for img in matches:
                if "768x" in img or "scaled" in img or "1024x" in img:
                    return img
            return matches[0]

    except Exception as e:
        print(f"Error scraping {url}: {e}")
    return None

def upload_to_cloudinary(image_url):
    """Uploads an image to Cloudinary using an unsigned upload preset."""
    if not image_url or "cloudinary.com" in image_url:
        return image_url

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
        return None

def main():
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found.")
        return

    with open(JSON_FILE, "r") as f:
        cars = json.load(f)

    missing_cars = [car for car in cars if not car.get("image")]
    
    if not missing_cars:
        print("No missing images found in list_all_cars.json.")
        return

    print(f"Found {len(missing_cars)} cars missing images:")
    for car in missing_cars:
        print(f" - {car['vehicle']}")

    confirm = input(f"\nStart refetching and uploading these {len(missing_cars)} images? (y/n): ")
    if confirm.lower() != 'y':
        print("Aborted.")
        return

    updated_count = 0
    for car in missing_cars:
        print(f"\nProcessing: {car['vehicle']}")
        image_url = get_car_image(car['url'])
        
        if image_url:
            print(f"  Found image: {image_url}")
            cloudinary_url = upload_to_cloudinary(image_url)
            if cloudinary_url:
                car["image"] = cloudinary_url
                updated_count += 1
                print(f"  Success: {cloudinary_url}")
            else:
                print("  Failed to upload to Cloudinary.")
        else:
            print("  Could not find an image on the page.")
        
        time.sleep(1) # Be gentle

    if updated_count > 0:
        with open(JSON_FILE, "w") as f:
            json.dump(cars, f, indent=4)
        print(f"\nMigration complete! Updated {updated_count} cars.")
    else:
        print("\nNo images were updated.")

if __name__ == "__main__":
    main()
