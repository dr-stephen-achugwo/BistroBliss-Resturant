import SingleTestimonial from '@/atoms/SingleTestimonial';
import React from 'react'

const testimonialsData = [
	{
		title: "The best restaurant",
		description : "Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
		img : "1.svg",
		name : "Sophire Robson",
		address : "Los Angeles, CA"
	},
	{
		title: "Simply delicious",
		description : "Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
		img : "2.svg",
		name : "Matt Cannon",
		address : "San Diego, CA"
	},
	{
		title: "One of a kind restaurant",
		description : "The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
		img : "3.svg",
		name : "Andy Smith",
		address : "San Francisco, CA"
	},
]

const Testimonials = () => {
	return (
		<section className='flex flex-col items-center p-10 max-md:p-3'>
			<img src="/about/testimonials/title.svg" alt="" />
			<div className='container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 py-14'>
				{
					testimonialsData.map((data, index) => {
						return (
							<SingleTestimonial key={index} data={data} />
						)
					})
				}
			</div>
		</section>
	)
}

export default Testimonials