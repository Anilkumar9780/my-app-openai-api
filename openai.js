import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function Openai() {

  const configuration = new Configuration({
    // apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await openai.createCompletion({
        model : "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(res.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <main className="main">
        <div className="w-2/4 mx-auto">
          <textarea
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt"
            className="textarea"
          ></textarea>
          <button
            onClick={handleClick}
            disabled={loading || prompt.length === 0}
            className="btn"
          >
            {loading ? "Generationg..." : "Generate"}
          </button>
          <div className="result">{result}</div>
        </div>
      </main>
    </div>
  );
}
