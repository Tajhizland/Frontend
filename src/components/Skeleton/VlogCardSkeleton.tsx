export default function VlogCardSkeleton() {
    return (<>
        {Array.from({length: 20}).map((_, itemIndex) => (
            <div className="h-36 sm:h-48 bg-gray-200 animate-pulse  rounded-3xl" key={itemIndex}></div>
        ))}
    </>)
}
