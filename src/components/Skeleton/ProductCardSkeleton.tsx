export default function ProductCardSkeleton() {
    return (<>
        {Array.from({length: 20}).map((_, itemIndex) => (
            <div className="h-64 bg-gray-200 animate-pulse  rounded-3xl" key={itemIndex}></div>
        ))}
    </>)
}
