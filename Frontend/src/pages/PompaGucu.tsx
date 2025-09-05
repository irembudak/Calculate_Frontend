import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    Q: number;     // Debi (m³/s)
    H: number;     // Basma yüksekliği (m)
    gamma: number; // Sıvı birim ağırlığı (N/m³)
    eta: number;   // Verim (0–1 arası)
}

const PompaGucu: React.FC = () => {
    // 🔹 Kullanıcı girişleri (gamma ve eta için başlangıç değerleri atanmış)
    const [values, setValues] = useState<Inputs>({
        Q: 0,
        H: 0,
        gamma: 9810, // Su için tipik değer (N/m³)
        eta: 0.85,   // Ortalama verim
    });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    // ✅ Hesaplama: P = (Q * H * γ) / η
    // Q → debi (m³/s)
    // H → basma yüksekliği (m)
    // γ → sıvı birim ağırlığı (N/m³)
    // η → verim (0–1 arası)
    const handleCalculate = () => {
        const { Q, H, gamma, eta } = values;

        if (eta > 0) {
            const P = (Q * H * gamma) / eta; // W
            setResult(P);
            setShowReportBtn(true);
        } else {
            setResult(null);
            setShowReportBtn(false);
        }
    };

    // ✅ Rapor kaydetme (artık sadece kaydediyor, PDF indirmiyor!)
    const handleReport = () => {
        if (result === null) return;

        saveAndExportReport(
            "Pompa Gücü Hesaplama",
            {
                "Debi (Q)": `${values.Q} m³/s`,
                "Basma Yüksekliği (H)": `${values.H} m`,
                "Sıvı Birim Ağırlığı (γ)": `${values.gamma} N/m³`,
                "Verim (η)": values.eta.toString(),
            },
            `Pompa Gücü (P) = ${result.toFixed(2)} W`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-black text-center">
                Pompa Gücü Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">Q (m³/s):</label>
                    <input
                        type="number"
                        step="any"
                        name="Q"
                        value={values.Q}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">H (m):</label>
                    <input
                        type="number"
                        step="any"
                        name="H"
                        value={values.H}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">γ (N/m³):</label>
                    <input
                        type="number"
                        step="any"
                        name="gamma"
                        value={values.gamma}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">η (0–1):</label>
                    <input
                        type="number"
                        step="any"
                        name="eta"
                        value={values.eta}
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
                        <span className="text-blue-600">{result.toFixed(2)} W</span>
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

export default PompaGucu;
