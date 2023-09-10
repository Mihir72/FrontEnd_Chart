import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DropdownWithChecklist from './Selection';
import './style.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Chart2 = ({ JsonData }) => {


  var [allYearToPublication, setAllYearToPublication] = useState(null);
  var [options, setOptions] = useState(null);
  var [data, setData] = useState(null);
  var [selectedOption, setSelectedOption] = useState(null);
  var [yearToPublication, setYearToPublication] = useState({});

  useEffect(() => {
    const dateSet = new Set();
    const yearToPublication = {};
    JsonData.forEach(obj => {
      const date = new Date(Date.parse(obj.published));
      if (obj.published !== "") {
        dateSet.add(date.getFullYear());
        if (yearToPublication[date.getFullYear()] !== undefined)
          yearToPublication[date.getFullYear()] += 1;
        else {
          yearToPublication[date.getFullYear()] = 1;
        }
      }



    });
    var labels = Array.from(dateSet);

    labels.sort();
    const stringArray = labels.map((num) => num.toString());
    setAllYearToPublication(stringArray);
    setYearToPublication(yearToPublication);

  }, [JsonData])



  // console.log(yearToPublication);

  useEffect(() => {
    if (allYearToPublication === null) {
      return;
    }

    let chartYearToPublication = allYearToPublication;
    if (selectedOption !== null) {
      chartYearToPublication = selectedOption;
      console.log("Not null");
    }

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Publications Per Year',
        },
      },
    };




    const datatemp = {
      labels: chartYearToPublication,
      datasets: [
        {
          label: 'Publication Year',
          data: chartYearToPublication.map((year) => yearToPublication[year]),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

      ],
    };
    setData(datatemp);
    setOptions(options);


  }, [allYearToPublication, selectedOption]);

  const onDropdownChange = (value) => {
    console.log(value);
    if (value.length === 0) {
      console.log("setting to null");
      setSelectedOption(null);
      return;
    }
    setSelectedOption(value);

  }



  return (
    <>
      {data !== null && options !== null && (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '100%', height: '500px' }}>
            <Line data={data} options={options} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {allYearToPublication !== null && (
              <div style={{ width: '100%', maxWidth: '250px' }}>
                <DropdownWithChecklist option={allYearToPublication} onChange={onDropdownChange} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}



export default Chart2;




