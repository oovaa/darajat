import { ChevronLeft, ChevronRight } from 'lucide-react';

import dayjs from "dayjs";
import { useState } from "react";

const Calendar = () => {
  const [today, setToday] = useState(dayjs());

  const monthsOfYear = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const generateDate = (month: number, year: number) => {
    const startOfMonth = dayjs().year(year).month(month).startOf("month");
    const endOfMonth = dayjs().year(year).month(month).endOf("month");
    const dates = [];
    
    for (let i = 0; i < startOfMonth.day(); i++) {
      dates.push({ date: startOfMonth.subtract(i + 1, "day"), currentMonth: false, today: false });
    }

    for (let i = 1; i <= endOfMonth.date(); i++) {
      const date = dayjs().year(year).month(month).date(i);
      dates.push({ date, currentMonth: true, today: date.isSame(dayjs(), "day") });
    }

    while (dates.length % 7 !== 0) {
      dates.push({ date: dates[dates.length - 1].date.add(1, "day"), currentMonth: false, today: false });
    }

    return dates;
  };

  return (
    <div className="max-w-[350px] max-h-[350px] p-5 rounded-lg">
      <div className="w-full flex items-center justify-between mb-6 p-2 border-b border-gray-300">
            <ChevronLeft
                className="w-5 h-5 cursor-pointer"
                onClick={() => setToday((dayjs().month() >= today.month() && dayjs().year() === today.year()) ? today : today.month(today.month() - 1))}
            />
            <div className='px-4 py-2 rounded-3xl bg-[#AFE9D9]'>
                <h2 className="text-md font-semibold">
                {monthsOfYear[today.month()]} {today.year()}
                </h2>
            </div>

            <ChevronRight
                className="w-5 h-5 cursor-pointer"
                onClick={() => setToday(today.month(today.month() + 1))}
            />       
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-6">
        {weekDays.map((day, index) => (
          <h3 key={index} className="text-sm font-medium">{day}</h3>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                today
                ? "bg-[#FF9500] text-white"
                : currentMonth
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
