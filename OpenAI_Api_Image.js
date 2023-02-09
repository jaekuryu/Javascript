const axios = require('axios');
const fs = require('fs');

async function generateImage() {
  const imageUrl = await axios.post('https://api.openai.com/v1/images/generations', {
    prompt: 'generate an image of a cat wearing a hat',
    model: 'image-alpha-001'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    }
  }).then(response => {
    console.log(response.data.data.url);
    return response.data.data.url;
  });

  const image = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(image.data, 'binary');
  fs.writeFileSync('c:\temp\cat_with_hat.jpg', buffer);
  console.log('Image saved successfully!');
}

generateImage();

