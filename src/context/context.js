import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export default function ContextProvider({ children }) {
    const SECRETCODE = '12345';
    const [selectDate, setSelectDate] = useState(new Date());
    const [reservedSlots, setReservedSlots] = useState(() => {
        const savedReservedSlots = localStorage.getItem('reservedSlots');
        return savedReservedSlots ? JSON.parse(savedReservedSlots) : [];
    });
    const [admin, setAdmin] = useState(false);

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
        SECRETCODE,
        selectDate,
        setSelectDate,
        reservedSlots,
        setReservedSlots,
        admin,
        setAdmin
    };

    return (
        <AppContext.Provider value={globalVal}>
            {children}
        </AppContext.Provider>
    );
}
