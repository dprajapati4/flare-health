import './Main.css';
import { useEffect, useState } from 'react';
import { sortData } from './data/sortData';
import { yearsData } from './data/yearsData';
import Table from './Table'
const axios = require('axios');

const Main = () => {
  const [allData, setAllData] = useState([]);
  const [codes, setCodes] = useState([]);
  const [year, setYear] = useState(2003);
  const [condition, setCondition] = useState('Total');

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'codes') {
      let selectedCodes = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setCodes(selectedCodes);
    } else if (id === 'year') {
      setYear(value);
    } else if (id === 'conditions') {
      setCondition(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    filterAirports()
    // setYear(2003)
    // setCodes([])
    // setCondition('Total')
  }

  const filterAirports = ()  => {
    filterByYearAndCode(allData,year,codes)
  }

  const filterByYearAndCode = ( ) => {
    console.log('item', typeof   allData[0], codes)
    const airportByYear = allData.filter( (singleAirport) => {
      return  (singleAirport.Airport.Code === codes[0] && singleAirport.Time.Year === parseInt(year));
    })
    console.log('airportByYear', airportByYear)
  }



  useEffect(() => {
    fetchData();
  }, []);
  console.log('cond', year, codes, condition);
  return (
    <div className="main">
      {allData.length ? (
        <div className='container'>
          <form>
            <label htmlFor="condition"> Show </label>
            <select name="conditions" id="conditions" onChange={handleChange}>
              {sortData.map((condition) => {
                return (
                  <option key={condition} value={condition}>
                    {' '}
                    {condition}
                  </option>
                );
              })}
            </select>

            <label htmlFor="year">for</label>
            <select name="year" id="year" onChange={handleChange}>
              {yearsData.map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>

            <label htmlFor="airport-codes">at</label>
            <select
              name="codes"
              id="codes"
              multiple
              size="2"
              onChange={handleChange}
            >
              {allAirportCodes.map((code) => {
                return (
                  <option value={code} key={code}>
                    {code}
                  </option>
                );
              })}
            </select>

            <input type="submit" value="Submit" onClick={handleSubmit} />
          </form>
        </div>
      ) : (
        <h1>Loading </h1>
      )}

  <Table />
    </div>
  );
};

export default Main;
