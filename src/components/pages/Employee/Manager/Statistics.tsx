import React, { useEffect, useState } from 'react'
import "./Statistics.css";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import { StatisticCandidate, StatisticSpecialty } from '../../../../Models';
import { getCandidateStatistic } from '../../../../redux/apiRequest';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const Statistics = () => {
  const [value, setValue] = useState<string>('candidates');
  const [statisticCandidate, setStatisticCandidate] = useState<StatisticCandidate>();
  const [specialty, setSpecialty] = useState<StatisticSpecialty | undefined>(statisticCandidate?.listSpecialty[0]);


  useEffect(() => {
    fetchData();
  }, [specialty])

  async function fetchData() {
    setStatisticCandidate(await getCandidateStatistic());
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${specialty?.specialtyName} Statistics`,
      },
    },
  };

  const labels = specialty?.listExperience.map((item) => item.experienceName);

  const data = {
    labels,
    datasets: [
      {
        label: 'Candidate',
        data: specialty?.listExperience?.map((item) => item.totalCandidates),
        backgroundColor: 'rgba(255, 109, 25, 0.9)',
      }
    ],
  };
  return (
    <div id="Statistics">
      <h2>Statistics</h2>
      <div className="statistics-header">
        <Box sx={{ width: '100%' }} className="select-box">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value="candidates" label="Candidates" />
          </Tabs>
        </Box>
        {
          (value === "candidates")
            ? (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className='dropdown'>
                <InputLabel id="demo-simple-select-standard-label">Specialty</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={specialty?.specialtyName}
                  label="Age"
                >
                  {
                    statisticCandidate?.listSpecialty.map((item) => {
                      return (
                        <MenuItem value={item.specialtyName} onClick={() => setSpecialty(item)}>{item.specialtyName}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            )
            : null
        }

      </div>
      {
        (value === "candidates")
          ? (
            <div className="statistic-candidate-container">
              <div className="candidate-data-row">
                <div className="candidate-data-item">
                  <span className="item-name">
                    Total Candidate
                  </span>
                  <span className="item-value">{statisticCandidate?.totalCandidate}</span>
                </div>
                {
                  statisticCandidate?.listSpecialty.map((item) => {
                    return (
                      <div className="candidate-data-item">
                        <span className="item-name">
                          {item.specialtyName}
                        </span>
                        <span className="item-value">{item.candidateCountBySpecialty}</span>
                      </div>
                    )
                  })
                }
              </div>
              <div className="candidate-data-chart">
                {
                  specialty
                  ? (
                    <Bar options={options} data={data} />
                  ) 
                  : null
                }
              </div>
            </div>
          )
          : null
      }
    </div>
  )
}

export default Statistics