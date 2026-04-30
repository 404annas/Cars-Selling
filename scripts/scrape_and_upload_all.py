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
BACKUP_FILE = "list_all_cars_backup.json"

def get_og_image(url):
    """Scrapes the og:image from the given URL."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html = response.text
        
        # Look for <meta property="og:image" content="...">
        match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
        if not match:
            # Try name="twitter:image"
            match = re.search(r'<meta[^>]*name=["\']twitter:image["\'][^>]*content=["\']([^"\']+)["\']', html)
            
        if match:
            image_url = match.group(1)
            return urljoin(url, image_url)
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
        return image_url

def main():
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found.")
        return

    with open(JSON_FILE, "r") as f:
        cars = json.load(f)

    print(f"Found {len(cars)} cars in {JSON_FILE}.")
    
    # Check how many already have images (if any)
    to_scrape = [car for car in cars if not car.get("image")]
    print(f"{len(to_scrape)} cars need image scraping.")

    confirm = input(f"Do you want to start scraping images for {len(to_scrape)} cars? (y/n): ")
    if confirm.lower() != 'y':
        print("Operation cancelled.")
        return

    # Backup original file
    with open(BACKUP_FILE, "w") as f:
        json.dump(cars, f, indent=4)
    print(f"Backup created at {BACKUP_FILE}")

    scraped_count = 0
    total = len(cars)

    for i, car in enumerate(cars):
        if car.get("image") and "cloudinary.com" in car.get("image"):
            continue
            
        page_url = car.get("url")
        if page_url:
            print(f"[{i+1}/{total}] Scraping: {car['vehicle']}")
            image_url = get_og_image(page_url)
            
            if image_url:
                print(f"  Found image: {image_url}")
                # Upload to cloudinary immediately
                cloudinary_url = upload_to_cloudinary(image_url)
                if cloudinary_url:
                    car["image"] = cloudinary_url
                    scraped_count += 1
                    print(f"  Uploaded to Cloudinary: {cloudinary_url}")
            else:
                print(f"  No image found for {car['vehicle']}")
            
            # Periodically save progress
            if (i + 1) % 10 == 0:
                with open(JSON_FILE, "w") as f:
                    json.dump(cars, f, indent=4)
                print(f"--- Progress saved ({i+1}/{total}) ---")
            
            time.sleep(0.5) # Avoid hitting source server too hard

    # Final Save
    with open(JSON_FILE, "w") as f:
        json.dump(cars, f, indent=4)

    print(f"\nDone! Scraped and uploaded {scraped_count} images.")

if __name__ == "__main__":
    main()
