const fs = require('fs');

const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";
const API_URL = 'https://whisper-speech-to-text1.p.rapidapi.com/speech-to-text';

// A tiny valid 1-frame MP3 file in base64
const mp3Base64 = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
const mp3Buffer = Buffer.from(mp3Base64, 'base64');

async function testUrlEncodedDataUrl() {
  console.log('--- Test 1 JSON ---');
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: JSON.stringify({ file: `data:audio/mp3;base64,${mp3Base64}` })
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e.message);
  }
}

async function testUrlEncodedUrl() {
  console.log('--- Test 2 URL Encoded with public URL ---');
  try {
    const params = new URLSearchParams();
    params.append('file', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: params.toString()
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e.message);
  }
}

async function testFormData() {
  console.log('--- Test 3 FormData ---');
  try {
    const formData = new FormData();
    formData.append('file', new Blob([mp3Buffer], { type: 'audio/mp3' }), 'test.mp3');
    
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: formData
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e.message);
  }
}

async function testUrlEncodedBase64() {
  console.log('--- Test 4 URL Encoded pure base64 ---');
  try {
    const params = new URLSearchParams();
    params.append('file', mp3Base64);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: params.toString()
    });
    console.log(res.status, await res.text());
  } catch (e) {
    console.error(e.message);
  }
}

async function run() {
  await testUrlEncodedUrl();
  await testUrlEncodedDataUrl();
  await testFormData();
  await testUrlEncodedBase64();
}
run();
