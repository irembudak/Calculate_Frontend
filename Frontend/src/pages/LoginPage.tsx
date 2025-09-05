import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * LoginPage:
 * - Kullanıcı giriş ekranı
 * - Email ve şifre validasyonu içerir
 * - Başarılı girişte /home yönlendirmesi yapılır
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Form alanları
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hata mesajları
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    /**
     * Validasyon kontrolü
     */
    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

        // Email kontrolü
        if (!email) {
            newErrors.email = "E-posta gerekli.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Geçerli bir e-posta adresi giriniz.";
        }

        // Şifre kontrolü
        if (!password) {
            newErrors.password = "Şifre gerekli.";
        } else if (password.length < 6) {
            newErrors.password = "Şifre en az 6 karakter olmalı.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Giriş yapma işlemi
     */
    const handleLogin = () => {
        if (!validate()) return;

        // Örn: email'in '@' öncesini kullanıcı adı olarak alıyoruz
        login({ name: email.split("@")[0] || "User" });

        // Giriş başarılı → yönlendirme
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-purple-800">
            {/* Başlık */}
            <h1 className="text-8xl font-extrabold tracking-widest mb-12 bg-gradient-to-r from-purple-500 via-purple-300 to-white text-transparent bg-clip-text">
                CALCULATE
            </h1>

            {/* Form alanları */}
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                {/* Email */}
                <div className="w-full">
                    <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-500">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e-mail"
                            className="w-full px-4 py-2 rounded-full bg-gray-900 text-white focus:outline-none placeholder-purple-300"
                        />
                    </div>
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Şifre */}
                <div className="w-full">
                    <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-500">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="şifre"
                            className="w-full px-4 py-2 rounded-full bg-gray-900 text-white focus:outline-none placeholder-purple-300"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
            </div>

            {/* Giriş butonu */}
            <button
                onClick={handleLogin}
                className="mt-6 w-full max-w-xs px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
            >
                Giriş Yap
            </button>

            {/* Alt kısım */}
            <p className="mt-6 text-white">
                Hesabınız yok mu?{" "}
                <Link to="/register" className="font-semibold text-blue-400 hover:underline">
                    Kayıt Ol
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
