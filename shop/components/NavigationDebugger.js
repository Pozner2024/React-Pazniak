// Компонент для отслеживания и отладки навигации
import React, { useState, useEffect } from "react";
import "./NavigationDebugger.scss";

const NavigationDebugger = ({ hasUnsavedChanges, activeSection }) => {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const addEvent = (type, message, data = {}) => {
    const event = {
      id: Date.now(),
      type,
      message,
      data,
      timestamp: new Date().toLocaleTimeString(),
    };

    setEvents((prev) => [event, ...prev.slice(0, 19)]);
    console.log(`[Navigation Debug] ${type}: ${message}`, data);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      addEvent("beforeunload", "Page unload attempt", {
        hasUnsavedChanges,
        returnValue: event.returnValue,
      });
    };

    const handlePopState = (event) => {
      addEvent("popstate", "Browser back/forward button", {
        state: event.state,
        hasUnsavedChanges,
        currentUrl: window.location.href,
      });
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      addEvent("pushState", "URL changed programmatically", {
        state: args[0],
        title: args[1],
        url: args[2],
        hasUnsavedChanges,
      });
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      addEvent("replaceState", "URL replaced programmatically", {
        state: args[0],
        title: args[1],
        url: args[2],
        hasUnsavedChanges,
      });
      return originalReplaceState.apply(this, args);
    };

    const originalConfirm = window.confirm;
    window.confirm = function (message) {
      const result = originalConfirm.call(this, message);
      addEvent("confirm", "User confirmation dialog", {
        message,
        userChoice: result ? "confirmed" : "cancelled",
        hasUnsavedChanges,
      });
      return result;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.confirm = originalConfirm;
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    addEvent("section-change", `Section changed to: ${activeSection}`, {
      activeSection,
      hasUnsavedChanges,
    });
  }, [activeSection, hasUnsavedChanges]);

  useEffect(() => {
    addEvent(
      "unsaved-status",
      `Unsaved changes: ${hasUnsavedChanges ? "YES" : "NO"}`,
      {
        hasUnsavedChanges,
      }
    );
  }, [hasUnsavedChanges]);

  const clearEvents = () => setEvents([]);

  const getEventColor = (type) => {
    switch (type) {
      case "beforeunload":
        return "#ff6b6b";
      case "popstate":
        return "#4ecdc4";
      case "confirm":
        return "#ffe66d";
      case "pushState":
        return "#95e1d3";
      case "replaceState":
        return "#a8e6cf";
      case "section-change":
        return "#88d8b0";
      case "unsaved-status":
        return hasUnsavedChanges ? "#ff8b94" : "#c7cedb";
      default:
        return "#ddd";
    }
  };

  return (
    <div>
      <button
        className="debug-toggle"
        onClick={() => setIsVisible(!isVisible)}
        title="Toggle Navigation Debugger"
      >
        🐛 Debug ({events.length})
      </button>

      {isVisible && (
        <div className="navigation-debugger">
          <div className="debugger-header">
            <h3>🧭 Navigation Debugger</h3>
            <div className="debugger-controls">
              <span
                className={`status ${hasUnsavedChanges ? "unsaved" : "saved"}`}
              >
                {hasUnsavedChanges ? "⚠️ Unsaved" : "✅ Saved"}
              </span>
              <button onClick={clearEvents} className="clear-btn">
                Clear
              </button>
              <button onClick={() => setIsVisible(false)} className="close-btn">
                ×
              </button>
            </div>
          </div>

          <div className="events-list">
            {events.length === 0 ? (
              <div className="no-events">
                No events yet. Try navigating or editing data.
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="event"
                  style={{
                    borderLeft: `4px solid ${getEventColor(event.type)}`,
                  }}
                >
                  <div className="event-header">
                    <span className="event-type">{event.type}</span>
                    <span className="event-time">{event.timestamp}</span>
                  </div>
                  <div className="event-message">{event.message}</div>
                  {Object.keys(event.data).length > 0 && (
                    <details className="event-data">
                      <summary>Data</summary>
                      <pre>{JSON.stringify(event.data, null, 2)}</pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationDebugger;
