import Badge from "@/shared/Badge/Badge";

import Label from "@/shared/Label/Label";
import Select from "@/shared/Select/Select";
import {useForm} from "react-hook-form";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function TapinForm({
                                      loading = true,
                                      submit,
                                  }: {
    loading: boolean;
    submit: (formData: any) => Promise<any>;
}) {
    const {register, handleSubmit, control, formState: {errors}, setValue, reset} = useForm({
        defaultValues: {
            status: "1",
        },
    });


    const onSubmit = async (formData: any) => {
        await submit(formData);
        reset();
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Badge name={"تاپین"} color={"green"}/>
                <div className="grid grid-cols-1  gap-x-5 gap-y-5 mt-5">
                    <div>
                        <Label>وضعیت پستی</Label>
                        <Select  {...register("status", {required: "وضعیت الزامی است"})}>
                            <option value={1}>
                                عادی
                            </option>
                            <option value={2}>شکستنی</option>

                            <option value={3}>مایعات</option>

                            <option value={4}>غیر استاندارد</option>

                        </Select>
                        {errors.status && <p className="text-error text-xs">{errors.status.message}</p>}
                    </div>
                </div>
                <div className="flex gap-5 mt-14">
                    <ButtonPrimary className="w-full" loading={loading}>
                        {loading ? "درحال ارتباط با وب سرویس تاپین" : "ثبت در تاپین"}
                    </ButtonPrimary>
                </div>
            </form>
        </>
    )

}