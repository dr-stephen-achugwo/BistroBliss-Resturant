import FeatureCard from '@/atoms/FeatureCard'
import React from 'react'

const CardsData = [
	{
		title: "Multi Cuisine",
		img:"/about/features/menu.svg",
		description: "In the new era of technology we look in the future with certainty life.",
	},
	{
		title: "Easy To Order",
		img:"/about/features/order.svg",
		description: "In the new era of technology we look in the future with certainty life.",
	},
	{
		title: "Fast Delivery",
		img:"/about/features/time.svg",
		description: "In the new era of technology we look in the future with certainty life.",
	},
]

const Features = () => {
	return (
		<div className='container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 py-14'>
			{
				CardsData.map((data, index) => {
					return (
						<FeatureCard key={index} data={data} />
					)
				})
			}
		</div>
	)
}

export default Features