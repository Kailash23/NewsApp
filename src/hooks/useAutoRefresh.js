import {useState, useEffect} from 'react';

const useAutoRefresh = (duration) => {
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((r) => !r);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return [refresh];
};

export default useAutoRefresh;
