"use client"

import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ variant = 'primary', onClick, type = 'button', children }: Props) {
  const base = 'px-4 py-2 rounded font-montserrat text-sm transition-colors font-medium'
  const styles = {
    primary: 'bg-[#D4AF37] text-black hover:bg-[#C49F30] focus:outline-none',
    secondary: 'bg-black text-white hover:bg-[#333] focus:outline-none',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  )
}
