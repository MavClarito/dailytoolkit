const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";

async function runSpeech() {
  const url = 'https://speech-to-text-ai.p.rapidapi.com/transcribe?lang=en&task=transcribe';
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'speech-to-text-ai.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    },
    body: 'file=test'
  };

  console.log('Testing Speech API...');
  const response = await fetch(url, options);
  const data = await response.text();
  console.log('Speech response:', response.status, data);
}

runSpeech();
