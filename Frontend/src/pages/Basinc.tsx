import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ rapor context

// 🔹 Girdi tiplerini tanımlıyoruz
interface Inputs {
    F: number; // Kuvvet (Newton)
    A: number; // Alan (metrekare)
}

const Basinc: React.FC = () => {
    // 🔹 Kullanıcının girdiği değerler
    const [values, setValues] = useState<Inputs>({ F: 0, A: 0 });

    // 🔹 Hesaplanan sonuç
    const [result, setResult] = useState<number | null>(null);

    // 🔹 "Raporla" butonunu kontrol eden state
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonlarını context'ten alıyoruz
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    // ✅ Hesaplama: P = F / A
    const handleCalculate = () => {
        if (values.A > 0) {
            const P = values.F / values.A;
            setResult(P);
            setShowReportBtn(true); // hesaplama başarılı → rapor butonunu göster
        } else {
            setResult(null);
            setShowReportBtn(false); // geçersiz → rapor butonunu gizle
        }
    };

    // ✅ Rapor kaydetme (artık sadece kaydediyor, PDF indirmiyor!)
    const handleReport = () => {
        if (result === null) return;

        saveAndExportReport(
            "Basınç Hesaplama", // rapor başlığı
            {
                "Kuvvet (F)": `${values.F} N`,
                "Alan (A)": `${values.A} m²`,
            },
            `Basınç (P) = ${result.toFixed(2)} Pa`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 px-4 py-2 rounded-full text-center">
                Basınç Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">F (N):</label>
                    <input
                        type="number"
                        step="any"
                        name="F"
                        value={values.F}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">A (m²):</label>
                    <input
                        type="number"
                        step="any"
                        name="A"
                        value={values.A}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
            </div>

            {/* Hesapla butonu */}
            <button
                onClick={handleCalculate}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Hesapla
            </button>

            {/* Sonuç kutusu */}
            {result !== null && (
                <div className="mt-4 p-3 bg-white rounded-lg shadow text-black">
                    <p className="font-bold">
                        Sonuç (P):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} Pa</span>
                    </p>
                </div>
            )}

            {/* Raporla butonu */}
            {showReportBtn && (
                <button
                    onClick={handleReport}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    📄 Raporla
                </button>
            )}
        </div>
    );
};

export default Basinc;
