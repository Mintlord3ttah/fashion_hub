import { redirect } from 'next/navigation'

export default function AdminHome() {
  // Server‑side redirect to the new dashboard home
  redirect('/admin/dashboard')
}