export function generateMetadata() {
  return {
    title: 'Profile',
  };
}

export default function ProfilePage() {
  return (
    <div className="mt-20">
      <h1 className="text-center text-4xl font-bold text-gray-700 md:text-5xl lg:text-6xl">
        Welcome to Profile Page
      </h1>
    </div>
  );
}
