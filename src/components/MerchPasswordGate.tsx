"use client";

import { useState, useEffect } from "react";
import { Lock, ShoppingBag } from "lucide-react";

const STORAGE_KEY = "merch_unlocked";

interface MerchPasswordGateProps {
  children: React.ReactNode;
  protected?: boolean;
}

export default function MerchPasswordGate({
  children,
  protected: isProtected = true,
}: MerchPasswordGateProps) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isProtected || typeof window === "undefined") return;
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, [isProtected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/merch/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.ok) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setUnlocked(true);
        setPassword("");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!isProtected) {
    return <>{children}</>;
  }

  if (unlocked === null) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Acceso restringido
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Introduce la contraseña para acceder a la tienda en desarrollo.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
              autoFocus
              disabled={loading}
              autoComplete="current-password"
            />
            {error && (
              <p className="text-red-500 text-sm text-left">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                "Comprobando..."
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Acceder
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
