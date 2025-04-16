import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom'  
import "./styles.css"

export default function App() { 
  const [quote, setQuote] = useState('Loading quote...');
  let navigate = useNavigate();
   

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await res.json();
        setQuote(data.value);
      } catch {
        setQuote('Failed to load Chuck Norris quote.');
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <header className='left'>
        <h1 className="title">To<span>day</span></h1>
        <p className="subtitle">
          Wake up, go ahead, do the thing not tomorrow, do <strong>today</strong>.
        </p>
      </header>

      <div className="tabs">
        <button className="active" onClick={() => navigate('/')}>Todo</button>
        <button>Metrics</button>
      </div>

      <div className="main">
        {/* Left side: Task List */}
        <div className="todo-section">
          <h2>your daily Todos</h2> 
            <div className="task-list">
           
            </div>
          

          <div className="quote">
            <em>"{quote}"</em>
            <p>By Chuck Norris.</p>
          </div>
        </div>

        {/* Right side: Metrics + Form */}
        <div className="side-panel">
          <div className="counter-box">
            <h3>Finished tasks Percent %</h3>
            <div className="counter1">100%</div>
          </div>

          <div className="form">
            <h3>Streak</h3>
            <div class="progress-container">
  <div class="progress-bar">
      <div class="progress-value">75%</div>
        </div> 
              </div>
        </div>
        </div>
      </div> 
    </div>
  );
}
