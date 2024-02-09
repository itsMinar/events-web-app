import Link from 'next/link';
import { RxArrowLeft, RxArrowRight } from 'react-icons/rx';

const styles =
  'className="text-white flex items-center gap-x-2 px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm';

export default function PaginationControls({ previousPath, nextPath }) {
  return (
    <section className="flex w-full justify-between">
      {previousPath ? (
        <Link href={previousPath} className={styles}>
          <RxArrowLeft />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {nextPath && (
        <Link href={nextPath} className={styles}>
          Next
          <RxArrowRight />
        </Link>
      )}
    </section>
  );
}
