import BookingForm from '@/components/pages/book/BookingForm'
import React from 'react'

export const metadata = {
	title:'Book a table',
	description:'Book a table at Bistro Bliss restaurant',
}

const page = () => {
	return (
		<div>
			<BookingForm />
		</div>
	)
}

export default page