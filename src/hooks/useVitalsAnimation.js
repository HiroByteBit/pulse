import { useEffect, useState } from 'react';

/**
 * Custom hook to handle vital sign pulse animations when values change
 * @param {number} value - The current vital sign value
 * @returns {boolean} - Whether the value should be pulsing
 */
export const useVitalsAnimation = (value) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 2000);
    return () => clearTimeout(timer);
  }, [value]);

  return isPulsing;
};
