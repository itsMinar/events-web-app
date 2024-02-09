import LogoutButton from '@/components/LogoutButton';
import UnderDevelopment from '@/components/UnderDevelopment';

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-2xl font-medium">Welcome to Profile</h2>
      <LogoutButton />

      <UnderDevelopment />
    </div>
  );
}
