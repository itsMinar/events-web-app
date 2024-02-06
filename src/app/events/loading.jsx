import SkeletonCard from '@/components/event/SkeletonCard';

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-20 px-[20px] py-24">
      {Array.from({ length: 6 }).map((item, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
