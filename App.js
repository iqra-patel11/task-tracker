import TaskForm from 'C:\Users\iqrap\Desktop\task-tracker\src\components\taskform.js';
import logo from './logo.svg';
import './App.css';

  function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  const [tasks, setTasks] = useState([]);

const handleAddTask = (task) => {
  const updatedTasks = [...tasks, task];
  setTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

  return (
    <div className="App">
      {username ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
  <TaskForm onAddTask={handleAddTask} />

}


export default App;
