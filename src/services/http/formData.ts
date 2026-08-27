/**
 * یک DTO را به FormData تبدیل می‌کند.
 *
 * - undefined و null نادیده گرفته می‌شوند (فیلد اصلاً فرستاده نمی‌شود)
 * - boolean به "1"/"0" تبدیل می‌شود چون PHP رشته می‌گیرد
 * - آرایه و آبجکت به شکل foo[0][bar] فرستاده می‌شوند تا لاراول درست پارس کند
 * - File و Blob دست‌نخورده می‌روند
 */
export const toFormData = (dto: object, method?: "PUT" | "PATCH" | "DELETE"): FormData => {
    const form = new FormData();
    if (method) form.append("_method", method);
    Object.entries(dto as Record<string, unknown>).forEach(([key, value]) => append(form, key, value));
    return form;
};

const append = (form: FormData, key: string, value: unknown): void => {
    if (value === undefined || value === null) return;

    if (value instanceof File || value instanceof Blob) {
        form.append(key, value);
        return;
    }
    if (typeof value === "boolean") {
        form.append(key, value ? "1" : "0");
        return;
    }
    if (Array.isArray(value)) {
        value.forEach((item, index) => append(form, `${key}[${index}]`, item));
        return;
    }
    if (typeof value === "object") {
        Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) =>
            append(form, `${key}[${childKey}]`, childValue)
        );
        return;
    }
    form.append(key, String(value));
};
