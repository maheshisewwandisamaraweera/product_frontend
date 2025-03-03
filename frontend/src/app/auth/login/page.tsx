'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '../../../../utils/api';
import { useState } from 'react';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log(data);
      const res = await api.post<{ token: string }>('/auth/login', data);
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      router.push('/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input {...register('username')} placeholder="Username" className="border p-2 mb-2 w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="border p-2 mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
