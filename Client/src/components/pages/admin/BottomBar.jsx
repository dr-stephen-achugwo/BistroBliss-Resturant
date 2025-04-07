import * as React from 'react'
import { Button } from "@/components/ui/button"
import { CircleUser, LogOut, Users } from 'lucide-react'
import { IoFastFoodOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { usePathname } from "next/navigation";
import "../../../app/globals.css"
import Link from 'next/link';
import { logout } from '@/services/userServices';
import toast from 'react-hot-toast';

const menuItems = [
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: IoFastFoodOutline, label: 'Meals', href: '/admin/meals' },
  { icon: MdPendingActions, label: 'Pending Bookings', href: '/admin/pending' },
  { icon: CircleUser, label: 'Profile', href: '/admin/profile' },
]

const  BottomBar = () => {
  const pathname = usePathname();
  
  const handleLogout = () => {
    toast.promise(
      logout(),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully',
        error: 'An error occurred.\nPlease try again.',
      }
    )
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#f4f4f4] md:hidden">
      <div className="flex justify-between">
        {/* Menu */}
        {menuItems.map((item) => (
          <div key={item.label} className = {`border-r border-r-gray-200 w-1/3`}>
            <Button
              variant="ghost"
              size="sm"
              title={item.label}
              className={`flex flex-col items-center gap-1 h-auto py-3 active:scale-95 rounded-none
              ${pathname === item.href ? "activeAdminBottombar hover:bg-primary/10 hover:text-primary-dark active:text-primary active:bg-primary/10" 
                : "hover:bg-gray-200 hover:text-gray-900 border-t"}`}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </Button>
          </div>
        ))}

        {/* Logout */}
        <div className='border-r w-1/3 '>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            title="Logout"
            className="flex flex-col items-center gap-1 h-auto py-3 active:scale-95 w-full
            hover:bg-gray-200 hover:text-gray-900 rounded-none "
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default BottomBar