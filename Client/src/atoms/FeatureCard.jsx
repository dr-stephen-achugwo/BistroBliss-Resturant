import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const FeatureCard = ({data}) => {
	return (
		<Card className='max-w-sm mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
			<CardContent className='flex items-center p-6 space-y-4 gap-6'>
				<img src={data.img} alt="" />
				<div className='flex flex-col'>
					<p className='text-xl font-semibold'>{data.title}</p>
					<p className='text-slate-600 text-sm'>{data.description}</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default FeatureCard