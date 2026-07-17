let requests = [];
const WINDOW_MS = 10000; // 10 seconds
const WARNING_THRESHOLD = 10; // >10 requests in 10s is high traffic warning
const LIMIT_THRESHOLD = 20;   // >20 requests in 10s returns 429 Too Many Requests

const trafficMonitor = (req, res, next) => {
    const now = Date.now();
    
    // Clear timestamps older than WINDOW_MS
    requests = requests.filter(time => now - time < WINDOW_MS);
    
    // Add current request timestamp
    requests.push(now);

    const requestCount = requests.length;
    const isHighTraffic = requestCount > WARNING_THRESHOLD;
    const isLimitExceeded = requestCount > LIMIT_THRESHOLD;

    // Set custom headers to communicate traffic levels to frontend
    res.setHeader("X-High-Traffic", isHighTraffic ? "true" : "false");
    res.setHeader("X-Request-Count", requestCount.toString());

    if (isLimitExceeded) {
        console.warn(`[TRAFFIC MONITOR] Rate limit exceeded: ${requestCount} requests in last 10s. Blocking request to ${req.originalUrl}`);
        return res.status(429).json({
            message: "Server is experiencing extremely high traffic. Please try again in a few moments."
        });
    }

    if (isHighTraffic) {
        console.log(`[TRAFFIC MONITOR] High traffic warning active: ${requestCount} requests in last 10s.`);
    }

    next();
};

module.exports = trafficMonitor;
