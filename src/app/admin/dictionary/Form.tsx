"use client"
import Label from "@/shared/Label/Label";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { useState } from "react";
import { DictionaryResponse } from "@/services/types/dictionary";

interface FormProps {
    data?: DictionaryResponse;
    submit: (e: { original_words: string[]; mean: string }) => void;
}

export default function Form({ data, submit }: FormProps) {
    const [inputValue, setInputValue] = useState<string>(data?.original_word || "");
    const [mean, setMean] = useState<string>(data?.mean || "");

    // حالت ویرایش فقط یک کلمه رو داخل آرایه برمی‌گردونه
    const originalWords = data
        ? [inputValue] // در حالت ویرایش
        : inputValue
            .split(",") // در حالت ایجاد
            .map((w) => w.trim())
            .filter((w) => w.length > 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit({ original_words: originalWords, mean });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>
                        کلمات اصلی {data ? "" : "(با , جدا کن)"}
                    </Label>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={
                            data
                                ? "کلمه اصلی"
                                : "مثلاً: اسپرسو, اسپر سو, اسسپرسوو"
                        }
                    />
                    {/* فقط در حالت ایجاد لیست نمایش بده */}
                    {!data && originalWords.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                            {originalWords.map((word, index) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <Label>معنی</Label>
                    <Input value={mean} onChange={(e) => setMean(e.target.value)} />
                </div>
            </div>
            <hr className={"my-5"} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>ذخیره</ButtonPrimary>
            </div>
        </form>
    );
}
