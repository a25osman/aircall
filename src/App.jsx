import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect } from 'react';
import axios from "axios";
import CallList from "./components/CallList.jsx"
import Header from './components/Header.jsx';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';


const App = () => {
  // State containing call data
  const [callLogs, setCallLogs] = useState([]);

  // Retrieve call data from API
  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities")
      .then(res => {
        setCallLogs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // States to select current view
  const [view, setView] = useState(0)

  // onChange function to switch views
  const handleChange = (event, newValue) => {
    setView(newValue);
  };


  return (
    <div className='container'>
      <Header view={view} handleChange={handleChange}/>
      <div className="container-view">
        
        
        <CallList callLogs={callLogs} />
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
