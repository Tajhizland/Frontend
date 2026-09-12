/**
 * قوانین مشترک نمایش رنگ‌های محصول.
 *
 * رنگی که غیرفعال است یا موجودی/قیمت ندارد نباید در انتخاب رنگ دیده شود؛
 * ولی اگر هیچ رنگ موجودی نماند، یک رنگ نگه داشته می‌شود تا صفحه‌ی محصول
 * بدون رنگ (و بدون قیمت/بج «ناموجود») رندر نشود.
 */

type SelectableColor = {
    status?: number;
    stock?: number;
    price?: number;
};

const DEACTIVE_STATUS = 0;

export function isColorAvailable(color: SelectableColor): boolean {
    return color.status !== DEACTIVE_STATUS && (color.stock ?? 0) > 0 && (color.price ?? 0) > 0;
}

export function getDisplayColors<T extends SelectableColor>(colors?: T[] | null): T[] {
    if (!colors?.length) {
        return [];
    }

    const availableColors = colors.filter(isColorAvailable);

    return availableColors.length ? availableColors : [colors[0]];
}
