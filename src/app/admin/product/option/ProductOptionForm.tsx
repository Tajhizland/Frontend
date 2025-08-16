import Input from "@/shared/Input/Input";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useMutation} from "react-query";
import toast from "react-hot-toast";
import {OptionItemsResponse} from "@/services/types/optionItem";
import {updateProductOption} from "@/services/api/admin/option";

interface optionItemProps {
    data?: OptionItemsResponse;
    productId: number;
}

export default function ProductOptionForm({data, productId}: optionItemProps) {

    const mutation = useMutation({
        mutationKey: [`update-product-option`],
        mutationFn: async (formData: any) => {
            return updateProductOption({
                ...formData,
            });
        },
        onSuccess: (data) => {
            if (data.success)
                toast.success(data?.message ?? "")
        },
    });

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            productId: "",
            id: null,
            option_item_id: "",
            value: "",
        },
    });

    useEffect(() => {
        setValue("productId", productId.toString());
        if (data) {
            setValue("option_item_id", data.id.toString());
            if (data.productOption) {
                //@ts-ignore
                setValue("id", data.productOption.id.toString());
                setValue("value", data.productOption.value);
            }
        }
    }, [data, setValue]);

    //@ts-ignore
    return (<form className={"flex items-center justify-between gap-2"} onSubmit={handleSubmit(mutation.mutateAsync)}>
        <div className={"flex-1"}>
            <label>
                {data?.title}
            </label>
        </div>
        <div className={"flex-1"}>
            <Input {...register("value")}/>
        </div>
        <div className={"flex-1 "}>
            <ButtonPrimary>
                ذخیره
            </ButtonPrimary>
        </div>
    </form>)
}
