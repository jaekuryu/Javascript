
const axios = require('axios');

const API_KEY = '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';
const PROMPT = 'What is the meaning of life?';

const options = {
  method: 'post',
  url: 'https://api.openai.com/v1/engines/davinci/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  data: {
    prompt: PROMPT,
    temperature: 0.5,
    max_tokens: 256
  }
};

axios(options)
  .then(response => {
    console.log(response.data.choices[0].text);
  })
  .catch(error => {
    console.log(error);
  });
