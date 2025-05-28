// components/LoginForm.jsx
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Signup successful! Please confirm your email.');
  }
  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function handleOAuth(provider) {
    await supabase.auth.signInWithOAuth({ provider }); // e.g. provider='github'
  }

  return (
    <form>
      <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={()=>handleOAuth('github')}>Log In with Google</button>
    </form>
  );
}
