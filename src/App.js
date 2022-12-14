
import { useState } from 'react';
import './App.css';

function App() {

  const [displayTime, setDisplayTime] = useState(25*60);
  const  [breakTime, setBreakTime] = useState(5*60);
  const  [sessionTime, setSessionTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(false);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ?  "0" + minutes : minutes) + 
      ":" + 
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0){
         return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0){
        return;
     }
      setSessionTime((prev) => prev + amount);
      if(!timerOn){
        setDisplayTime(sessionTime + amount); 
      }
    }
  }

  return (
    <div className='center-align'>
      <h1>25 + 5 CLOCK</h1>
      <div className="dual-conainer">
        <Length 
          title={"Break length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length 
         title={"session length"}
         changeTime={changeTime}
         type={"session"}
         time={sessionTime}
         formatTime={formatTime}
        />
      </div>
      <h1>{formatTime(displayTime)}</h1>
     
    </div>
  );
}

function Length ({title, changeTime,type, time, formatTime}){
  return(
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button className='btn-small deep-purple lighten-2' onClick={() => changeTime(-60, type)}>
          <i className='material-icons'>arrow_downward</i>
        </button>
        <h3>{formatTime(time)}</h3>
        <button className='btn-small deep-purple lighten-2' onClick={() => changeTime(60, type)}>
          <i className='material-icons'>arrow_upward</i>
        </button>
      </div>
    </div>
  );
}

export default App;
