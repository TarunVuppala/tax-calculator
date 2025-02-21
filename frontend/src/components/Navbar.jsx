'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils' // Usually from shadcn's init

export default function Navbar() {
  return (
    <nav className="bg-purple-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-90">
          Tax Calculator
        </Link>

        <div className="space-x-4">
          <Link
            href="/records"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-white text-black hover:bg-purple-50 hover:text-purple-600'
            )}
          >
            All Records
          </Link>
          <Link
            href="/records/create"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-white text-purple-600 hover:bg-purple-50'
            )}
          >
            Create Record
          </Link>
        </div>
      </div>
    </nav>
  )
}
