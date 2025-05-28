// app/api/projects/route.js
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabaseServer';

export async function POST(request) {
  const { title, description, failure_notes } = await request.json();
  // Get embedding via Hugging Face (MiniLM)
  const embedRes = await fetch('https://api-inference.huggingface.co/embed/sentence-transformers/all-MiniLM-L6-v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HF_API_KEY}`
    },
    body: JSON.stringify({ inputs: description })
  });
  const embedding = await embedRes.json(); // e.g. [0.12, -0.07, ...]
  // Store project in Supabase
  const { data, error } = await supabaseServer.from('projects').insert([{
    title, description, failure_notes,
    embedding  // pgvector expects an array or JSON
  }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data[0] });
}

export async function GET(request) {
  const { data, error } = await supabaseServer.from('projects').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ projects: data });
}
