"use client";
import {findById} from "@/services/api/shop/order";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import OrderInvoice from "@/components/OrderInvoice/OrderInvoice";
import styles from "@/components/OrderInvoice/invoice.module.css";
const number = (value: number | string | undefined) => Number(value || 0).toLocaleString("fa-IR");
export default function Page() {
    const {id} = useParams<{id: string}>();
    const {data: order, isPending, isError} = useQuery({queryKey: ["order-info", id], queryFn: () => findById(Number(id)), staleTime: 5000});
    if (isPending) return <p className="p-12 text-center" role="status">در حال دریافت فاکتور…</p>;
    if (isError || !order) return <p className="p-12 text-center" role="alert">دریافت فاکتور امکان‌پذیر نیست. لطفاً دوباره تلاش کنید.</p>;
    return <div className={styles.page}>
        <div className={styles.toolbar}><p>فاکتور فروش سفارش شماره {number(order.id)}</p><ButtonPrimary onClick={() => window.print()}>چاپ / ذخیره PDF</ButtonPrimary><span>در موبایل، جدول را به طرفین بکشید تا همه ستون‌ها را ببینید.</span></div>
        <div className={styles.viewport}><OrderInvoice order={order}/></div>
    </div>;
}
