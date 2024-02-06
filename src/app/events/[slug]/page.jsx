import UnderDevelopment from '@/components/UnderDevelopment';

export default function EventsPage({ params }) {
  const { slug } = params;

  return (
    <div>
      EventsPage: {slug}
      <UnderDevelopment />
    </div>
  );
}
