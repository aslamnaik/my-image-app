import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);

  const generateImage = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    if (data.image) {
      // Convert base64 to data URI
      setImage(`data:image/png;base64,${data.image}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Image Generator</h1>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <button onClick={generateImage}>Generate</button>
      {image && <img src={image} alt="Generated result" style={{ marginTop: 20 }} />}
    </div>
  );
}
