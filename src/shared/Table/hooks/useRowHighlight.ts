"use client";

import { useEffect, useRef, useState } from "react";

export const useRowHighlight = <Id,>(enabled: boolean) => {
    const [activeId, setActiveId] = useState<Id | null>(null);
    const [flashId, setFlashId] = useState<Id | null>(null);

    const activeIdRef = useRef<Id | null>(null);
    const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const markedAt = useRef<number>(0);
    const armed = useRef<boolean>(false);

    const flash = (id: Id) => {
        if (flashTimer.current) clearTimeout(flashTimer.current);
        setFlashId(null);
        requestAnimationFrame(() => {
            setFlashId(id);
            flashTimer.current = setTimeout(() => setFlashId(null), 1200);
        });
    };

    const mark = (id: Id) => {
        if (!enabled) return;
        activeIdRef.current = id;
        markedAt.current = performance.now();
        setActiveId(id);
        flash(id);
    };

    useEffect(() => {
        if (!enabled || typeof document === "undefined") return;
        const isDialogOpen = () => !!document.querySelector("[data-headlessui-portal], [role='dialog']");
        let wasOpen = isDialogOpen();
        const observer = new MutationObserver(() => {
            const open = isDialogOpen();
            if (open === wasOpen) return;
            wasOpen = open;
            if (open) {
                armed.current = performance.now() - markedAt.current < 1500;
            } else if (armed.current && activeIdRef.current != null) {
                armed.current = false;
                flash(activeIdRef.current);
            }
        });
        observer.observe(document.body, { childList: true });
        return () => observer.disconnect();
    }, [enabled]);

    useEffect(
        () => () => {
            if (flashTimer.current) clearTimeout(flashTimer.current);
        },
        []
    );

    const rowClass = (id: Id) => {
        const marked = activeId != null && id === activeId;
        const flashing = flashId != null && id === flashId;
        return `transition-colors ${marked ? "bg-sky-50 hover:bg-sky-100" : "hover:bg-slate-50"} ${
            flashing ? "animate-row-flash" : ""
        }`;
    };

    return { mark, rowClass };
};
