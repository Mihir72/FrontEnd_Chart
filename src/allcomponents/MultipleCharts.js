import React, {useState, useEffect} from "react";
import Chart1 from "./BarChart";
import Chart2 from "./LineChart";
import Chart5 from "./Bar-Chart";



export default function Chart() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://chart-backend.vercel.app/getdata');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };
  if (data === null) {
    return <div>Loading...</div>;
  }
  else
  return (
    <div>
      <Chart1 JsonData={data} />

      <Chart2 JsonData={data}/>
  
      <Chart5 JsonData={data}/>
    </div>
  );
}
