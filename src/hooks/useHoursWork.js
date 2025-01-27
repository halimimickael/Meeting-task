import { useState, useCallback, useEffect } from 'react';

export const useHoursWork = () => {
  const [hoursWork, setHoursWork] = useState([]);

  const fetchHoursWork = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/hoursWork');
      if (!response.ok) {
        throw new Error('Failed to fetch work hours');
      }
      const data = await response.json();
      setHoursWork(data);
    } catch (error) {
      console.error('Error fetching work hours:', error);
    }
  }, []);

  const updateHoursWork = async (payload, selectedWorkHours = null) => {
    try {
      const url = selectedWorkHours
        ? `http://localhost:3001/hoursWork/${selectedWorkHours._id}`
        : 'http://localhost:3001/hoursWork';

      const method = selectedWorkHours ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update work hours');
      }

      await fetchHoursWork();
      return true;
    } catch (error) {
      console.error('Error updating work hours:', error);
      alert(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchHoursWork();
  }, [fetchHoursWork]);

  return { hoursWork, updateHoursWork };
};
