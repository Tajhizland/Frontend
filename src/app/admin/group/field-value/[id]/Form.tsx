"use client"

import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import {GroupFieldResponse} from "@/services/types/groupField";
import {GroupProductResponse} from "@/services/types/groupProduct";
import {GroupFieldValueResponse} from "@/services/types/groupFieldValue";
import {setFieldValue} from "@/services/api/admin/productGroup";
import {useApiMutation} from "@/hooks/useApiMutation";

interface Form {
    field: GroupFieldResponse;
    value: GroupProductResponse;
}

export default function Form({field, value}: Form) {
    const findFieldValue = (
        fieldId: number,
        fieldValues: GroupFieldValueResponse[] | undefined
    ): string => {
        if (!fieldValues) return "";
        const fieldValue = fieldValues.find((value) => value.group_field_id === fieldId);
        return fieldValue ? fieldValue.value : "";
    };

    const saveMutation = useApiMutation(
        (formData: FormData) =>
            setFieldValue({
                groupProductId: value.id,
                fieldId: field.id,
                value: formData.get("value")?.toString() ?? "",
            }),
        {invalidate: [["group-field-value"]]}
    );

    return (<>
        <form className={"flex flex-col md:flex-row justify-between gap-2"} action={(formData) => saveMutation.mutate(formData)}>
            <label className={"text-sm"}>
                {field.title}
            </label>
            <Input name={"value"} type={"text"} defaultValue={findFieldValue(field.id, value.value)}/>
            <ButtonPrimary type={"submit"} loading={saveMutation.isPending}>
                ذخیره
            </ButtonPrimary>
        </form>
    </>)
}
