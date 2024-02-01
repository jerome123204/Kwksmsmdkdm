const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = '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';
const baseUrl = 'https://api.openai.com/v1/chat/completions';

app.get('/', (req, res) => {
  res.send('@minnscat     ENDPOINT: gpt?msg=');
});

app.get('/gpt', async (req, res) => {
  const message = req.query.msg;
  if (!message) {
    return res.status(400).json({ error: 'Please provide a message in endpoint ex: gpt?msg=hi' });
  }
  try {
    const response = await axios.post(
      baseUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    const gptResponse = response.data.choices[0]?.message?.content || "An error occured.";
    res.json({ message: gptResponse });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});