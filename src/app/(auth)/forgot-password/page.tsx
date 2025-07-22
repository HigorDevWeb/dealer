'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.ok || data.message?.includes('sent')) {
                setSent(true);
            } else {
                setError(data.error?.message || 'Erro ao enviar e-mail');
            }
        } catch (err) {
            setError('Erro na conexão');
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800">
            <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/80 shadow-lg rounded-2xl p-8 space-y-8">
                <h1 className="text-2xl font-bold text-center">Esqueceu sua senha?</h1>
                <p className="text-gray-600 text-sm text-center">
                    Digite seu e-mail para receber um link de redefinição de senha.
                </p>
                {sent ? (
                    <div className="text-green-600 text-center">
                        Verifique seu e-mail! Um link de redefinição foi enviado.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100 dark:bg-gray-800"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Enviar link de redefinição
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
