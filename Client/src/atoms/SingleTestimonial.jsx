import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const SingleTestimonial = ({data}) => {
	return (
		<Card className="w-full max-w-sm mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#F9F9F7]">
			<CardContent className="flex flex-col items-start p-8 space-y-4 gap-3">
				<p className="text-xl font-bold text-primary">“{data.title}”</p>
				<p>{data.description}</p>
				<div className='w-full h-[1px] bg-slate-300'></div>
				<div className="flex items-center gap-3">
					<img src={`/about/testimonials/${data.img}`} alt="" />
					<div className="flex flex-col">
						<p className="text-lg font-bold">{data.name}</p>
						<p className="text-slate-600">{data.address}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default SingleTestimonial