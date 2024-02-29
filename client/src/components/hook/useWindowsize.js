import { useState, useEffect } from 'react';

const useWindowsize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Check if window is defined before attaching event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      // Set initial window size
      handleResize();

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowSize;
};

export default useWindowsize;
