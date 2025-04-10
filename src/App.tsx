import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Report from "./components/report.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <Report/>
      </div>
  )
}

export default App
