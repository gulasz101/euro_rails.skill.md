// EuroRails Price Tracker - Main Entry Point

const { scrapeEuroRails } = require('./scraper');
const { formatPriceAlert, formatRouteList, formatPriceCheck } = require('./message-formatter');
const { cron } = require('openclaw');

// Mock database for monitored routes
const monitoredRoutes = [];
// Track active cron jobs
const activeCronJobs = new Map();

// Main function to handle commands
async function handleCommand(args) {
    const command = args[0];
    
    switch (command) {
        case 'monitor':
            return await monitorRoute(args.slice(1));
        case 'list':
            return listRoutes();
        case 'check':
            return await checkPrice(args.slice(1));
        case 'suggest':
            return suggestTravelTimes(args.slice(1));
        default:
            return 'Unknown command. Available commands: monitor, list, check, suggest.';
    }
}

// Monitor a route
async function monitorRoute(args) {
    const destination = args[0];
    const roundTrip = args.includes('--round-trip');
    const alertPriceIndex = args.indexOf('--alert-price');
    const alertPrice = alertPriceIndex !== -1 ? parseFloat(args[alertPriceIndex + 1]) : null;
    
    if (!destination) {
        return 'Please specify a destination. Example: `eurorails monitor Paris --round-trip`';
    }
    
    // Mock data for testing
    const mockPrice = Math.floor(Math.random() * 200) + 20;
    const route = {
        destination,
        roundTrip,
        alertPrice,
        lastPrice: mockPrice,
    };
    
    monitoredRoutes.push(route);
    
    // In a real implementation, this would use the scraper
    if (alertPrice && mockPrice <= alertPrice) {
        return formatPriceAlert(route, mockPrice);
    }
    
    return `Now monitoring ${destination} (${roundTrip ? 'round-trip' : 'one-way'})${alertPrice ? ` with alert at €${alertPrice}` : ''}.`;
}

// List all monitored routes
function listRoutes() {
    if (monitoredRoutes.length === 0) {
        return 'No routes are currently being monitored.';
    }
    
    return formatRouteList(monitoredRoutes);
}

// Check the current price for a route
async function checkPrice(args) {
    const destination = args[0];
    const roundTrip = args.includes('--round-trip');
    
    if (!destination) {
        return 'Please specify a destination. Example: `eurorails check Paris`';
    }
    
    // Mock data for testing
    const mockPrice = Math.floor(Math.random() * 200) + 20;
    const route = { destination, roundTrip, lastPrice: mockPrice };
    
    // In a real implementation, this would use the scraper
    return formatPriceCheck(route, mockPrice);
}

// Suggest best travel times (optional)
function suggestTravelTimes(args) {
    const destination = args[0];
    const roundTrip = args.includes('--round-trip');
    
    if (!destination) {
        return 'Please specify a destination. Example: `eurorails suggest Paris`';
    }
    
    return `Best travel times for ${destination} (${roundTrip ? 'round-trip' : 'one-way'}) are typically mid-week. Prices tend to be lower on Tuesdays and Wednesdays.`;
}

// Monitor a route
async function monitorRoute(args) {
    const destination = args[0];
    const roundTrip = args.includes('--round-trip');
    const alertPriceIndex = args.indexOf('--alert-price');
    const alertPrice = alertPriceIndex !== -1 ? parseFloat(args[alertPriceIndex + 1]) : null;
    
    if (!destination) {
        return 'Please specify a destination. Example: `eurorails monitor Paris --round-trip`';
    }
    
    // Mock data for testing
    const mockPrice = Math.floor(Math.random() * 200) + 20;
    const route = {
        destination,
        roundTrip,
        alertPrice,
        lastPrice: mockPrice,
    };
    
    monitoredRoutes.push(route);
    
    // Schedule a cron job for price checks (e.g., every 6 hours)
    schedulePriceCheck(route);
    
    // In a real implementation, this would use the scraper
    if (alertPrice && mockPrice <= alertPrice) {
        return formatPriceAlert(route, mockPrice);
    }
    
    return `Now monitoring ${destination} (${roundTrip ? 'round-trip' : 'one-way'})${alertPrice ? ` with alert at €${alertPrice}` : ''}.`;
}

// Schedule a cron job for price checks
function schedulePriceCheck(route) {
    // Skip if a cron job already exists for this route
    if (activeCronJobs.has(route.destination)) {
        return;
    }
    
    // Schedule a cron job (e.g., every 6 hours)
    const job = cron.schedule('0 */6 * * *', async () => {
        const currentPrice = Math.floor(Math.random() * 200) + 20; // Mock price
        
        if (route.alertPrice && currentPrice <= route.alertPrice) {
            console.log(`Price alert for ${route.destination}: €${currentPrice}`);
            // In a real implementation, send a notification
        }
        
        // Update the last known price
        route.lastPrice = currentPrice;
    });
    
    activeCronJobs.set(route.destination, job);
    console.log(`Cron job scheduled for ${route.destination}`);
}

// Recreate cron jobs for monitored routes
function setupCronJobs() {
    if (monitoredRoutes.length === 0) {
        console.log('No monitored routes to recreate cron jobs for.');
        return;
    }
    
    console.log(`Recreating cron jobs for ${monitoredRoutes.length} monitored routes...`);
    monitoredRoutes.forEach(route => {
        schedulePriceCheck(route);
    });
}

// Call setupCronJobs when the skill loads
setupCronJobs();

module.exports = { handleCommand };