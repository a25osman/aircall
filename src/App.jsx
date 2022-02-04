import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import {useState, useEffect } from 'react';
import axios from "axios";
import CallList from "./components/CallList.jsx"


const App = () => {
  const [callLogs, setCallLogs] = useState([]);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities")
      .then(res => {
        setCallLogs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <CallList callLogs={callLogs} />
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
