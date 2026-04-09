const fs = require('fs');
const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";
const API_URL = 'https://assemblyai-speech-to-text.p.rapidapi.com/';

const mp3Base64 = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

async function run() {
  console.log('Testing AssemblyAI Wrapper...');
  
  // Try 1: Emulate the exact snippet provided by user, just add body
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'assemblyai-speech-to-text.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      // Usually, it expects audio_url or similar if it's application/json
      body: JSON.stringify({ file: `data:audio/mp3;base64,${mp3Base64}` })
    });
    console.log('Try 1 JSON file Base64:', res.status, await res.text());
  } catch (e) { console.error(e); }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'assemblyai-speech-to-text.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })
    });
    console.log('Try 2 JSON audio_url:', res.status, await res.text());
  } catch (e) { console.error(e); }

  try {
    const formData = new FormData();
    formData.append('file', new Blob([Buffer.from(mp3Base64, 'base64')], { type: 'audio/mp3' }), 'test.mp3');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'assemblyai-speech-to-text.p.rapidapi.com'
      },
      body: formData
    });
    console.log('Try 3 FormData:', res.status, await res.text());
  } catch (e) { console.error(e); }
}

run();
