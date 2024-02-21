import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [result, setResult] = useState("");

  // Handle the change in the input field
  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send the summary to the API endpoint
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: summary }),
    });

    const data = await response.json();

    // Update the result state with the decision from the API
    setResult(data.decision);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CueCipher Analysis Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea id="summary" name="summary" value={summary} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: "10px" }} />
        </div>
        <button type="submit">Analyze Summary</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
}
