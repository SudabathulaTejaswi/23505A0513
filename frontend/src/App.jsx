
import './App.css'
import { BrowserRouter as Router , Routes , Route , Link  } from 'react-router-dom'
import Home from './components/home/Home'
import Shortner from './components/shortner/Shortner'
import Statistics from './components/statistics/Statistics'
function App() {

  return (
    <>
      <Router>
        <div className="nav">
            <div className="title">URL's</div>
            <a href="/"> Home </a>
            <a href="/shortner"> URLShortner </a>
            <a href="/statistics">URLStatus </a>
        </div>
        <div className="section" style={{ minHeight : '100vh'}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shortner" element={<Shortner />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
        <div className="footer">
          <p> A website which shorten your long urls to small urls</p>
        </div>
      </Router>
    </>
  )
}

export default App
