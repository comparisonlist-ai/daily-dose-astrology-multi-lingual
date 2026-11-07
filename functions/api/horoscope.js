export async function onRequest(context) {
  const { env } = context;
  
  // Your GrahaAPI Key stored securely in Cloudflare Environment Variables
  const GRAHA_API_KEY = env.GRAHA_API_KEY; 

  try {
    // Make server-to-server request to GrahaAPI
    const apiResponse = await fetch("https://grahaapi.com/v1/horoscope/daily", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GRAHA_API_KEY}`
      },
      body: JSON.stringify({
        // Add required payload parameters if needed by GrahaAPI
      })
    });

    if (!apiResponse.ok) {
      throw new Error(`GrahaAPI returned status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // Return structured response to your frontend script.js
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Adjust if restricting domain access
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
