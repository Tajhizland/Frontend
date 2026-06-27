"use client";

import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Form, {DictionaryFormValues} from "@/app/admin/dictionary/Form";
import {store} from "@/services/api/admin/dictionary";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

export default function Page() {
    const mutation = useMutation({
        mutationKey: ["store-dictionary"],
        mutationFn: async (values: DictionaryFormValues) => {
            const words = values.original_word
                .split(",")
                .map((w) => w.trim())
                .filter((w) => w.length > 0);

            let success = true;
            for (const word of words) {
                const response = await store({original_word: word, mean: values.mean});
                if (!response?.success) success = false;
            }
            return {success, message: "عملیات با موفقیت انجام شد"};
        },
        onSuccess: (response) => {
            if (response.success) toast.success(response.message as string);
        },
    });

    return (
        <>
            <Breadcrump
                breadcrumb={[
                    {title: "دیکشنری", href: "dictionary"},
                    {title: "افزودن دیکشنری", href: "dictionary/create"},
                ]}
            />
            <Panel>
                <PageTitle>افزودن دیکشنری جدید</PageTitle>
                <div>
                    <Form onSubmit={mutation.mutateAsync} loading={mutation.isLoading} resetOnSuccess />
                </div>
            </Panel>
        </>
    );
}
