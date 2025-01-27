const generateTimeSlots = () => {
    return Array.from({ length: (24 - 0 + 1) * 2 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute = index % 2 === 0 ? '00' : '30';
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    });
  };
  
  export const filterAvailableHours = (selectDate, hoursWork, reservedSlots, admin) => {
    const hours = generateTimeSlots();
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const isToday = selectDate.toLocaleDateString('fr-FR') === currentTime.toLocaleDateString('fr-FR');
  
    let dayStart = '00:00';
    let dayEnd = '23:30';
  
    const matchingHours = hoursWork.find(
      (workHours) => new Date(workHours.date).toLocaleDateString('fr-FR') === selectDate.toLocaleDateString('fr-FR')
    );
  
    if (matchingHours) {
      dayStart = matchingHours.hourStart;
      dayEnd = matchingHours.hourFinish;
    }
  
    const [startHour, startMinute] = dayStart.split(':').map(Number);
    const [endHour, endMinute] = dayEnd.split(':').map(Number);
  
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
  
    return hours.filter((time) => {
      const [hour, minute] = time.split(':').map(Number);
      const timeInMinutes = hour * 60 + minute;
  
      if (isToday && currentTimeInMinutes > timeInMinutes) {
        return false;
      }
  
      if (admin) {
        return reservedSlots.some(
          (slot) => slot.date === selectDate.toLocaleDateString('fr-FR') && slot.time === time
        );
      }
  
      return timeInMinutes >= startTimeInMinutes && timeInMinutes <= endTimeInMinutes;
    });
  };