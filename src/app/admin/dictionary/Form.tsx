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
    const [originalWords, setOriginalWords] = useState<string[]>(
        data?.original_word ? [data.original_word] : [""]
    );
    const [mean, setMean] = useState<string>(data?.mean || "");

    const handleAddWord = () => {
        setOriginalWords([...originalWords, ""]);
    };

    const handleChangeWord = (index: number, value: string) => {
        const newWords = [...originalWords];
        newWords[index] = value;
        setOriginalWords(newWords);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // مهم! جلوی submit فرم مرورگر
        submit({ original_words: originalWords, mean });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <div>
                    <Label>کلمه اصلی</Label>
                    {originalWords.map((word, index) => (
                        <div key={index} className="flex items-center gap-2 my-1">
                            <Input
                                value={word}
                                onChange={(e) => handleChangeWord(index, e.target.value)}
                            />
                            {!data && index === originalWords.length - 1 && (
                                <button
                                    type="button"
                                    onClick={handleAddWord}
                                    className="text-white bg-blue-500 px-2 py-1 rounded"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <Label>معنی</Label>
                    <Input
                        value={mean}
                        onChange={(e) => setMean(e.target.value)}
                    />
                </div>
            </div>
            <hr className={"my-5"} />
            <div className={"flex justify-center my-5"}>
                <ButtonPrimary type={"submit"}>ذخیره</ButtonPrimary>
            </div>
        </form>
    );
}
