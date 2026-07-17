import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
})

let trafficListeners = new Set();
let highTrafficTimeout = null;

const notifyListeners = (status) => {
    trafficListeners.forEach(listener => listener(status));
};

export const subscribeToTraffic = (listener) => {
    trafficListeners.add(listener);
    return () => {
        trafficListeners.delete(listener);
    };
};

api.interceptors.response.use(
    (response) => {
        const isHigh = response.headers["x-high-traffic"] === "true";
        if (isHigh) {
            notifyListeners(true);
            
            // Auto reset after 8 seconds of no activity
            if (highTrafficTimeout) clearTimeout(highTrafficTimeout);
            highTrafficTimeout = setTimeout(() => {
                notifyListeners(false);
            }, 8000);
        } else {
            notifyListeners(false);
            if (highTrafficTimeout) {
                clearTimeout(highTrafficTimeout);
                highTrafficTimeout = null;
            }
        }
        return response;
    },
    (error) => {
        const isHigh = error.response?.headers?.["x-high-traffic"] === "true";
        const isRateLimited = error.response?.status === 429;
        
        if (isHigh || isRateLimited) {
            notifyListeners(true);
            
            if (highTrafficTimeout) clearTimeout(highTrafficTimeout);
            highTrafficTimeout = setTimeout(() => {
                notifyListeners(false);
            }, 8000);
        }
        return Promise.reject(error);
    }
);

export default api;