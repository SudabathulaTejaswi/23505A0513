import React from 'react'
import './Home.css'
const Home = () => {
  return (
    <div className='home'>
      <div className="about">
        <h1> About </h1>
        <p>
            The URL Shortner is website where you can shorten your long urls to small urls.
        </p>
      </div>
     <h1>Features</h1>
        <div className="cardholder">
        <div className="card">
            <h2>Shorten URLs</h2>
            <p>  You Can Easily shorten your long URLs to share them easily.</p>
            <a href="/shortner"> URLShortner </a>
        </div>
        <div className="card">
            <h2>Track Statistics</h2>
            <p> You can easily check status Of the url </p>
            <a href="/statistics"> URLStatus </a>
        </div>
        <div className="card">
            <h2>Easy to Use</h2>
            <p> The website is very easy to use and user friendly.</p>
            <a href="/"> Home </a>
        </div>
    </div>
    </div>
  )
}

export default Home
