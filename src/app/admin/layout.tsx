// "use client"

import Sidebar from '@/components/Admin/Sidebar'
import TopNavbar from '@/components/Admin/TopNavbar'

export const metadata = {
  title: 'Admin Dashboard — Elara',
  description: 'Admin area for managing products and sales content',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#0B0B0B]">
      {/* Sidebar */}
      <Sidebar />
      {/* Main area */}
      <div className="flex-1 flex flex-col ml-[80px] md:ml-0 pl-10">
        {/* Top Navbar */}
        <TopNavbar />
        {/* Content */}
        <main className="pt-16 p-6 flex-1 overflow-y-auto bg-white dark:bg-[#0B0B0B]">
          {children}
        </main>
      </div>
    </div>
  )
}
