import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
//import useAuth from "../hooks/useAuth";

/**
 * useAuth kancası: AuthContext'e kolay erişim sağlar.
 * Bu kanca, bileşenlerde kullanıcı bilgisine, giriş/çıkış fonksiyonlarına erişmeyi sağlar.
 */
const useAuth = () => {
    return useContext(AuthContext);
};

// Hem default hem named export
export { useAuth };
export default useAuth;