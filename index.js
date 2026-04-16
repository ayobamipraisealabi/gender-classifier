const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/classify', async (req, res) => {
    const userName = req.query.name;


    if (typeof userName !== 'string') {
        return res.status(422).json({ status: 'error', message: 'name is not a string'});
    }

    if (!userName || userName.trim() === '') {
        return res.status(400).json({status: 'error', message: 'Missing or empty name parameter' });
    }

    try {
        const apiResult = await axios.get(`https://api.genderize.io/?name=${encodeURIComponent(userName.trim())}`, {timeout: 500});
        const info = apiResult.data;

        if (info.gender === null || info.count === 0) {
            return res.status(200).json({
                status: 'error',
                message: 'No prediction available for the provided name'
            });
        }

        const result = {
            name: info.name,
            gender: info.gender,
            probability: info.probability,
            sample_size: info.count,
            is_confident: info.probability >= 0.7 && info.count >= 100,
            processed_at: new Date().toISOString()
        };

        return res.json({ status: "success", data: result });

    }  catch (err) {
        if (err.response) {
            return res.status(502).json({
                status: 'error',
                message: 'Upstream API failure'
      });

    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Server failure'
      });
    }  
    }
});

module.exports = app;

