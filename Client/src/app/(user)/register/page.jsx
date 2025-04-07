import RegisterForm from '@/components/pages/register/RegisterForm'
import React from 'react'

export const metadata = {
	title:'Register',
	description:'Register to Bistro Bliss restaurant',
}

const page = () => {
	return (
		<main>
			<RegisterForm />
		</main>
	)
}

export default page