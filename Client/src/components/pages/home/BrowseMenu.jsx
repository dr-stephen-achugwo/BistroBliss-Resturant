import BrowseMenuCard from '@/atoms/BrowseMenuCard'
import React from 'react'

const cardsData = [
	{
		title: "Breakfast",
		img:"/breakfast.svg",
		description: "In the new era of technology we look in the future with certainty and pride for our life.",
		link : "/menu?category=Breakfast"
	},
	{
		title: "Main Dishes",
		img:"/maindishes.svg",
		description: "In the new era of technology we look in the future with certainty and pride for our life.",
		link : "/menu?category=Main+Dishes"
	},
	{
		title: "Drinks",
		img:"/drinks.svg",
		description: "In the new era of technology we look in the future with certainty and pride for our life.",
		link : "/menu?category=Drinks"
	},
	{
		title: "Desserts",
		img:"/desserts.svg",
		description: "In the new era of technology we look in the future with certainty and pride for our life.",
		link : "/menu?category=Desserts"
	},
]

const BrowseMenu = () => {
	return (
		<div className='container mx-auto px-4 py-28 flex flex-col items-center gap-10'>
			<img src="/home/BrowseMenu/Browse Our Menu.svg" alt="" />
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8'>
				{
					cardsData.map((data, index) => {
						return (
							<BrowseMenuCard key={index} data={data} />
						)
					})
				}
			</div>
		</div>
		
	)
}

export default BrowseMenu