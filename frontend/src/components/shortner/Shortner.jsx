import React from 'react'
import { useState } from 'react'
import './Shortner.css'
import axios from 'axios'

const Shortner = () => {

const [url, setUrl] = useState('');
const [period, setPeriod] = useState(30); 
const [shortCode, setShortCode] =useState('');
const [shorturl, setShortUrl] = useState('');
const [expirty, setExpiry] = useState('');

 function handlesubmit(e) {
    e.preventDefault();
    
    if (url === '') {
      alert('Please enter a valid URL');
      return;
    }
    if (period < 0) {
      alert('Please enter a valid time period');
      return;
    }
    const data = {
      url: url,
      validity: period,
      shortcode: shortCode
    };
    
    axios.post('http://localhost:3000/shorturls', data)
        .then(res => {
            if (res.status === 200) {
                console.log(res);
            alert('URL shortened successfully');
            setShortUrl(res.data.shorturl);
            setExpiry(res.data.expiry);
            } else {
            alert('Error shortening URL');
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert('Error occurred while shortening the URL');
        });
  }

  return (
    <div className='shortner'>
      <h1> Shorten URL's </h1>
      <div className="form1">
      <form onSubmit={handlesubmit}>
        <label> Your Long URL :</label>
        <input type="text" value={url} onChange={(e=>setUrl(e.target.value))} placeholder="Enter your long URL here" />
        <label>Period</label>
        <input type="number"  value ={period}  onChange={(e=>setPeriod(e.target.value))} placeholder="Time Period in minutes you wanted the link to be active [default : 30min]" />
        <label>Preferred ShortCode</label>
        <input type="text"  value ={shortCode}  onChange={(e=>setShortCode(e.target.value))} placeholder="Enter your preferred short code [optional]" />
        <button type="submit">Shorten</button>
      </form>
      </div>
      <div>
            <div className="result">
                <h2>Shortened URL:</h2>
                <p>{shorturl}</p>
                <h3>Expiry Time: { expirty}</h3>
            </div>

      </div>
    </div>
  )
}

export default Shortner
