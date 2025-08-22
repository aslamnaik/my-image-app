// pages/api/generate.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api.deepinfra.com/v1/openai/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`, // 🔑 use env var
      },
      body: JSON.stringify({
        prompt: prompt,
        size: "1024x1024",
        model: "black-forest-labs/FLUX-1.1-pro",
        n: 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error || "Failed to generate image" });
    }

    // DeepInfra returns images in data.data[0].url (similar to OpenAI style)
    return res.status(200).json({ imageUrl: data.data[0].url });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
