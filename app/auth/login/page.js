'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error.message);
      setErrorMsg(error.message || 'Login failed');
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2"
      />

      {errorMsg && <p className="text-red-600 mt-2 text-sm">{errorMsg}</p>}

      <Button
        onClick={handleLogin}
        className="mt-4 w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </Button>
    </div>
  );
}
