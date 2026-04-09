const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_WHISPER_KEY = import.meta.env.VITE_RAPIDAPI_WHISPER_KEY;

let onQuotaUpdate = null;

export function setQuotaListener(listener) {
  onQuotaUpdate = listener;
}

function extractQuota(response, source) {
  const limit = response.headers.get('x-ratelimit-requests-limit') || response.headers.get('x-ratelimit-limit');
  const remaining = response.headers.get('x-ratelimit-requests-remaining') || response.headers.get('x-ratelimit-remaining');
  
  if (limit && remaining && onQuotaUpdate) {
    onQuotaUpdate(source, parseInt(remaining, 10), parseInt(limit, 10));
  }
}

export async function convertYoutubeToMp3(videoId) {
  const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    }
  };

  const response = await fetch(url, options);
  extractQuota(response, 'youtube');
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Youtube API Error:', response.status, errorText);
    if (response.status === 403) {
      throw new Error(`API Subscription Error: Please make sure your RapidAPI key is subscribed to this API.`);
    }
    throw new Error(`Failed to convert YouTube video to MP3 (${response.status})`);
  }

  return response.json();
}

export async function transcribeAudio(file) {
  const url = 'https://chatgpt-42.p.rapidapi.com/whisperv3';

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_WHISPER_KEY
    },
    body: formData
  });

  extractQuota(response, 'speech');

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Speech API Error:', response.status, errorText);
    if (response.status === 403 || response.status === 401) {
      throw new Error(`API Subscription Error: Please make sure your RapidAPI key is subscribed to this API.`);
    }
    
    let errorMsg = `Transcription failed. (${response.status}) Ensure file is supported.`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.error) errorMsg = `API Error: ${parsed.error}`;
      else if (parsed.message) errorMsg = `API Error: ${parsed.message}`;
    } catch(e) {}
    
    throw new Error(errorMsg);
  }

  const data = await response.text();

  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    return { text: data };
  }
}
