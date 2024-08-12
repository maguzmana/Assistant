const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Configura tu API key de OpenAI
const api_key = 'your_openai_api_key';

app.post('/ask', async (req, res) => {
    const user_input = req.body.question;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: user_input,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({ answer: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send('Error in processing request');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
