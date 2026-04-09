const RAPIDAPI_KEY = "dec43e0d9emsh273a9a603787ac6p19d0a4jsnd9e4160be528";

async function run() {
  const url = 'https://youtube-mp36.p.rapidapi.com/dl?id=jNQXAC9IVRw';
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    }
  };

  const response = await fetch(url, options);
  console.log(response.status, await response.text());
}

run();
