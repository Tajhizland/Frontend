"use client"

import usePWAInstallPrompt from "@/hooks/usePWAInstallPrompt";

export default function InstallPWAButton() {
    const {isInstallable, installPWA} = usePWAInstallPrompt();
    console.log(isInstallable);
    if (!isInstallable) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-md">
            <p>نصب اپلیکیشن روی گوشی؟</p>
            <button onClick={installPWA} className="bg-white text-blue-600 px-4 py-2 mt-2 rounded">
                نصب
            </button>
        </div>
    );
}