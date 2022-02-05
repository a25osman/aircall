import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect } from 'react';
import axios from "axios";

import CallList from "./components/CallList.jsx"
import Header from './components/Header.jsx';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PhoneIcon from '@mui/icons-material/Phone';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';


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

  // function to archive a call
  const handleArchive = (event, id) => {
    event.stopPropagation();
    const setting = view ? {is_archived: true} : {is_archived: false};
    return axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, setting)
      .then(res => {
        const updated_id = res.data.id;
        let index;
        callLogs.forEach((call_obj, i) => {
          if (call_obj.id === updated_id){
            index = i;
          }
        })
        setCallLogs([...callLogs.slice(0, index), res.data, ...callLogs.slice(index+1)]);
      })
      .catch(err => console.log(err));
  };


  return (
    <div className='container'>
      <Header view={view} handleChange={handleChange}/>
      <div className="container-view">
        <CallList callLogs={callLogs} handleArchive={handleArchive} view={view} />
      </div>
      <Tabs sx={{bgcolor: "lightgrey"}} value={0} aria-label="disabled tabs">
        <Tab icon={<PhoneIcon />} aria-label="phone" />
        <Tab icon={<ContactsIcon />} aria-label="contacts" />
        <Tab icon={<DialpadIcon />} aria-label="dialpad" />
        <Tab icon={<SettingsIcon />} aria-label="settings" />
      </Tabs>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
