#!/usr/bin/env python3
"""
Simple, extensible visa info fetcher.
- Uses site-specific parsers (function per source).
- Output: data/visa.json
Notes:
- Configure sources below. Scraping logic is naive and intended as a starting point.
"""

import json
import logging
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("visa_scraper")

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

HEADERS = {
    "User-Agent": "china-travel-genspark-bot/1.0 (+https://github.com/dragonfly90/china_travel_genspark)"
}

def parse_china_embassy_us(html: str) -> Dict[str, Any]:
    """
    Example parser: US embassy page for China consular/visa updates.
    You will likely need to update selectors to match the real page.
    """
    soup = BeautifulSoup(html, "html.parser")
    # This is an example; adjust selectors to the target site.
    title = soup.find("h1")
    content_el = soup.find("main") or soup.find("article") or soup.find("div", {"id": "content"})
    text = content_el.get_text(separator="\n").strip() if content_el else soup.get_text(separator="\n").strip()
    return {
        "source": "example_embassy_us",
        "title": title.get_text(strip=True) if title else "Visa info",
        "text": text[:2000],
    }

def fetch_url(url: str, timeout: int = 15) -> str:
    r = requests.get(url, headers=HEADERS, timeout=timeout)
    r.raise_for_status()
    return r.text

def run():
    # Configure sources here: list of (id, url, parser_function)
    sources = [
        # Replace with the actual embassy/consulate pages you trust
        ("china_embassy_us", "https://www.example-embassy.gov.cn/visa-updates", parse_china_embassy_us),
        # Add more sources as needed
    ]

    results = {
        "fetched_at": datetime.utcnow().isoformat() + "Z",
        "items": []
    }

    for sid, url, parser in sources:
        try:
            logger.info("Fetching %s", url)
            html = fetch_url(url)
            parsed = parser(html)
            parsed.update({"id": sid, "url": url})
            results["items"].append(parsed)
            logger.info("Parsed %s", sid)
        except Exception as e:
            logger.exception("Failed to fetch/parse %s: %s", url, e)
            results["items"].append({
                "id": sid,
                "url": url,
                "error": str(e)
            })

    out = DATA_DIR / "visa.json"
    out.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    logger.info("Saved visa data to %s", out)

if __name__ == "__main__":
    run()
