import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * RegisterPage:
 * - Kullanıcı kayıt ekranı
 * - Email, kullanıcı adı, şifre kuralları kontrol edilir
 * - Şifre kuralları ilk hatalı denemede listelenir
 * - Şifre alanına mouse ile gelince kurallar tooltip olarak görünür
 */
const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Şifre kuralları
    const validatePassword = (password: string, confirmPassword: string) => {
        const rules: string[] = [];

        if (password.length < 8) {
            rules.push("Şifre en az 8 karakter olmalı");
        }
        if (!/[A-Z]/.test(password)) {
            rules.push("Şifre en az 1 büyük harf içermeli");
        }
        if (!/[a-z]/.test(password)) {
            rules.push("Şifre en az 1 küçük harf içermeli");
        }
        if (!/[0-9]/.test(password)) {
            rules.push("Şifre en az 1 rakam içermeli");
        }
        if (!/[@$!%*?&]/.test(password)) {
            rules.push("Şifre en az 1 özel karakter içermeli (@$!%*?&)");
        }
        if (password !== confirmPassword) {
            rules.push("Şifreler uyuşmuyor");
        }

        return rules;
    };

    // Input değişimi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Kayıt işlemi
    const handleRegister = () => {
        setSubmitted(true);

        // Boş alan kontrolü
        const isEmpty = Object.values(formData).some((val) => val.trim() === "");
        if (isEmpty) {
            setErrors(["Lütfen tüm alanları doldurun!"]);
            return;
        }

        // Şifre validasyonu
        const passwordErrors = validatePassword(
            formData.password,
            formData.confirmPassword
        );
        if (passwordErrors.length > 0) {
            setErrors(passwordErrors);
            return;
        }

        // Hatalar yoksa başarılı
        setErrors([]);
        register(formData);

        alert("✅ Kayıt başarılı! Doğrulama kodu gönderildi.");
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-800">
            <div className="w-full max-w-md p-8 rounded-2xl text-center bg-white shadow-lg">
                {/* Başlık */}
                <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-wide">
                    CALCULATE
                </h2>

                {/* Form alanları */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Ad"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Soyad"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <input
                    type="text"
                    name="username"
                    placeholder="Kullanıcı Adı"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="E-posta"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                {/* Şifre + kurallar tooltip */}
                <div className="relative mt-4 group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Şifre"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <span className="absolute left-0 -top-16 w-full text-xs bg-white text-black px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition shadow-md border">
            Şifre en az 8 karakter, büyük-küçük harf, rakam ve özel karakter
            içermeli.
          </span>
                </div>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Şifre Tekrar"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 rounded-full border-2 border-purple-500 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                {/* Hata mesajları */}
                {submitted && errors.length > 0 && (
                    <div className="mt-4 text-sm text-red-600 text-left bg-white p-3 rounded shadow">
                        <ul className="list-disc ml-6">
                            {errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Kayıt Ol butonu */}
                <button
                    onClick={handleRegister}
                    className="w-full p-3 mt-6 rounded-full text-white text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600"
                >
                    Kayıt Ol
                </button>

                {/* Alt link */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    Zaten hesabınız var mı?{" "}
                    <Link
                        to="/login"
                        className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:underline"
                    >
                        Giriş Yap
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
