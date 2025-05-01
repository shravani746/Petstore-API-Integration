import React, { useEffect, useState } from 'react';
import './Toast.css';  // Import the CSS for styling the toast

const Toast = ({ message, onHide }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);  // Key to force re-render

  useEffect(() => {
    if (message) {
      setIsVisible(true);  // Show the toast immediately when a message is passed
      setKey((prevKey) => prevKey + 1);  // Increment the key to force re-render

      const timer = setTimeout(() => {
        setIsVisible(false);  // Hide the toast after 3 seconds
        onHide && onHide();  // Callback to hide toast externally (optional)
      }, 3000);  // 3 seconds timeout

      return () => clearTimeout(timer);  // Cleanup timer when component unmounts
    }
  }, [message, onHide]);

  if (!isVisible) {
    return null;  // Don't render the toast if it's not visible
  }

  return (
    <div key={key} id="toast" className="toast">
      {message}
    </div>
  );
};

export default Toast;
