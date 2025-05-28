// app/api/match/route.js
export async function POST(req) {
  const { projectId } = await req.json();
  // Fetch the query project
  const { data: project } = await supabaseServer
    .from('projects').select('embedding').eq('id', projectId).single();
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  const queryVector = project.embedding;
  // Fetch all projects embeddings
  const { data: allProjects } = await supabaseServer
    .from('projects').select('id, title, embedding');
  // Compute similarity
  const similarities = allProjects.map(p => {
    // If Supabase returns embedding as string, parse it
    const vec = typeof p.embedding === 'string' ? JSON.parse(p.embedding) : p.embedding;
    return {
      id: p.id,
      title: p.title,
      score: cosineSimilarity(queryVector, vec)  // from lib/vectorUtils
    };
  });
  // Sort by descending similarity (highest score first) and pick top 5
  similarities.sort((a, b) => b.score - a.score);
  const topMatches = similarities.slice(0, 5);
  return NextResponse.json({ matches: topMatches });
}
