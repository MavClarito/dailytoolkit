const https = require('https');

const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";
const API_URL = 'https://whisper-speech-to-text1.p.rapidapi.com/speech-to-text';

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function testValidAudio() {
  console.log('Downloading valid MP3...');
  const audioBuffer = await downloadFile('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  
  console.log('Sending FormData...');
  const formData = new FormData();
  // In Node.js environment, we must append a Blob to FormData
  formData.append('file', new Blob([audioBuffer], { type: 'audio/mp3' }), 'test.mp3');
  
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    },
    body: formData
  });
  console.log(res.status, await res.text());
}

testValidAudio();
