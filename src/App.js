
import './App.css';
import {  BrowserRouter, Route, Link, Routes, Switch} 
        from "react-router-dom";
import About from './About.js';
import Dashboard from './Dashboard.js';
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    window["alloy"]("sendEvent", {
      renderDecisions: true,
      xdm: {
          web: {
              webPageDetails: {
                  viewName: "home"
              }
          },
          eventType: "view-change"
      }
  }).then(({decisions = []}) => {
      console.log("scope based decisions for home view", decisions);

      window["alloy"]("sendEvent", {
        renderDecisions: true,
        xdm: {
            web: {
                webPageDetails: {
                    views: ["home", "about", "dashboard"]
                }
            },
            eventType: "view-change"
        }
    })
  });
  }, [])

  return (

    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/home" element={<div> acasa </div>} />
            
          
          <Route path="/about" element={<About />} />
            
          
          <Route path="/dashboard" element={<Dashboard />} />
            
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
