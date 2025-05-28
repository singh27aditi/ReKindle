'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.push('/');
      else setUser(data.user);
    });
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Welcome, {user?.email}</h1>
      <Button onClick={() => router.push('/logout')}>Logout</Button>
    </div>
  );
}
