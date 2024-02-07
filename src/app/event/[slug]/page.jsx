import { events } from '@/data';
import Image from 'next/image';
import GetTicket from './GetTicket';

export default function EventPage({ params }) {
  const { slug } = params;
  const event = events.filter((item) => item.slug === slug)[0];

  return (
    <main>
      <section className="relative flex items-center justify-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="z-0 object-cover blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        <div className="z-1 relative flex flex-col gap-6 lg:flex-row lg:gap-16">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <h1 className=" mb-2 mt-1 whitespace-nowrap text-3xl font-bold tracking-tight lg:text-5xl">
              {event.name}
            </h1>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <GetTicket />
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] px-5 py-16 text-center">
        <section className="mb-12">
          <h2 className="mb-8 text-2xl">About this event</h2>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/75">
            {event.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 text-2xl">Location</h2>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/75">
            {event.location}
          </p>
        </section>
      </div>
    </main>
  );
}
