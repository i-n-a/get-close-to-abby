import './App.css'
import { Link, BrowserRouter, Routes, Route } from "react-router";


export function App() {
  return (
    <>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Abby Calendar</h1>
      <p className="text-gray-700">Welcome to Abby Calendar! Choose a calendar view.</p>
    </div>
    <Link to="/poster" className="text-blue-500 hover:underline">
      Go to Poster Calendar
    </Link>
    <Link to="/list" className="text-blue-500 hover:underline ml-4">
      Go to Filter List Calendar
    </Link>
  </>
  );
}

export default App;
