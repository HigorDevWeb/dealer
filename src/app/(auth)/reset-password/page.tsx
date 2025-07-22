'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Suspense } from 'react';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code') || '';
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!code) {
            setError('Código de redefinição inválido');
            return;
        }
        if (password !== passwordConfirmation) {
            setError('As senhas não coincidem');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, password, passwordConfirmation }),
            });
            const data = await res.json();
            if (data.user) {
                setSuccess(true);
                setTimeout(() => router.push('/auth/login'), 2000);
            } else {
                setError(data.error?.message || 'Erro ao redefinir senha');
            }
        } catch (err) {
            setError('Erro na conexão');
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800">
            <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/80 shadow-lg rounded-2xl p-8 space-y-8">
                <h1 className="text-2xl font-bold text-center">Redefinir senha</h1>
                {success ? (
                    <div className="text-green-600 text-center">Senha redefinida com sucesso! Redirecionando...</div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-4">
                        <input
                            type="password"
                            required
                            placeholder="Nova senha"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Confirme a nova senha"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800"
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Redefinir senha
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
export const dynamic = "force-dynamic";
