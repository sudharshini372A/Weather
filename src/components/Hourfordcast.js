import React, { useRef } from "react";
import cloud from "../images/cloud.jpg";
import "../components/Hourfordcast.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Hourfordcast = ({ hourlydata }) => {
  const scrollref = useRef(null);
  const scrollleft = () => {
    scrollref.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrolllright = () => {
    scrollref.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  return (
    <div className="relative mt-6">
      <div
        ref={scrollref}
        className=" flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* one hour */}
        {hourlydata.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounde px-4"
          >
            <p>{new Date(hour.time).getHours()}:00</p>
            <img
              src={hour.condition.icon}
              alt="weather icon"
              className="w-10 mx-auto"
            />
            <p>{hour.temp_c}°C</p>
          </div>
        ))}
      </div>
      <button
        onClick={scrollleft}
        className="absolute left-0 top-1/2 bg-green-500 text-white transfrom -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={scrolllright}
        className="absolute right-0 top-1/2 bg-green-500 text-white transfrom -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Hourfordcast;
