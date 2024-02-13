import AddEventForm from '@/components/admin/AddEventForm';

export default function AddEventPage() {
  return (
    <div className="space-y-6 px-10">
      <div className="space-y-2">
        <h1 className="mt-2 text-center text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl">
          Add New Event
        </h1>
      </div>

      <AddEventForm />
    </div>
  );
}
