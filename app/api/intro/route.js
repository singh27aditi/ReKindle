// app/api/intro/route.js
export async function POST(req) {
  const { user_profile, project_summary } = await req.json();
  const prompt = `<s>[INST] You are an AI assistant helping to connect collaborators. Write a friendly introduction message from the user (profile: ${user_profile}) to a potential collaborator, summarizing the project: "${project_summary}". Keep it enthusiastic and concise. [/INST]`;
  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.HF_API_KEY}` },
    body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 150 } }),
  });
  const data = await response.json();
  return NextResponse.json({ intro: data[0]?.generated_text });
}
