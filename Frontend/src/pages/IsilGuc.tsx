import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    m: number;      // Kütle debisi (kg/s)
    cp: number;     // Özgül ısı kapasitesi (kJ/kgK)
    deltaT: number; // Sıcaklık farkı (K)
}

const IsilGuc: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ m: 0, cp: 0, deltaT: 0 });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });

    // ✅ Hesaplama: Q = m * cp * ΔT
    // m   → kütle debisi (kg/s)
    // cp  → özgül ısı kapasitesi (kJ/kgK)
    // ΔT  → sıcaklık farkı (K)
    // NOT: cp kJ/kgK olduğundan sonuç kW çıkacak (1 kJ/s = 1 kW)
    const handleCalculate = () => {
        const { m, cp, deltaT } = values;

        if (m > 0 && cp > 0 && deltaT > 0) {
            const Q = m * cp * deltaT; // kW
            setResult(Q);
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
            "Isıl Güç Hesaplama",
            {
                "Kütle Debisi (m)": `${values.m} kg/s`,
                "Özgül Isı Kapasitesi (cp)": `${values.cp} kJ/kgK`,
                "Sıcaklık Farkı (ΔT)": `${values.deltaT} K`,
            },
            `Isıl Güç (Q) = ${result.toFixed(2)} kW`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-black text-center">
                Isıl Güç Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">m (kg/s):</label>
                    <input
                        type="number"
                        step="any"
                        name="m"
                        value={values.m}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">cp (kJ/kgK):</label>
                    <input
                        type="number"
                        step="any"
                        name="cp"
                        value={values.cp}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">ΔT (K):</label>
                    <input
                        type="number"
                        step="any"
                        name="deltaT"
                        value={values.deltaT}
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
                        Sonuç (Q):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} kW</span>
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

export default IsilGuc;
