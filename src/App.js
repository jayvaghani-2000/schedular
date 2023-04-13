import "./App.css";
import { useRef, useState } from "react";

function App() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const startSlotRef = useRef(null);

  const handleMouseDown = (day, timeSlot) => {
    setIsSelecting(true);
    setSelectedSlots([{ day, timeSlot }]);
    startSlotRef.current = { day, timeSlot };
  };

  const handleMouseEnter = (day, timeSlot) => {
    if (!isSelecting) return;
    const { day: startDay, timeSlot: startSlot } = startSlotRef.current;
    const newSelectedSlots = [];
    for (let d = days.indexOf(startDay); d <= days.indexOf(day); d++) {
      const start =
        d === days.indexOf(startDay) ? timeSlots.indexOf(startSlot) : 0;
      const end =
        d === days.indexOf(day)
          ? timeSlots.indexOf(timeSlot)
          : timeSlots.length - 1;
      for (let t = start; t <= end; t++) {
        newSelectedSlots.push({ day: days[d], timeSlot: timeSlots[t] });
      }
    }
    console.log("newSelectedSlots", newSelectedSlots);
    setSelectedSlots(newSelectedSlots);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    startSlotRef.current = null;
  };

  return (
    <table className="time-table" onMouseUp={handleMouseUp}>
      <thead>
        <tr>
          <th></th>
          <th className="time-slot" colSpan="12">AM</th>
          <th className="time-slot" colSpan="12">PM</th>
        </tr>
        <tr>
          <th></th>
          {timeSlots.map((slot, index) => (
            <th key={index} className="time-slot">
              {index < 12 ? slot : index === 23 ? 12 : slot % 12}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, index) => (
          <tr key={index}>
            <td className="selection time-slot">{day}</td>
            {timeSlots.map((timeSlot, index) => {
              const isSelected = selectedSlots.some(
                (slot) => slot.day === day && slot.timeSlot === timeSlot
              );
              return (
                <td
                  key={index}
                  className={isSelected ? "selected time-slot" : "time-slot"}
                  onMouseDown={() => handleMouseDown(day, timeSlot)}
                  onMouseEnter={() => handleMouseEnter(day, timeSlot)}
                ></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
