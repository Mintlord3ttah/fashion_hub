import AdminLayoutClient from '@/components/Admin/AdminLayoutClient';

export const metadata = {
  title: 'Admin Dashboard — Elara',
  description: 'Admin area for managing products and sales content',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
