import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from './components/Calendar.js';

function App() {
  const [dataTable, setDataTable] = useState([]);
  
  //getting data from the API and assigning them to a var
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://prod-179.westeurope.logic.azure.com:443/workflows/7c84997dd6894507a60796acb06e5c43/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6hFoizfo2w62d0iQK_Zyt7a3Ycr9akAkXdCPAG0ecwQ&usr=47656f726765'
    })
    .then(res => setDataTable(res.data.value))
    .catch(err => console.log(err.data))
  }, []);

  return (
    <div className="App">
      <h1>Calendar</h1>
        <Calendar data={dataTable}/>
    </div>
  );
}

export default App;
