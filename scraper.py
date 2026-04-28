import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

def scrape_garage():
    print("🚀 Starting Natural Scroll Scraper...")
    
    options = Options()
    options.add_argument("--headless") 
    options.add_argument("--window-size=1920,1080") # Set a large viewport
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    url = "https://garageapex.com.au/import-car-japan/"
    driver.get(url)
    time.sleep(5) 

    # --- NATURAL SCROLL LOGIC ---
    print("⏳ Beginning natural scroll sequence. This will take a few minutes...")
    
    last_count = 0
    stuck_counter = 0
    
    while True:
        # 1. Scroll down by a large chunk, but not the whole page
        driver.execute_script("window.scrollBy(0, 2000);")
        time.sleep(2) # Give it a second to render
        
        # 2. Scroll to the current bottom to trigger the circular loader
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        
        # 3. Wait for the loader to finish (increase to 5 or 6 if internet is slow)
        print("🌀 Waiting for loader...")
        time.sleep(4) 
        
        # 4. Check how many cars we have now
        current_cars = driver.find_elements(By.CSS_SELECTOR, "div[data-elementor-type='jet-listing-items']")
        current_count = len(current_cars)
        
        if current_count > last_count:
            print(f"📊 Progress: Found {current_count} cars (Added {current_count - last_count} new)...")
            last_count = current_count
            stuck_counter = 0
        else:
            stuck_counter += 1
            print(f"⚠️ No new cars found. Retry {stuck_counter}/4...")
            # Nudge up and down to wake up the loader
            driver.execute_script("window.scrollBy(0, -500);")
            time.sleep(1)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # 5. Stop if we are stuck for too long (means we hit the end)
        if stuck_counter >= 4:
            print("🏁 End of page reached.")
            break

    # --- EXTRACTION ---
    print(f"🔍 Extracting data from {len(current_cars)} items...")
    final_data = []

    for item in current_cars:
        try:
            # Name and Link
            title_tag = item.find_element(By.CSS_SELECTOR, "h4.elementor-heading-title a")
            name = title_tag.text.strip()
            url = title_tag.get_attribute("href")

            # Image - handling lazy loading
            try:
                img = item.find_element(By.TAG_NAME, "img")
                img_url = img.get_attribute("src") or img.get_attribute("data-src")
            except:
                img_url = "N/A"

            # Dates
            date_fields = item.find_elements(By.CSS_SELECTOR, ".jet-listing-dynamic-field__content")
            date_info = " ".join([d.text.strip() for d in date_fields])

            final_data.append({
                "name": name,
                "dates": date_info,
                "image": img_url,
                "link": url
            })
        except:
            continue

    # Save
    with open('garage_all_cars.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=4, ensure_ascii=False)

    print(f"✅ Mission Accomplished! Saved {len(final_data)} cars.")
    driver.quit()

if __name__ == "__main__":
    scrape_garage()