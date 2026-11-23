/** A new search selects all results; refreshing after an action preserves the exact subset. */
export function productSelection(
    products: {id: number}[],
    previous: Record<number, boolean>,
    preserveSelection: boolean,
): Record<number, boolean> {
    return Object.fromEntries(products.map(({id}) => [id, preserveSelection ? !!previous[id] : true]));
}
