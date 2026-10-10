export default function Loading() {
    return (
        <div role="status" aria-label="در حال دریافت پست" className="mx-auto mt-6 mb-12 max-w-[640px] animate-pulse sm:px-5 lg:mt-20">
            <span className="sr-only">در حال دریافت پست…</span>
            <div className="flex flex-col">
                <div className="space-y-4 p-5">
                    <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800"/>
                    <div className="h-3 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800"/>
                    <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800"/>
                </div>
                <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-800"/>
            </div>
        </div>
    );
}
