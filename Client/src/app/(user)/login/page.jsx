import LoginForm from '@/components/pages/login/LoginForm'
import React from 'react'

export const metadata = {
	title:'Login',
	description:'Login to Bistro Bliss restaurant',
}

const page = () => {
	return (
		<main>
			<LoginForm />
		</main>
	)
}

export default page