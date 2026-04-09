const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";

async function runSpeech() {
  const url = 'https://whisper-speech-to-text1.p.rapidapi.com/speech-to-text';

  const encodedParams = new URLSearchParams();
  encodedParams.append('file', 'data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    },
    body: encodedParams.toString()
  };

  console.log('Testing Whisper API...');
  const response = await fetch(url, options);
  const data = await response.text();
  console.log('Whisper response:', response.status, data);
}

runSpeech();
