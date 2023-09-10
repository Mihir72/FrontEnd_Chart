import React, { useEffect, useState } from 'react';
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
import DropdownWithChecklist from './Selection';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart5 = ({ JsonData }) => {

  // var [allTopicToCountMap, setAllTopicToCountMap] = useState(null);
  var [options, setOptions] = useState(null);
  var [data, setData] = useState(null);
  var [selectedOption, setSelectedOption] = useState(null);
  var [regionToCountMap, setRegionToCountMap] = useState({});

  var [alllabels, setAllLabels] = useState([]);

  useEffect(() => {
    const options = {
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked',
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    if (regionToCountMap === null || alllabels === null) {
      return;
    }

    let chartRegionToCountMap = alllabels;
    if (selectedOption !== null) {
      chartRegionToCountMap = selectedOption;
      console.log("Not null");
    }
    console.log(chartRegionToCountMap);

    const datatemp = {
      labels: chartRegionToCountMap,
      datasets: [
        {
          label: 'Region',
          data: chartRegionToCountMap.map((region) => regionToCountMap[region]),
          backgroundColor: 'rgb(255, 99, 132)',
        },

      ],
    };
    setData(datatemp);
    setOptions(options);

  }, [regionToCountMap, selectedOption])

  useEffect(() => {

    const regionToCountMap = {};
    JsonData.forEach(obj => {
      if (obj.region !== "") {
        if (regionToCountMap[obj.region] == undefined) {
          regionToCountMap[obj.region] = 1;
        }
        else {
          regionToCountMap[obj.region] += 1;
        }

      }
    });

    const keys = Object.keys(regionToCountMap);

    var labels = Array.from(keys);

    setRegionToCountMap(regionToCountMap);
    setAllLabels(labels);

  }, [JsonData])

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
      {data !== null && (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '100%', height: '500px' }}>
            <Bar data={data} options={options} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {alllabels !== null && (
              <div style={{ width: '100%', maxWidth: '250px' }}>
                <DropdownWithChecklist option={alllabels} onChange={onDropdownChange} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

}

export default Chart5;




