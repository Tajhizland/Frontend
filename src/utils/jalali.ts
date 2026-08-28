import moment from "jalali-moment";

/**
 * تاریخ‌های برگشتی از API یکدست نیستند: بعضی ریسورس‌ها تاریخ میلادی خام
 * (`2024-08-02T10:30:00.000000Z`) می‌دهند و بعضی رشته‌ی شمسی از قبل فرمت‌شده
 * (`1403/05/12 10:30:00`). این هلپر هر دو حالت را می‌گیرد و خروجی شمسی می‌دهد.
 */

const JALALI_LIKE = /^\s*1[34]\d{2}[/-]\d{1,2}[/-]\d{1,2}/;
const TIME_PART = /(\d{1,2}:\d{2})(:\d{2})?\s*$/;
const GREGORIAN_FORMATS = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "YYYY-MM-DD"];

const toEnglishDigits = (value: string) => value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

/** رشته‌ی شمسیِ از قبل فرمت‌شده را به `YYYY/MM/DD` و در صورت نیاز `HH:mm` نرمال می‌کند. */
const normalizeJalaliString = (value: string, withTime: boolean) => {
    const clean = toEnglishDigits(value).trim();
    const [datePart] = clean.split(/[\sT]/);
    const [year, month, day] = datePart.split(/[/-]/);
    const date = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
    if (!withTime) return date;
    const time = TIME_PART.exec(clean);
    return time ? `${date} ${time[1]}` : date;
};

/**
 * هر مقدار تاریخی را به رشته‌ی شمسی تبدیل می‌کند.
 * @param withTime ساعت را هم نشان بده (اگر در ورودی وجود داشته باشد)
 */
export const toJalali = (value: unknown, withTime = true): string => {
    if (value == null || value === "") return "";
    if (value instanceof Date) return moment(value).locale("fa").format(withTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD");

    const raw = toEnglishDigits(String(value)).trim();
    if (!raw || raw === "0000-00-00" || raw.startsWith("0000-00-00")) return "";

    if (JALALI_LIKE.test(raw)) return normalizeJalaliString(raw, withTime);

    const parsed = GREGORIAN_FORMATS.map((format) => moment(raw, format, true)).find((m) => m?.isValid?.());
    const fallback = parsed ?? moment(new Date(raw));
    if (!fallback?.isValid?.()) return String(value);

    const hasTime = /\d{1,2}:\d{2}/.test(raw);
    return fallback.locale("fa").format(withTime && hasTime ? "YYYY/MM/DD HH:mm" : "YYYY/MM/DD");
};

/** فقط بخش تاریخ، بدون ساعت. */
export const toJalaliDate = (value: unknown) => toJalali(value, false);

/** تاریخ شمسی `YYYY/MM/DD` را به میلادی `YYYY-MM-DD` برمی‌گرداند (برای ارسال به API). */
export const jalaliToGregorian = (value: string) => {
    if (!value) return "";
    const clean = toEnglishDigits(value).trim();
    const parsed = moment.from(clean.split(/[\sT]/)[0], "fa", "YYYY/MM/DD");
    return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};
