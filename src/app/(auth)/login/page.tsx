'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });

            const data = await res.json();

            if (data.jwt) {
                // Salva o JWT no localStorage/cookies (recomendado: httpOnly cookie via backend API Route)
                localStorage.setItem('jwt', data.jwt);
                // Redireciona para o dashboard
                router.push('/');
            } else {
                setError(data.error?.message || 'Erro ao logar');
            }
        } catch (err) {
            setError('Erro na conexão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800">
            <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/80 shadow-lg rounded-2xl p-8 space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-2">
                    <img src="/Logo-Dealerspace.svg" alt="Logo" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoFocus
                            autoComplete="email"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
                <div className="flex justify-between items-center text-sm">
                    <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
                        Esqueceu sua senha?
                    </Link>
                </div>
            </div>
        </main>
    );
}
