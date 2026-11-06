export async function onRequest(context) {
  const { env } = context;

  try {
    const apiResponse = await fetch(`https://api.grahaapi.com/v1/horoscope/daily`, {
      headers: {
        'Authorization': `Bearer ${env.GRAHA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from external API" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
