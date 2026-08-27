"use client";

import { useEffect, useMemo, useState } from "react";

export const useVisibleColumns = (storageKey: string, allKeys: string[]) => {
    const [hidden, setHidden] = useState<string[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            setHidden(saved ? JSON.parse(saved) : []);
        } catch {
            setHidden([]);
        }
        setReady(true);
    }, [storageKey]);

    useEffect(() => {
        if (!ready) return;
        localStorage.setItem(storageKey, JSON.stringify(hidden));
    }, [hidden, ready, storageKey]);

    const isVisible = (key: string) => !hidden.includes(key);

    const toggle = (key: string) =>
        setHidden((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));

    const visibleKeys = useMemo(() => allKeys.filter(isVisible), [allKeys, hidden]);

    return { isVisible, toggle, visibleKeys };
};
