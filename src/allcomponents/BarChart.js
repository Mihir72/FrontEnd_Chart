import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
// import DropdownWithToggles from './Dropdown';
import DropdownWithChecklist from './Selection';
import './style.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Chart1 = ({ JsonData }) => {

  var [alllabels, setAllLabels] = useState(null);
  var [options, setOptions] = useState(null);
  var [data, setData] = useState(null);
  var [selectedOption, setSelectedOption] = useState(null);

//This sets the labels
  useEffect(() => {

    if (JsonData === null) {
      return;
    }

    const topicsSet = new Set();
    JsonData.forEach(obj => {
      if (obj.topic !== "") {
        topicsSet.add(obj.topic);
      }

    });
    var temp = Array.from(topicsSet);

    temp = Array.from(topicsSet).slice(0, 20);

    setAllLabels(temp);
  }, [JsonData]);

  useEffect(() => {
    if (alllabels === null) {
      return;
    }

    let chartLabels = alllabels;
    if (selectedOption !== null) {
      chartLabels = selectedOption;
      console.log("Not null");
    }
    

    const datatemp = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Intensity',
          data: chartLabels.map((topic) => getAverage(topic, 'intensity')),
          backgroundColor: faker.internet.color(),
        },
        {
          label: 'Likelyhood',
          data: chartLabels.map((topic) => getAverage(topic, 'likelihood')),
          backgroundColor: faker.internet.color(),
        },
        {
          label: 'Relevance',
          data: chartLabels.map((topic) => getAverage(topic, 'relevance')),
          backgroundColor: faker.internet.color(),
        },
      ],
    };



    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Intensity, Likelihood, and Relevance by topic',
        },
      }
    };
    setData(datatemp);
    setOptions(options);
  }, [alllabels, selectedOption]);

  const onDropdownChange = (value) => {
    if (value.length === 0) {
      console.log("setting to null");
      setSelectedOption(null);
      return;
    }
    setSelectedOption(value);

  }
  

  const getAverage = (topic, key) => {
    const filteredData = JsonData.filter((item) => item.topic === topic);
    var values = filteredData.map((item) => item[key]);
    values = values.filter((item) => item !== '');
    const averageIntensity = values.reduce((a, b) => a + b, 0) / values.length;
    const val = parseInt(averageIntensity);
    return val;
  };

  if (alllabels === null) {
    return <div>Loading...</div>;
  }
  else
  return (
    <>
      {data !== null && options !== null && alllabels !== null && (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '100%', height: '500px' }}>
            <Bar data={data} options={options} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '250px' }}>
              <DropdownWithChecklist option={alllabels} onChange={onDropdownChange} />
            </div>
          </div>
        </div>
      )}
      {alllabels === null && <div>Loading...</div>}
    </>
  );
};

export default Chart1;