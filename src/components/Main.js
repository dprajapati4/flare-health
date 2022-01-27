import { useEffect, useState } from 'react';

const axios = require('axios');

const Main = () => {
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://flare-code-exercise-data.s3.amazonaws.com/airlines.json');
      console.log('the data', data)
      setAllData(data);
    } catch (error) {
      console.log('Error in fetching the data ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (<div className="Main">

  </div>)
};

export default Main;
