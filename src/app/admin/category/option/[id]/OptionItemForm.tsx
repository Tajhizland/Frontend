import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {OptionItemsResponse} from "@/services/types/optionItem";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {updateOption} from "@/services/api/admin/option";

interface optionItemProps {
    data?: OptionItemsResponse;
    categoryId: number;
}

export default function OptionItemForm({data, categoryId}: optionItemProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: [`update-option`],
        mutationFn: async (formData: any) => {
            return updateOption({
                ...formData,
            });
        },
        onSuccess: (response) => {
            toast.success(response?.message ?? "")
            queryClient.refetchQueries(['option-info', Number(categoryId)]);
            if (!data) {
                mutation.reset();
                reset()
            }

        },
    });

    const {register, handleSubmit, control, formState: {errors}, setValue, reset} = useForm({
        defaultValues: {
            categoryId: "",
            id: null,
            title: "",
            status: "1",
        },
    });

    useEffect(() => {
        setValue("categoryId", categoryId.toString());
        if (data) {
            //@ts-ignore
            setValue("id", data.id?.toString());
            setValue("title", data.title);
            setValue("status", data.status.toString());
        }
    }, [data, setValue]);

    //@ts-ignore
    return (<form className={"flex items-center justify-between gap-2"} onSubmit={handleSubmit(mutation.mutateAsync)}>
        <div className={"flex-1"}>
            <Input {...register("title")}/>
        </div>
        <div className={"flex-1"}>
            <Select {...register("status")}>
                <option value={1}>
                    فعال
                </option>
                <option value={0}>
                    غیر‌فعال
                </option>
            </Select>
        </div>
        <div className={"flex-1"}>
            <ButtonPrimary>
                ذخیره
            </ButtonPrimary>
        </div>
    </form>)
}
