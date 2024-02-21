"use client"

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: inputText,
      }),
    });

    const data = await response.json();

    setResult(data.decision); // Assuming the API response has a 'decision' field
  };

  return (
    <div>
      <h1>CueCipher Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Analyze Text</button>
      </form>
      {result && <div><strong>Analysis Result:</strong> {result}</div>}
    </div>
  );
}
