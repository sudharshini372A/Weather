import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import cloud from "./images/cloud.jpg";
import Hourfordcast from "./components/Hourfordcast";
import axios from "axios";
import { useState } from "react";
function App() {
  const [weatherdata, setweatherdata] = useState(null);
  const [city, setcity] = useState("");
  const [error, seterror] = useState("");
  const api_key = "d2921f54cbd84c04afb93637250505";
  const api_url = "http://api.weatherapi.com/v1/forecast.json";
  const fetchData = async (query) => {
    try {
      const response = await axios.get(
        `${api_url}?key=${api_key}&q=${query}&days=1`
      );
      console.log(response.data.forecast);
      setweatherdata(response.data);
      seterror("");
    } catch (error) {
      // console.log("There was on error city is not found");
      seterror("There was on error city is not found");
      setweatherdata(null);
    }
  };
  const getcurrentlocation = () => {
    if (navigator.geolocation) {
      // console.log("geolocation is working");
      navigator.geolocation.getCurrentPosition(
        //get a current position
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(latitude, longitude);
          const query = `${latitude} ,${longitude}`;
          fetchData(query);
        },
        (error) => {
          seterror(error.message);
        }
      );
    } else {
      // console.log("");
      seterror("geolocation is not working");
    }
  };
  const handlekeypress = (event) => {
    if (event.key === "Enter") {
      fetchData(city);
    }
  };
  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm">
        <div className="flex">
          <div className="flex border rounded items-center px-2 py-2 w-full">
            <FaSearch className="h-5 w-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              onKeyUp={handlekeypress}
              className="pl-1 border-none w-full focus:outline-none"
              placeholder="Enter city Name"
            />
          </div>
          <button
            onClick={getcurrentlocation}
            className="px-4 py-4 bg-green-400 text-white ml-2 rounded hover:bg-green-600"
          >
            <FaLocationDot className="w-5 h-5" />
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* weather data display */}
        {weatherdata && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">
              {weatherdata.location.name}
            </h2>
            <img
              src={weatherdata.current.condition.icon}
              className="mx-auto h-40"
              alt=""
            />
            <p className="text-lg font-semibold">
              {weatherdata.current.temp_c}
            </p>
            <p className="text-sm capitalize font-semibold">
              {weatherdata.current.condition.text}
            </p>
            <Hourfordcast
              hourlydata={weatherdata.forecast.forecastday[0].hour}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
