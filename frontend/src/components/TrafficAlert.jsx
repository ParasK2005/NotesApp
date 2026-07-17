import React, { useState, useEffect } from "react";
import { subscribeToTraffic } from "../services/api";
import { FiAlertTriangle, FiX, FiActivity } from "react-icons/fi";
import "../styles/trafficAlert.css";

function TrafficAlert() {
  const [isHighTraffic, setIsHighTraffic] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTraffic((highTrafficStatus) => {
      setIsHighTraffic(highTrafficStatus);
      if (highTrafficStatus) {
        // If traffic becomes high again, automatically reset dismissal so the banner is visible
        setIsDismissed(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isHighTraffic || isDismissed) {
    return null;
  }

  return (
    <div className="traffic-alert-banner">
      <div className="traffic-alert-content">
        <div className="traffic-alert-icon-wrapper">
          <FiAlertTriangle className="traffic-alert-icon warn-icon" />
          <span className="traffic-alert-pulse"></span>
        </div>
        <div className="traffic-alert-text">
          <span className="traffic-alert-title">High Traffic Warning:</span>
          <span className="traffic-alert-message">
            The server is experiencing high demand. Responses may be slightly slower than usual.
          </span>
        </div>
        <button 
          className="traffic-alert-dismiss" 
          onClick={() => setIsDismissed(true)}
          title="Dismiss warning"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}

export default TrafficAlert;
