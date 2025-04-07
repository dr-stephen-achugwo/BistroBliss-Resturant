'use client'
import * as React from 'react'
import { Users , CircleUser , LogOut } from 'lucide-react'
import { IoFastFoodOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import BottomBar from '@/components/pages/admin/BottomBar'
import { Playfair_Display } from 'next/font/google'
import toast, { Toaster } from 'react-hot-toast';
import { logout } from '@/services/userServices';
import { usePathname } from "next/navigation";
import "../../app/globals.css"
import Link from 'next/link';

const playFairDisplay_Font = Playfair_Display({
  subsets: ['latin'] ,
  style: 'italic',
  })

const menuItems = [
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: IoFastFoodOutline, label: 'Meals', href: '/admin/meals' },
  { icon: MdPendingActions, label: 'Pending Bookings', href: '/admin/pending' },
  { icon: CircleUser, label: 'Profile', href: '/admin/profile' },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const handleLogout = () => {
    toast.promise(
      logout(),
      {
        loading: 'Logging out...',
        success: 'Logged out successfully',
        error: 'An error occurred. Please try again.',
      }
    )
  }

  return (
    <SidebarProvider>
      <Toaster position='top-center' reverseOrder={false}/>

      <div className="flex min-h-screen w-full">

        <Sidebar className="hidden md:flex ">

          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-slate-600">
                    <span className={playFairDisplay_Font.className}>Options</span>
                  </span>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu className="mt-4">
              {
                menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild title={item.label} className={`h-12
                      ${pathname === item.href ?
                      'activeAdminSidebar hover:bg-primary/10 hover:text-primary-dark active:text-primary active:bg-primary/10' 
                      : ''}`}>
                      <Link href={item.href} 
                        className={`text-lg flex items-center font-semibold active:scale-95`}>
                        <item.icon className="h-10 w-10 mr-2" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-12">
                  <button 
                    title="Logout"
                    onClick={handleLogout}
                    className="text-lg flex items-center font-semibold active:scale-95">
                    <LogOut className="h-10 w-10 mr-2" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

        </Sidebar>

        <div className="flex-1 flex flex-col ">
          <header className="flex items-center gap-5 h-12 px-4 border-b top-0 z-50 sticky bg-[#F9F9F7]">
            <img src="/logo.svg" alt="Logo" className='w-40 h-36'/>
            <div className="text-xl font-bold italic text-[#474747]">
              <span className={playFairDisplay_Font.className}> Admin Dashboard </span>
            </div>
          </header>
          <main>
            {children}
          </main>
          <BottomBar />
        </div>
      </div>

    </SidebarProvider>
  )
}