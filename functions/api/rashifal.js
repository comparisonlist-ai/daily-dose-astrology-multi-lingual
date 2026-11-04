export async function onRequest(context) {
  const { env, request } = context;
  const apiKey = env.GRAHA_API_KEY;

  const url = new URL(request.url);
  const signIndex = url.searchParams.get('index'); // Optional: 0 to 11 for specific sign

  try {
    // Replace with your actual external Graha API base URL endpoint
    const apiResponse = await fetch('https://api.grahaapi.com/v1/horoscope/daily', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await apiResponse.json();

    // If a specific sign index was requested, filter it out; otherwise return all
    if (signIndex !== null && data.success && data.data.rashifal) {
      const singleSign = data.data.rashifal[parseInt(signIndex, 10)];
      return new Response(JSON.stringify({ success: true, data: singleSign }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch live horoscope data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
