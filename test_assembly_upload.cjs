const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";
const API_URL = 'https://assemblyai-speech-to-text.p.rapidapi.com/v2/upload';

const mp3Base64 = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjI3LjEwMAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

async function run() {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'assemblyai-speech-to-text.p.rapidapi.com',
        'Content-Type': 'application/octet-stream'
      },
      body: Buffer.from(mp3Base64, 'base64')
    });
    console.log('Upload:', res.status, await res.text());
  } catch (e) {
    console.error(e);
  }
}
run();
