"use client"

import { storeComment } from "@/services/api/shop/comment"
import { toast } from "react-hot-toast"
import Label from "../Label/Label";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";

export default function CommentModal({ productId }: { productId: number }) {
    async function submitHandle(e: FormData) {
        let response = await storeComment({
            productId: productId+"",
            rating: e.get("rating") as string,
            text: e.get("text") as string
        })
        toast.success(response.message as string);
    }
    return (<>
        <div>
            <form className="grid grid-cols-1 gap-6"  action={submitHandle} method="post">
                <label className="block">
                    <Label>متن نظر</Label>
                    <Textarea
                        className="mt-1"
                        name="text"
                    >
                    </Textarea>
                </label>
                <label className="block">
                    <Label>امتیاز</Label>
                    <Select name="rating">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5} selected>5</option>
                    </Select>
                </label>
                <div>
                    <ButtonPrimary type="submit">ثبت نظر  </ButtonPrimary>
                </div>
            </form>
        </div>
    </>)
}