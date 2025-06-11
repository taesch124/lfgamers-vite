import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type ApiResponse = { message: string };

function App() {
  const [count, setCount] = useState(0)
  const [ api, setApi ] = useState<string | null>(null);

  useEffect(() => {
    const fechApi = async () => {
      const response = await fetch('http://localhost:3000/api/hello');

      setApi(((await response.json()) as unknown as ApiResponse).message);
    }
    
    fechApi();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Hi there: count is {count} test
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          API Response: {api}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
