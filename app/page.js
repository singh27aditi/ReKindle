'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) router.push('/dashboard');
    });
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to ReKindle</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => router.push('/auth/signup')}>Sign Up</Button>
          <Button variant="outline" onClick={() => router.push('/auth/login')}>Log In</Button>
          <Button variant="ghost" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
            Sign In with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
