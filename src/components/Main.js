import { useEffect, useState } from 'react';
import './Main.css'
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

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="main">


  </div>;
};

export default Main;
