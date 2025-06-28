const express = require('express');
const cors = require('cors');   
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

url = "mongodb+srv://projectwork2425:Teja1530@cluster0.ouqnfxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


let users;

//monodb connection
MongoClient.connect(url).then(client=>
{
     const db = client.db("urls"); 
    users = db.collection("shortner");
    console.log("Successfully connected to MongoDB Atlas");

    

app.post('/shorturls', (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url && !shortcode  && !validity) {
    return res.status(400).json({ error: 'url,validity,shortcode is required' });
  }

    const shortUrl = `http://localhost:${port}/${shortcode || Math.random().toString(36).substring(2, 8)}`;

    const expiry = new Date(Date.now() + (validity || 30) * 60 * 1000);
    const newUrl = {    
        url,
        shortUrl,
        shortcode: shortcode || Math.random().toString(36).substring(2, 8),
        expiry
        };

    users.insertOne(newUrl)
        .then(result => {
            res.status(200).json({
                expiry: newUrl.expiry,
                shorturl: newUrl.shortUrl
            });
        })
        .catch(error => {
            console.error('Error inserting URL:', error);
            res.status(500).json({ error: 'Failed to shorten URL' });
        }); 
});

app.get('/shorturls/:shortcode', (req, res) => {
  const shortcode = req.params.shortcode;
  users.findOne({ shortcode })
    .then(urlData => {
      if (!urlData) {
        return res.status(404).json({ error: 'Short URL not found' });
      }
      const expiry = Math.floor((new Date(urlData.expiry) - new Date()) / (1000 * 60));
      res.status(200).json({
        originalurl: urlData.url,
        validity:expiry,
        shortcode: urlData.shortcode
      });
    })
    .catch(error => {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

}).catch(err => {
    console.error("Failed to connect to MongoDB Atlas", err)});


