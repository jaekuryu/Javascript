
const axios = require('axios');
const readline = require('readline');

const API_KEY = '<YOUR API KEY>';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = () => {
  rl.question('What is your question? ', (question) => {
    const options = {
      method: 'post',
      url: 'https://api.openai.com/v1/engines/davinci/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        prompt: question,
        temperature: 0.5,
        max_tokens: 256
      }
    };

    axios(options)
    .then(response => {
      console.log(response.data.choices[0].text);
      askQuestion();
    })
    .catch(error => {
      console.log(error);
      askQuestion();
    });
  });
};

askQuestion();

