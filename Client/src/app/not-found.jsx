import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

const notfound = () => {
	return (
		<div className="min-h-screen flex justify-center items-center bg-[#F9F9F7] px-4">
			<div className="flex flex-col justify-center items-center gap-5 text-primary-dark text-center">
				<p className="text-6xl sm:text-7xl md:text-9xl font-bold">404</p>
				<p className="text-2xl sm:text-3xl md:text-4xl font-bold">Page Not Found</p>
				<p className="text-sm sm:text-lg md:text-xl text-slate-500">
					Sorry, the page you're looking for cannot be found.
				</p>
				<Link href="/">
					<Button className="w-36 sm:w-40 md:w-44 h-12 sm:h-14 text-white text-sm sm:text-base flex justify-around items-center">
						<FaArrowLeft />
						Back to Home
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default notfound