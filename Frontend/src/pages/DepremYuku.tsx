import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    SDS: number; // Kısa periyot tasarım spektral ivme katsayısı
    Wp: number;  // Ekipmanın ağırlığı (kN)
    z: number;   // Kat yüksekliği (m)
    h: number;   // Bina toplam yüksekliği (m)
    Rp: number;  // Davranış katsayısı
    Ip: number;  // Önem katsayısı
}

const DepremYuku: React.FC = () => {
    // 🔹 Input değerleri
    const [values, setValues] = useState<Inputs>({
        SDS: 0,
        Wp: 0,
        z: 0,
        h: 0,
        Rp: 1,
        Ip: 1,
    });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Rapor context fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    // ✅ Hesaplama: F = SDS * Wp * ((1 + 2z/h) / (Rp/Ip))
    const handleCalculate = () => {
        const { SDS, Wp, z, h, Rp, Ip } = values;

        if (h > 0 && Rp > 0) {
            const F = SDS * Wp * ((1 + (2 * z) / h) / (Rp / Ip));
            setResult(F);
            setShowReportBtn(true);
        } else {
            setResult(null);
            setShowReportBtn(false);
        }
    };

    // ✅ Rapor kaydet (artık PDF indirmiyor!)
    const handleReport = () => {
        if (result === null) return;

        saveAndExportReport(
            "Deprem Yükü Hesaplama",
            {
                "SDS": values.SDS,
                "Ekipman Ağırlığı (Wp)": `${values.Wp} kN`,
                "Kat Yüksekliği (z)": `${values.z} m`,
                "Bina Yüksekliği (h)": `${values.h} m`,
                "Davranış Katsayısı (Rp)": values.Rp,
                "Önem Katsayısı (Ip)": values.Ip,
            },
            `Deprem Yükü (F) = ${result.toFixed(2)} kN`
        );

        setShowReportBtn(false);
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-black text-center">
                Deprem Yükü Hesaplama
            </h2>

            {/* Inputlar */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">SDS (-):</label>
                    <input
                        type="number"
                        step="any"
                        name="SDS"
                        value={values.SDS}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">Wp (kN):</label>
                    <input
                        type="number"
                        step="any"
                        name="Wp"
                        value={values.Wp}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">z (m):</label>
                    <input
                        type="number"
                        step="any"
                        name="z"
                        value={values.z}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">h (m):</label>
                    <input
                        type="number"
                        step="any"
                        name="h"
                        value={values.h}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">Rp (-):</label>
                    <input
                        type="number"
                        step="any"
                        name="Rp"
                        value={values.Rp}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">Ip (-):</label>
                    <input
                        type="number"
                        step="any"
                        name="Ip"
                        value={values.Ip}
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
                        Sonuç (F):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} kN</span>
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

export default DepremYuku;
