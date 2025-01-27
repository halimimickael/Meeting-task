import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export default function ContextProvider({ children }) {
    const [selectDate, setSelectDate] = useState(new Date());
    const [admin, setAdmin] = useState(false);
    const [reservedSlots, setReservedSlots] = useState(() => {
        const savedReservedSlots = localStorage.getItem('reservedSlots');
        return savedReservedSlots ? JSON.parse(savedReservedSlots) : [];
    });
    
    useEffect(() => {
        const fetchReservedSlots = async () => {
          try {
            const response = await fetch('http://localhost:3001/reservations');
            if (!response.ok) {
              throw new Error('Failed to fetch reservations');
            }
            const data = await response.json();
            setReservedSlots(data);
          } catch (error) {
            console.error('Error fetching reservations:', error);
          }
        };
      
        fetchReservedSlots();
      }, [selectDate]);
      

    useEffect(() => {
        localStorage.setItem('reservedSlots', JSON.stringify(reservedSlots));
    }, [reservedSlots]);

    useEffect(() => {
        if (admin) {
            setSelectDate(new Date());
        } else {
            setSelectDate(new Date());
        }
    }, [admin]);

    const globalVal = {
        selectDate,
        setSelectDate,
        admin,
        setAdmin,
        reservedSlots,
        setReservedSlots,
    };

    return (
        <AppContext.Provider value={globalVal}>
            {children}
        </AppContext.Provider>
    );
}
