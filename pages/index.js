import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setImageUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          className="border border-gray-300 p-2 rounded w-80"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {loading && <p className="text-gray-500">Please wait, generating...</p>}

      {imageUrl && (
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt="Generated"
            className="max-w-md rounded shadow-lg"
          />
          <a
            href={imageUrl}
            download
            className="mt-3 text-blue-600 hover:underline"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}