import Input from "@/shared/Input/Input";
import {useFormContext} from "react-hook-form";

interface Props {
    option: any;
    index: number; // اندیس واقعیِ آیتم در آرایه options
}

export default function ProductOptionForm({ option, index }: Props) {
    const { register } = useFormContext();

    return (
        <div className="flex items-center justify-between gap-2">
            {/* فیلدهای مخفی که باید همراه فرم ارسال شوند */}
            <input type="hidden" {...register(`options.${index}.productId`)} />
            <input type="hidden" {...register(`options.${index}.id`)} />
            <input type="hidden" {...register(`options.${index}.option_item_id`)} />

            <div className="flex-1">
                <label>{option.title}</label>
            </div>
            <div className="flex-1">
                <Input {...register(`options.${index}.value` as const)} />
            </div>
        </div>
    );
}
