import { createContext, useContext, useState, ReactNode } from "react";
import jsPDF from "jspdf"; // ✅ jsPDF default import

// 🔹 Tek bir raporun yapısını tanımlıyoruz
export interface Report {
    id: string; // raporun benzersiz ID'si
    title: string; // rapor başlığı (örn. Basınç Hesaplama)
    inputs: Record<string, number | string>; // girilen değerler
    result: string; // hesaplanan sonuç
    createdAt: string; // oluşturulma tarihi
}

// 🔹 Context içinde kullanılacak tipler
interface ReportContextType {
    reports: Report[]; // tüm rapor listesi
    addReport: (report: Report) => void; // sadece yeni rapor ekleme
    exportToPDF: (report: Report) => void; // tek raporu PDF olarak indirme
    saveAndExportReport: ( // hesaplama sayfalarından çağrılacak fonksiyon
        title: string,
        inputs: Record<string, number | string>,
        result: string
    ) => void;
}

// 🔹 Context oluşturma
const ReportContext = createContext<ReportContextType | undefined>(undefined);

// 🔹 Provider: tüm uygulamaya rapor state'ini sağlar
export const ReportProvider = ({ children }: { children: ReactNode }) => {
    const [reports, setReports] = useState<Report[]>([]); // raporları tutan state

    // ✅ 1. Yeni rapor ekleme
    const addReport = (report: Report) => {
        setReports((prev) => [...prev, report]);
    };

    // ✅ 2. Tek raporu PDF olarak indirme
    const exportToPDF = (report: Report) => {
        const doc = new jsPDF();

        // Başlık
        doc.setFontSize(16);
        doc.text(`${report.title} Raporu`, 10, 10);

        // Tarih
        doc.setFontSize(10);
        doc.text(`Tarih: ${report.createdAt}`, 10, 20);

        // Inputlar
        let y = 40;
        Object.entries(report.inputs).forEach(([key, val]) => {
            doc.text(`${key}: ${val}`, 20, y);
            y += 10;
        });

        // Sonuç
        y += 10;
        doc.setFontSize(12);
        doc.text(`Sonuç: ${report.result}`, 10, y);

        // PDF indir
        doc.save(`${report.title.toLowerCase().replace(/\s+/g, "-")}-rapor.pdf`);
    };

    // ✅ 3. Hesaplama sayfalarında kullanılan fonksiyon
    // Artık sadece rapora kaydediyor, PDF indirmiyor!
    const saveAndExportReport = (
        title: string,
        inputs: Record<string, number | string>,
        result: string
    ) => {
        const report: Report = {
            id: Date.now().toString(),
            title,
            inputs,
            result,
            createdAt: new Date().toLocaleString(),
        };
        addReport(report); // sadece kaydetme işlemi
    };

    return (
        <ReportContext.Provider
            value={{ reports, addReport, exportToPDF, saveAndExportReport }}
        >
            {children}
        </ReportContext.Provider>
    );
};

// 🔹 Hook: kolay kullanım için
export const useReports = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error("useReports must be used within a ReportProvider");
    }
    return context;
};
