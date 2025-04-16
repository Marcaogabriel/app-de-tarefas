import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCount = parseInt(localStorage.getItem('finishedCount')) || 0;
    setTasks(storedTasks);
    setFinishedCount(storedCount);
  }, []);

  // Atualizar localStorage sempre que as tarefas mudarem
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('finishedCount', finishedCount.toString());
  }, [finishedCount]);

  const addTask = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        date: new Date().toLocaleString(),
      };
      setTasks(prev => [...prev, newTask]);
      setTitle('');
      setDescription('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setFinishedCount(prev => prev + 1);
  };

  // Frase Chuck Norris a cada 5s
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
      <div className='left'>
        <h1 className="title">Today</h1>
        <p className="subtitle">
          Wake up, go ahead, do the thing not tomorrow, do <strong>today</strong>.
        </p>
      </div>

      <div className="tabs">
        <button className="active">To do</button>
        <button onClick={() => navigate('/about')}>Métricas</button>
      </div>

      <div className="main"> 
        <div className="todo-section">
          <h2>To do</h2>
          {tasks.length === 0 ? (
            <p className="no-task">No tasks yet...</p>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <div key={task.id} className="task">
                  <div className='left'>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                  </div>
                  <div>
                    <span>{task.date}</span>
                    <button onClick={() => deleteTask(task.id)}>❌</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="quote">
            <em>"{quote}"</em>
            <p>By Chuck Norris.</p>
          </div>
        </div>

        <div className="side-panel">
          <div className="counter-box">
            <h3>Finished tasks quantity</h3>
            <div className="counter">{finishedCount.toString().padStart(2, '0')}</div>
          </div>

          <div className="form">
            <h3>Add new to do</h3>
            <input
              type="text"
              placeholder="Task Name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTask}>Create Todo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
