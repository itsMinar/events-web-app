import LogoutButton from '@/components/LogoutButton';
import UnderDevelopment from '@/components/UnderDevelopment';

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-medium">Welcome to Admin Panel</h2>
      <LogoutButton />

      <UnderDevelopment />
    </div>
  );
}
