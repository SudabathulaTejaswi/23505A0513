import { useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (shortcode === '') {
      alert('Please enter a shortcode');
      return;
    }

    axios.get(`http://localhost:3000/shorturls/${shortcode}`)
      .then((res) => {
        setStats(res.data);
        alert('Statistics fetched successfully');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        alert('Error occurred while fetching statistics');
      });
  }

  return (
    <div className='statistics' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Know your URL statistics</h1>
      <form onSubmit={handleSubmit}>
        <label>Shortcode:</label>
        <input
          type="text"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          placeholder="Enter Your url shortcode"
        />
        <button type="submit">Get Statistics</button>
      </form>

      {stats && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '10px', width: '400px', textAlign: 'left' }}>
          <h3>Statistics:</h3>
          <p><strong>Original URL:</strong> {stats.originalurl}</p>
          <p><strong>Shortcode:</strong> {stats.shortcode}</p>
          <p><strong>Expiry:</strong> {stats.validity}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
