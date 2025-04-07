"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { isTokenValid } from '@/lib/auth';
import CustomAlertDialog from '@/atoms/CustomAlertDialog';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import "@/app/globals.css"

const Header = () => {
	const router = useRouter();
	const [userToken , setUserToken ] = useState(null);
	const [ isOpenDialog , setIsOpenDialog ] = useState(false);

	useEffect(() => {
		const userToken = Cookies.get('token');
		setUserToken(userToken);
		if (userToken) {
			const isValid = isTokenValid();
			if (!isValid) {
				Cookies.remove('token');
				setUserToken(null);
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

	return (
		<div className="h-svh flex justify-center items-center bg-[url('/home/header/header.svg')] bg-cover bg-no-repeat px-4">
			<div className="flex flex-col justify-center items-center gap-5 text-center">
				<img src="/home/header/text.svg" alt="Header Text" className=''/>
				<div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center w-full sm:w-2/3 gap-4 sm:gap-6">
					<Button onClick={handleBookButton} 
						className="rounded-full w-44 sm:w-40 h-14 text-white text-base hover:bg-primary-dark activeButtonStyle">
						Book A Table
					</Button>
					<Button variant="outline" 
						className="rounded-full w-44 sm:w-40 h-14 text-base activeButtonStyle"
						onClick={() => router.push('/menu')}
						>
						Explore Menu
					</Button>
				</div>
			</div>

			<CustomAlertDialog
				isOpen={isOpenDialog}
				setIsOpen={setIsOpenDialog}
				onConfirm={
					() => {
						router.push('/login');
					}
				}
				message="You need to be logged in to book a table. Please sign in first."
        title="Login Required"
        confirmButtonTitle="Login"
			/>
		</div>
	)
}

export default Header