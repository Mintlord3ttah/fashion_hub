"use client";

import Sidebar from '@/components/Admin/Sidebar';
import TopNavbar from '@/components/Admin/TopNavbar';
import { useState } from 'react';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [collapsed, setSidebarCollapsed] = useState(false);

  const onToggle = () => setSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#0B0B0B]">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={onToggle} />
      {/* Main area */}
      <div className="flex-1 flex flex-col ml-[80px] md:ml-0 pl-10">
        {/* Top Navbar */}
        <TopNavbar />
        {/* Content */}
        <main
          className="pt-16 p-6 flex-1 overflow-y-auto bg-white dark:bg-[#0B0B0B]"
          onClick={() => setSidebarCollapsed(true)}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
