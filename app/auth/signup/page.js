'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) router.push('/dashboard');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="mt-2" />
      <Button onClick={handleSignup} className="mt-4">Sign Up</Button>
    </div>
  );
}
