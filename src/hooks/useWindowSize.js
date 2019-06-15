import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState(Math.min(window.innerWidth, window.innerHeight));
  const handleResize = () => setSize(Math.min(window.innerWidth, window.innerHeight));
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return size;
};

export default useWindowSize;
