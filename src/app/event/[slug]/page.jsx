import { getOneEvent } from '@/lib/fetchData';
import Image from 'next/image';
import GetTicket from './GetTicket';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const event = await getOneEvent(slug);

  return {
    title: event.data.name,
  };
}

export default async function EventPage({ params }) {
  const slug = params.slug;
  const event = await getOneEvent(slug);

  return (
    <main>
      <section className="relative flex items-center justify-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.data.imageUrl}
          className="z-0 object-cover blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        <div className="z-1 relative flex flex-col gap-6 lg:flex-row lg:gap-16">
          <Image
            src={event.data.imageUrl}
            alt={event.data.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.data.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <h1 className=" mb-2 mt-1 whitespace-nowrap text-3xl font-bold tracking-tight lg:text-5xl">
              {event.data.name}
            </h1>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by{' '}
              <span className="italic">{event.data.organizerName}</span>
            </p>

            <GetTicket
              slug={slug}
              availableTickets={event.data.availableTickets}
            />
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] px-5 py-16 text-center">
        <section className="mb-12">
          <h2 className="mb-8 text-2xl">About this event</h2>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/75">
            {event.data.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 text-2xl">Location</h2>
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/75">
            {event.data.location}
          </p>
        </section>
      </div>
    </main>
  );
}
