'use client';

import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.signOut().then(() => router.push('/'));
  }, [router]);

  return <p className="text-center mt-20">Logging out...</p>;
}
