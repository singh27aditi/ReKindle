// app/api/analyze/route.js
export async function POST(req) {
  const { description, failure_notes } = await req.json();
  const prompt = `<s>[INST] You are a project consultant. Analyze the following project failure and identify the most likely root causes in a helpful, concise manner. Project description: "${description}". Failure notes: "${failure_notes}". [/INST]`;
  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 200, temperature: 0.7 }
    }),
  });
  const result = await response.json(); // returns an array with one element
  const text = result[0]?.generated_text || '';
  return NextResponse.json({ analysis: text });
}
