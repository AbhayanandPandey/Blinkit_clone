import { useEffect, useState } from 'react';

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 0);
    
    return () => clearTimeout(timeout);
  }, [value, 0]);
  
  return debouncedValue;
};

export default useDebounce;
