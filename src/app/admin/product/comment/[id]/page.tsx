"use client";

import {useState} from "react";
import {useParams} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ProductTab from "@/components/Tabs/ProductTab";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {findById} from "@/services/api/admin/product";
import {AdminCommentDto, productComments, saveProductComment, deleteProductComment} from "@/services/api/admin/comment";

export default function Page() {
    const {id} = useParams();
    const productId = Number(id);
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState<number>();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<AdminCommentDto>({
        defaultValues: {author_name: "", text: "", rating: 5},
    });
    const {data: product} = useQuery({queryKey: ["product-info", productId], queryFn: () => findById(productId)});
    const {data: comments, isLoading, isError} = useQuery({
        queryKey: ["product-comments", productId], queryFn: () => productComments(productId),
    });
    const clear = () => {setEditingId(undefined); reset({author_name: "", text: "", rating: 5});};
    const refresh = () => {
        queryClient.invalidateQueries({queryKey: ["product-comments", productId]});
        queryClient.invalidateQueries({queryKey: ["product-info", productId]});
        queryClient.invalidateQueries({queryKey: ["table"]});
    };
    const save = useMutation({
        mutationFn: (values: AdminCommentDto) => saveProductComment(productId, values, editingId),
        onSuccess: () => {clear(); refresh(); toast.success("نظر ذخیره شد");},
    });
    const remove = useMutation({
        mutationFn: (commentId: number) => deleteProductComment(productId, commentId),
        onSuccess: (_, commentId) => {if (editingId === commentId) clear(); refresh(); toast.success("نظر حذف شد");},
    });
    const busy = save.isPending || remove.isPending;

    return <>
        <Breadcrump breadcrumb={[{title: "محصولات", href: "product"}, {title: "نظر ها", href: `product/comment/${id}`}]} />
        <Panel>
            <PageTitle>نظر های محصول</PageTitle>
            <ProductTab id={String(id)} url={product?.url ?? ""} />
            <form className="my-6 space-y-4" onSubmit={handleSubmit(values => save.mutate(values))}>
                <h2>{editingId ? "ویرایش نظر" : "افزودن نظر"}</h2>
                <label className="block">نام
                    <Input {...register("author_name", {required: "نام الزامی است", maxLength: 255})} disabled={busy} />
                </label>
                {errors.author_name && <p className="text-red-600">{errors.author_name.message}</p>}
                <label className="block">امتیاز
                    <Select {...register("rating", {valueAsNumber: true, required: true, min: 1, max: 5})} disabled={busy}>
                        {[1, 2, 3, 4, 5].map(value => <option key={value} value={value}>{value}</option>)}
                    </Select>
                </label>
                <label className="block">متن نظر
                    <textarea className="block w-full rounded-xl border border-neutral-300 p-3 dark:bg-neutral-900" rows={4}
                        {...register("text", {required: "متن نظر الزامی است", maxLength: 10000})} disabled={busy} />
                </label>
                {errors.text && <p className="text-red-600">{errors.text.message}</p>}
                <div className="flex gap-3">
                    <ButtonPrimary type="submit" disabled={busy}>{editingId ? "ذخیره تغییرات" : "ثبت نظر"}</ButtonPrimary>
                    {editingId && <button type="button" onClick={clear} disabled={busy}>انصراف از ویرایش</button>}
                </div>
            </form>
            {isLoading && <p>در حال بارگذاری…</p>}
            {isError && <p role="alert">دریافت نظرها ناموفق بود.</p>}
            {comments?.length === 0 && <p>هنوز نظری توسط ادمین ثبت نشده است.</p>}
            <div className="space-y-4">
                {comments?.map(comment => <article key={comment.id} className="rounded-xl border border-neutral-200 p-4 space-y-2">
                    <div>{comment.user} — امتیاز {comment.rating} از ۵</div>
                    <p className="whitespace-pre-wrap">{comment.text}</p>
                    <small>{comment.created_at}</small>
                    <div className="flex gap-4">
                        <button type="button" disabled={busy} onClick={() => {
                            setEditingId(comment.id);
                            reset({author_name: comment.user, text: comment.text, rating: Number(comment.rating)});
                        }}>ویرایش</button>
                        <button type="button" className="text-red-600" disabled={busy} onClick={() => {
                            if (window.confirm("این نظر حذف شود؟")) remove.mutate(comment.id);
                        }}>حذف</button>
                    </div>
                </article>)}
            </div>
        </Panel>
    </>;
}
