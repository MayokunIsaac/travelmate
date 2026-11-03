import { checkBackendHealth } from './services/api';
import './App.css'
import {useEffect, useState} from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function getHealth() {

      try {
        const data = await checkBackendHealth();
        setHealth(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    getHealth();

  }, []);

  return (
      <div className="App">

        <h1>Welcome to TravelMate</h1>

        <h2>Backend Connection Status</h2>

        {loading && <p>Connecting to backend...</p>}

        {error && (
            <p style={{color: "red"}}>
              Backend connection failed: {error}
            </p>
        )}

        {health && (
            <div>
              <p>Application: {health.application}</p>

              <p>Status: {health.status}</p>
            </div>
        )}
      </div>
  );
}

export default App
