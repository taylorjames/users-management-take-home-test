import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ notification, duration, onClear }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClear();
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, onClear]);

  return (
    <div
      className={`notification notification-${notification.type}`}
      aria-live="polite"
    >
      {notification.message}
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  duration: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Notification;
