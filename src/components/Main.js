import './Main.css';
import { useEffect, useState } from 'react';
import { sortData } from './data/sortData';
import { yearsData } from './data/yearsData';
const axios = require('axios');

const Main = () => {
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://flare-code-exercise-data.s3.amazonaws.com/airlines.json'
      );
      setAllData(data);
    } catch (error) {
      console.log('Error in fetching the data ', error);
    }
  };
  // Uses a sample data point to get all the airport codes
  const allAirportCodes = allData
    .filter((airportCodes) => airportCodes.Time.Label === '2003/06')
    .map((airportCodes) => airportCodes.Airport.Code);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      {allData.length ? (
        <div>
          <form>
            <label htmlFor="condition"> Show </label>
            <select name="conditions" id="conditions">
              {sortData.map((condition) => {
                return <option key={condition} value={condition} />;
              })}
            </select>

            <label htmlFor="year">for</label>
            <select name="year" id="year">
              {yearsData.map((year) => {
                return <option key={year} value={year} />;
              })}
            </select>

            <label htmlFor="airport-codes">at</label>
            <select name="codes" id="codes" multiple size="2">
              {allAirportCodes.map((code) => {
                return <option value={code} key={code} />;
              })}
            </select>

            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <h1>Loading </h1>
      )}
    </div>
  );
};

export default Main;
