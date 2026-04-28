import requests
from bs4 import BeautifulSoup
import json

def scrape_car_list():
    url = "https://garageapex.com.au/list-of-cars-we-can-import-to-australia/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    print("🚀 Fetching page data...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Failed to load page. Status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the table - it usually has a class or is inside a specific div
    table = soup.find('table')
    
    if not table:
        print("❌ Could not find the table on the page.")
        return

    cars_data = []
    # Find all rows in the table body
    rows = table.find('tbody').find_all('tr') if table.find('tbody') else table.find_all('tr')

    print(f"🔍 Found {len(rows)} rows. Extracting data...")

    for row in rows:
        cols = row.find_all('td')
        
        # Skip header rows if they are inside the loop
        if len(cols) < 6:
            continue

        try:
            # Column 1: Vehicle Name and Link
            vehicle_cell = cols[0]
            link_tag = vehicle_cell.find('a')
            
            name = link_tag.text.strip() if link_tag else vehicle_cell.text.strip()
            link = link_tag['href'] if link_tag else ""

            # Extract the rest of the columns
            data = {
                "vehicle": name,
                "url": link,
                "sevs_status": cols[1].text.strip(),
                "sevs_expiry": cols[2].text.strip(),
                "variant_details": cols[3].text.strip(),
                "from_date": cols[4].text.strip(),
                "to_date": cols[5].text.strip(),
                "conditions": cols[6].text.strip() if len(cols) > 6 else ""
            }
            cars_data.append(data)
        except Exception as e:
            print(f"⚠️ Error skipping a row: {e}")
            continue

    # Save to JSON
    output_file = 'import_eligible_cars.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(cars_data, f, indent=4, ensure_ascii=False)

    print(f"✅ Success! Scraped {len(cars_data)} cars and saved to {output_file}")

if __name__ == "__main__":
    scrape_car_list()