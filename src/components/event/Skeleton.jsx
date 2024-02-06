import { cn } from '@/lib/utils';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'h-4 w-[550px] animate-pulse rounded-md bg-white/5',
        className
      )}
    />
  );
}
