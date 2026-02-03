// EuroRails Price Tracker - Message Formatter

// Format a price alert message
function formatPriceAlert(route, currentPrice) {
    return `
🚨 **Price Alert for ${route.destination}** 🚨

The price has dropped to **€${currentPrice}** for a ${route.roundTrip ? 'round-trip' : 'one-way'} ticket!
${route.alertPrice ? `This is below your alert threshold of €${route.alertPrice}.` : ''}

Book now: [EuroRails](https://eurorails.com/)
`;
}

// Format a list of monitored routes
function formatRouteList(routes) {
    let message = '**Monitored Routes:**\n';
    routes.forEach(route => {
        message += `
- ${route.destination} (${route.roundTrip ? 'Round-Trip' : 'One-Way'})`;
        message += route.alertPrice ? ` | Alert at €${route.alertPrice}` : '';
        message += ` | Last Price: €${route.lastPrice}`;
    });
    return message;
}

// Format a price check message
function formatPriceCheck(route, currentPrice) {
    return `
🚆 **Current Price for ${route.destination}** 🚆

The current price for a ${route.roundTrip ? 'round-trip' : 'one-way'} ticket is **€${currentPrice}**.`;
}

module.exports = { formatPriceAlert, formatRouteList, formatPriceCheck };