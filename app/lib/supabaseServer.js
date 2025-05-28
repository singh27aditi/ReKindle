// lib/supabaseServer.js
import { createClient } from '@supabase/supabase-js';
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// lib/vectorUtils.js
export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai*ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi*bi, 0));
  return dot / (magA * magB);
}
