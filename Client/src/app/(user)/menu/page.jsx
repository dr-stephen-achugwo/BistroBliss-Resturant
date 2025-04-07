import MenuFilter from '@/components/pages/Menu/MenuFilter'
import MenuHeader from '@/components/pages/Menu/MenuHeader'
import MenuMeals from '@/components/pages/Menu/MenuMeals'
import React from 'react'

export const metadata = {
	title:"Menu",
}

const page = () => {
	return (
		<main className='flex flex-col items-center'>
			<MenuHeader />
			<MenuFilter />
			<MenuMeals />
		</main>
	)
}

export default page