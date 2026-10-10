"use client";

import {useSyncExternalStore} from "react";
import toast from "react-hot-toast";

const changeEvent = "instagram-preference-change";
const subscribe = (notify: () => void) => {
    window.addEventListener("storage", notify);
    window.addEventListener(changeEvent, notify);
    return () => {
        window.removeEventListener("storage", notify);
        window.removeEventListener(changeEvent, notify);
    };
};
const serverSnapshot = () => false;

/** این ترجیحات فقط روی همین مرورگر نگهداری می‌شوند؛ API تعامل اجتماعی نداریم. */
export function usePostPreference(id: number, kind: "liked" | "saved") {
    const key = `instagram:${id}:${kind}`;
    const getSnapshot = () => {
        try {
            return window.localStorage.getItem(key) === "true";
        } catch {
            return false;
        }
    };
    const active = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
    const toggle = () => {
        try {
            if (getSnapshot()) window.localStorage.removeItem(key);
            else window.localStorage.setItem(key, "true");
            window.dispatchEvent(new Event(changeEvent));
        } catch {
            toast.error("ذخیره در این مرورگر امکان‌پذیر نیست");
        }
    };
    return [active, toggle] as const;
}
