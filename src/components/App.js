import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";

function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;

// using Moment.js
// import Moment from 'moment';
// create an instance of a moment by calling new Moment()