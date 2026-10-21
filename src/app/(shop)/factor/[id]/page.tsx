"use client";
import {findById} from "@/services/api/shop/order";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import logoLight from "@/images/lightLogo.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import styles from "./invoice.module.css";
const number = (value: number | string | undefined) => Number(value || 0).toLocaleString("fa-IR");
const money = (value: number | undefined) => `${number(value)} تومان`;
export default function Page() {
    const {id} = useParams<{id: string}>();
    const {data: order, isPending, isError} = useQuery({queryKey: ["order-info", id], queryFn: () => findById(Number(id)), staleTime: 5000});
    if (isPending) return <p className="p-12 text-center" role="status">در حال دریافت فاکتور…</p>;
    if (isError || !order) return <p className="p-12 text-center" role="alert">دریافت فاکتور امکان‌پذیر نیست. لطفاً دوباره تلاش کنید.</p>;
    const buyer = order.orderInfo;
    return <div className={styles.page}>
        <div className={styles.toolbar}><p>فاکتور فروش سفارش شماره {number(order.id)}</p><ButtonPrimary onClick={() => window.print()}>چاپ / ذخیره PDF</ButtonPrimary><span>در موبایل، جدول را به طرفین بکشید تا همه ستون‌ها را ببینید.</span></div>
        <div className={styles.viewport}><article className={styles.invoice} dir="rtl" aria-label="فاکتور فروش الکترونیکی">
            <header className={styles.header}><Image src={logoLight} alt="تجهیزلند" width={220} priority/><h1>فاکتور فروش الکترونیکی</h1><div><p>شماره فاکتور: {number(order.id)}</p><p>تاریخ: <bdi>{order.created_at?.split(" ")[0]}</bdi></p></div></header>
            <section className={styles.party} aria-label="مشخصات فروشنده"><h2>فروشنده</h2><div className={styles.details}>
                <p><strong>فروشنده:</strong> تجهیزلند</p><p><strong>تلفن:</strong> <bdi>021-66477790-1</bdi></p>
                <p className={styles.full}><strong>نشانی:</strong> تهران، خیابان جمهوری، بین خیابان دانشگاه و ابوریحان، ضلع شمال خیابان جمهوری، پلاک ۹۸۱</p>
            </div></section>
            <section className={styles.party} aria-label="مشخصات خریدار"><h2>خریدار</h2><div className={styles.details}>
                <p><strong>خریدار:</strong> {[buyer?.name, buyer?.last_name].filter(Boolean).join(" ") || "—"}</p><p><strong>شماره ملی:</strong> {buyer?.national_code || "—"}</p><p><strong>شماره تماس:</strong> <bdi>{buyer?.mobile || buyer?.tell || "—"}</bdi></p>
                <p className={styles.address}><strong>نشانی:</strong> {[buyer?.province?.name, buyer?.city?.name, buyer?.address].filter(Boolean).join("، ") || "—"}</p><p><strong>کد پستی:</strong> <bdi>{buyer?.zip_code || "—"}</bdi></p>
            </div></section>
            <table className={styles.table}>
                <colgroup>{[4,30,6,5,11,12,10,10,12].map((width, i) => <col key={i} style={{width: `${width}%`}}/>)}</colgroup>
                <thead><tr>{["ردیف", "شرح کالا یا خدمت", "رنگ", "تعداد", "مبلغ واحد", "گارانتی", "هزینه گارانتی", "تخفیف", "مبلغ کل"].map(title => <th key={title} scope="col">{title}</th>)}</tr></thead>
                <tbody>{order.orderItems?.map((item, index) => <tr key={item.id}>
                    <td>{number(index + 1)}</td><td className={styles.product}>{item.product?.name || "—"}</td><td>{item.productColor?.color_name || "—"}</td><td>{number(item.count)}</td><td>{number(item.price)}</td><td>{item.guaranty?.name || "—"}</td><td>{number(item.guaranty_price)}</td><td>{number(item.discount)}</td><td>{number(item.final_price * item.count)}</td>
                </tr>)}</tbody>
                <tfoot><tr><th colSpan={2} scope="row">هزینه ارسال</th><td colSpan={7}>{money(order.delivery_price)}</td></tr><tr><th colSpan={2} scope="row">جمع کل</th><td colSpan={7}><strong>{money(order.total_price)}</strong></td></tr></tfoot>
            </table>
            <footer className={styles.footer}><div className={styles.orderDetails}>
                <p><strong>وضعیت:</strong> {OrderStatus[Number(order.status)] || "—"}</p><p><strong>روش ارسال:</strong> {order.delivery?.name || "—"}</p><p><strong>تاریخ ثبت:</strong> <bdi>{order.created_at}</bdi></p><p><strong>روش پرداخت:</strong> {order.payment?.name || "—"}</p><p><strong>تاریخ ارسال:</strong> <bdi>{order.delivery_date || "—"}</bdi></p><p><strong>استفاده از کیف پول:</strong> {money(order.use_wallet_price)}</p><p><strong>مبلغ پرداخت از درگاه:</strong> {money(order.final_price)}</p>
            </div><div className={styles.signature}><p>مهر و امضای فروشنده</p><Image src="/images/company-stamp.png" alt="مهر شرکت تجهیزلند" width={330} height={84} unoptimized priority/></div><div className={styles.signature}><p>مهر و امضای خریدار</p></div></footer>
            <p className={styles.unit}>تمام مبالغ جدول به تومان است.</p>
        </article></div>
    </div>;
}
