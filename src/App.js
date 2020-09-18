import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';
import WeekContainer from './WeekContainer';


function App() {
  return (
    <div >
   <WeekContainer lang="pl" city="Warszawa" />
    </div>
  );
}

export default App;
