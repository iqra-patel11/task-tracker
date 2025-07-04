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

  return (
    <div className="App">
      {username ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}


export default App;
