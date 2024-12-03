export default function VlogCardSkeleton() {
    return (<>
        {Array.from({length: 20}).map((_, itemIndex) => (
            <div className="h-60 sm:h-80 bg-gray-200 animate-pulse  rounded-3xl" key={itemIndex}></div>
        ))}
    </>)
}
