---
name: euro-rails
description: Monitor train ticket prices from Cologne (Köln) to all EuroRails destinations. Track price drops and receive alerts for one-way or round-trip journeys.
user-invocable: true
metadata:
  openclaw:
    requires:
      bins: ["node"]
    emoji: "🚆"
---

# EuroRails Price Tracker Skill

## Overview
The **EuroRails Price Tracker** skill monitors train ticket prices from Cologne (Köln) to all destinations supported by [EuroRails](https://eurorails.com/). It uses a headless browser to scrape real-time prices and detect price drops, providing alerts and insights for travelers.

## Features
- **One-Way and Round-Trip Searches**: Track prices for one-way or round-trip journeys.
- **Price Monitoring**: Monitor specific routes and receive alerts when prices drop.
- **Cron Job Persistence**: Automatically recreates cron jobs for monitored routes after a gateway restart.
- **List Monitored Routes**: View all currently monitored routes.
- **Suggest Best Travel Times**: (Optional) Suggest optimal travel times based on price trends.

## Commands
- `eurorails monitor <destination> [--round-trip] [--alert-price <price>]`: Start monitoring a route.
- `eurorails list`: List all monitored routes.
- `eurorails check <destination> [--round-trip]`: Check the current price for a route.
- `eurorails suggest <destination> [--round-trip]`: Suggest the best travel times (optional).

## Usage
1. **Monitor a Route**:
   ```bash
   openclaw eurorails monitor Paris --round-trip --alert-price 99.99
   ```
2. **List Monitored Routes**:
   ```bash
   openclaw eurorails list
   ```
3. **Check Current Price**:
   ```bash
   openclaw eurorails check Brussels
   ```

## Files
- `index.js`: Main entry point for the skill. Handles cron job persistence and route monitoring.
- `scraper.js`: Handles headless browser scraping for EuroRails.
- `message-formatter.js`: Formats messages for user output.

## Testing
- The skill is tested with mock data first, then with a headless browser for real-time scraping.
- **Cron Job Persistence**: Restart OpenClaw and verify that cron jobs for monitored routes are recreated automatically.

## Repository
The skill is available on GitHub: [gulasz101/euro-rails.skill](https://github.com/gulasz101/euro-rails.skill).