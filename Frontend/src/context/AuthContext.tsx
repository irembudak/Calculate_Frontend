import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react"; // sadece tipler için import

/**
 * RegisterFormData: Kayıt formundan gelen verilerin tip tanımı.
 */
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

/**
 * AuthContextType: AuthContext'in tuttuğu değerlerin tip tanımı.
 * - isAuthenticated: Kullanıcı giriş yapmış mı?
 * - user: Kullanıcı bilgisi (örnek için sadece "name" alanı kullandık).
 * - login: Giriş yapma fonksiyonu.
 * - logout: Çıkış yapma fonksiyonu.
 * - register: Kayıt olma fonksiyonu.
 */
interface AuthContextType {
    isAuthenticated: boolean;
    user: { name: string } | null;
    login: (userData: { name: string }) => void;
    logout: () => void;
    register: (formData: RegisterFormData) => Promise<void>;
}

/**
 * Context'in başlangıç değeri.
 * Burada register'ı da eklemek zorundayız yoksa TS2741 hatası alırız.
 */
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
    register: async () => {}, // default boş implementasyon
});

/**
 * AuthProvider:
 * - Uygulamayı sarmalar ve alt bileşenlere kimlik doğrulama verilerini sağlar.
 * - localStorage kullanarak kullanıcı oturumunu tarayıcıda saklar.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Kullanıcı state'i (başlangıçta localStorage'dan okunur)
    const [user, setUser] = useState<{ name: string } | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Kullanıcı değiştiğinde localStorage'ı güncelle
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    /**
     * login:
     * - Normalde backend'e gidip doğrulama yapılmalı.
     * - Burada sadece gelen userData'yı state'e atıyoruz.
     */
    const login = (userData: { name: string }) => {
        setUser(userData);
    };

    /**
     * logout:
     * - Kullanıcıyı çıkış yaptırır.
     * - State'i null yapar, useEffect ile localStorage temizlenir.
     */
    const logout = () => {
        setUser(null);
    };

    /**
     * register:
     * - Normalde backend'e kayıt isteği atılmalı.
     * - Burada basit bir örnek: gelen form verilerinden user state oluşturuyoruz.
     */
    const register = async (formData: RegisterFormData) => {
        console.log("Kayıt olunuyor:", formData);
        setUser({ name: formData.username }); // sadece username'i user'a atadık
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                login,
                logout,
                register, // ✅ artık value içinde mevcut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * useAuth:
 * - Proje genelinde AuthContext'e kolay erişim sağlar.
 * - useContext(AuthContext) kısayolu olarak kullanılır.
 */
export const useAuth = (): AuthContextType => useContext(AuthContext);
