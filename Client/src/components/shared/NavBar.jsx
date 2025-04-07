'use client'

import React, { useEffect, useState } from 'react'
import { Phone, Mail, Menu, X, ChevronDown, UserCircle, LogOut } from 'lucide-react'
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUsername, isTokenValid } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import CustomAlertDialog from '@/atoms/CustomAlertDialog'
import toast , { Toaster } from 'react-hot-toast';
import '../../app/globals.css'
import { logout } from '@/services/userServices'


export default function Navbar({ pathname }) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [ userToken , setUserToken ] = useState(null);
  const [dropDownTitle, setDropDownTitle] = useState('Login / Register');
  const [ isOpenDialog , setIsOpenDialog ] = useState(false);

  useEffect(() => {
    const userToken = Cookies.get('token');
    setUserToken(userToken);
    
    if (userToken) {
      const isValid = isTokenValid();
      if (!isValid) {
        Cookies.remove('token');
        setUserToken(null);
        setDropDownTitle('Login / Register');
      } else {
        const username = getUsername();
        setDropDownTitle(username);
      }
    }
  }, []);
  
  const handleBookButton = () => {
    if(userToken){
      router.push('/book')
    }
    else{
      setIsOpenDialog(true);
    }
  }


const handleLogout = () =>{
    toast.promise(
    logout(),
    {
      loading: 'Logging out...',
      success: 'Logged out successfully',
      error: 'An error occurred. Please try again.',
    }
  )
}


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top bar - not sticky */}
      <div className="bg-[#474747] text-white py-2 px-4">
        <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
            <span className="flex items-center">
              <Phone size={16} className="mr-2" /> 
              <span>(414) 857 - 0107</span>
            </span>
            <span className="flex items-center">
              <Mail size={16} className="mr-2" /> 
              <span>yummy@bistrobliss</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button className='text-white rounded-full bg-[#383838] p-2'> <FaFacebookF size={14} className="cursor-pointer hover:text-gray-300" /></button>
            <button className='text-white rounded-full bg-[#383838] p-2'> <FaTwitter size={14} className="cursor-pointer hover:text-gray-300" /></button>
            <button className='text-white rounded-full bg-[#383838] p-2'> <FaInstagram size={14} className="cursor-pointer hover:text-gray-300" /></button>
            <button className='text-white rounded-full bg-[#383838] p-2'> <FaGithub size={14} className="cursor-pointer hover:text-gray-300" /></button>
          </div>
        </div>
      </div>

      {/* Main navbar - sticky */}
      <div className='bg-white shadow-md sticky -top-1 z-50'>
        <div className="py-4 px-6 flex justify-between items-center container mx-auto">
          <Link href="/" className="flex items-center">
            <img src="/Logo.svg" alt="Bistro Bliss Logo" className="h-14 w-52 mr-2 max-md:h-12 max-md:w-36" />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-5">
            <Link href="/" className={`text-gray-600 px-3 py-1
            ${ pathname === '/' ? 'activeUserNavDesktop' : 'hover:text-gray-800'} `}>Home</Link>
            <Link href="/about" className={`text-gray-600 px-3 py-1
            ${ pathname === '/about' ? 'activeUserNavDesktop ' : 'hover:text-gray-800'} `}>About us</Link>
            <Link href="/menu" className={`text-gray-600 px-3 py-1
            ${ pathname === '/menu' ? 'activeUserNavDesktop' : 'hover:text-gray-800'} `}>Menu</Link>
            <Link href="/contact" className={`text-gray-600 px-3 py-1
            ${ pathname === '/contact' ? 'activeUserNavDesktop ' : 'hover:text-gray-800'} `}>Contact us</Link>
            <button
                onClick={handleBookButton}
                className = {`bg-gray-200 text-gray-800 px-4 py-2 rounded-full 
                  ${
                    pathname === '/book' ? 'activeBookButtonNav' : 'hover:bg-gray-300'
                  }
                active:bg-gray-400 active:scale-95 transition duration-300`}
              >
                Book A Table
            </button>

            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <span className="text-gray-600">Login / Register</span> :
                    <span className="text-gray-600 flex items-center gap-2">
                      {dropDownTitle}
                    </span>
                  }
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className = "border-b rounded-none border-gray-200">
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <Link href="/login" className="w-full flex justify-center items-center
                    font-semibold text-gray-600">Login</Link> :
                    <Link href="/profile" className="w-full flex justify-center items-center gap-2
                    font-semibold text-gray-600">
                      <UserCircle className="h-5 w-5" />
                      Profile
                    </Link>
                  }
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <Link href="/register" className="w-full flex justify-center items-center
                    font-semibold text-gray-600">Register</Link> :
                    <button onClick={handleLogout}
                      className="w-full flex justify-center items-center gap-2
                      font-semibold text-gray-600">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-1">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <span className="text-gray-600">Login / Register</span> :
                    <span className="text-gray-600 flex items-center gap-2">
                      {dropDownTitle}
                    </span>
                  }
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className = "border-b rounded-none border-gray-200">
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <Link href="/login" className="w-full flex justify-center items-center
                    font-semibold text-gray-600">Login</Link> :
                    <Link href="/profile" className="w-full flex justify-center items-center gap-2
                    font-semibold text-gray-600">
                      <UserCircle className="h-5 w-5" />
                      Profile
                    </Link>
                  }
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {
                    dropDownTitle === 'Login / Register' ? 
                    <Link href="/register" className="w-full flex justify-center items-center
                    font-semibold text-gray-600">Register</Link> :
                    <button onClick={handleLogout}
                      className="w-full flex justify-center items-center gap-2
                      font-semibold text-gray-600">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        <div 
          className={`lg:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link href="/" className={`text-gray-600
            ${ pathname === '/' ? 'activeUserNavPhone ' : 'hover:text-gray-800'} `}>Home</Link>
            <Link href="/about" className={`text-gray-600
            ${ pathname === '/about' ? 'activeUserNavPhone ' : 'hover:text-gray-800'} `}>About us</Link>
            <Link href="/menu" className={`text-gray-600
            ${ pathname === '/menu' ? 'activeUserNavPhone ' : 'hover:text-gray-800'} `}>Menu</Link>
            <Link href="/contact" className={`text-gray-600
            ${ pathname === '/contact' ? 'activeUserNavPhone ' : 'hover:text-gray-800'} `}>Contact us</Link>
            <button
                onClick={handleBookButton}
                className = {`bg-gray-200 text-gray-800 px-4 py-2 rounded-full 
                  ${
                    pathname === '/book' ? 'activeBookButtonNav' : 'hover:bg-gray-300'
                  }
                active:bg-gray-400 active:scale-95 transition duration-300`}
              >
                Book A Table
            </button>
          </div>
        </div>

      </div>
      
      <CustomAlertDialog 
        message="You need to be logged in to book a table. Please sign in first."
        title="Login Required"
        confirmButtonTitle="Login"
        setIsOpen={setIsOpenDialog} 
        isOpen={isOpenDialog}
        onConfirm={() => {
          router.push("/login")
        }
      }/>
    </>
  )
}