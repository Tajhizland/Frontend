"use client"

import { storeComment } from "@/services/api/shop/comment"
import { useApiMutation } from "@/hooks/useApiMutation"
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Textarea from "@/shared/Textarea/Textarea";
import Label from "@/shared/Label/Label";

export default function CommentModal({ productId }: { productId: number }) {
    const commentMutation = useApiMutation((form: FormData) =>
        storeComment({
            productId: productId + "",
            rating: form.get("rating") as string,
            text: form.get("text") as string,
        })
    );
    return (<>
        <div>
            <form className="grid grid-cols-1 gap-6"  action={(form) => commentMutation.mutate(form)}>
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
                    <ButtonPrimary type="submit" loading={commentMutation.isPending}>ثبت نظر  </ButtonPrimary>
                </div>
            </form>
        </div>
    </>)
}
