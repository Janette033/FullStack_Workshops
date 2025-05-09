import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
        padding: '2rem', 
        backgroundColor: '#ffe6f0', 
        minHeight: '100vh', 
        margin: 0, 
      }}
    >
      <h1 style={{ color: '#000', marginBottom: '2rem' }}>To do -lista</h1>
      
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Syötä tehtävä"
          style={{
            padding: '0.5rem',
            marginRight: '1rem',
            backgroundColor: '#fff', 
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '250px', 
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#fff', 
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Lisää
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <input
              value={task.text}
              onChange={(e) => editTask(index, e.target.value)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: '10px',
                backgroundColor: '#fff', 
                color: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.3rem',
                width: '80%', 
              }}
            />
            <button 
              onClick={() => toggleComplete(index)}
              style={{
                marginRight: '5px',
                backgroundColor: '#fff', 
                color: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer'
              }}
            >
              {task.completed ? "Peru" : "Valmis"}
            </button>
            <button 
              onClick={() => deleteTask(index)}
              style={{
                backgroundColor: '#fff', 
                color: '#000',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer'
              }}
            >
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



