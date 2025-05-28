// app/api/simulate/route.js
export async function POST(req) {
  const { description, failure_notes } = await req.json();
  const prompt = `<s>[INST] You are a creative AI storyteller. Given a project description and how it failed, imagine an alternate timeline where the project succeeded. Provide a detailed, imaginative scenario. Project: "${description}". Failure notes: "${failure_notes}". [/INST]`;
  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.HF_API_KEY}` },
    body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 300 } }),
  });
  const result = await response.json();
  return NextResponse.json({ simulation: result[0]?.generated_text });
}
