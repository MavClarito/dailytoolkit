const RAPIDAPI_KEY = "c8dfbe48b5msh6de251b1fc5cd86p1218eejsn268e9499dbc4";
const API_URL = 'https://chatgpt-42.p.rapidapi.com/whisperv3';

const https = require('https');

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading real MP3...');
  const audioBuffer = await downloadFile('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

  console.log('Testing FormData with real MP3...');
  try {
    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer], { type: 'audio/mp3' }), 'test.mp3');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com'
      },
      body: formData
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e);
  }
}

run();
