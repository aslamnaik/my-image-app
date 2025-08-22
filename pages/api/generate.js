export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.deepinfra.com/v1/openai/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`, // make sure you set this in Vercel
      },
      body: JSON.stringify({
        prompt,
        size: "512x512",
        model: "black-forest-labs/FLUX-1.1-pro",
        n: 1,
      }),
    });

    const data = await response.json();

    // Send base64 string back
    res.status(200).json({ image: data.data[0].b64_json });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
