'use client'
import React from 'react'
import { Oval } from 'react-loader-spinner'

const loading = () => {
	return (
		<div className='flex justify-center items-center h-[100vh]'>
			<Oval
				height={60}
				width={60}
				color="#AD343E"
				secondaryColor='#f43f5e'
				ariaLabel="loading"
				visible={true}
				strokeWidth={5}
				strokeWidthSecondary={5}
			/>
		</div>
	)
}

export default loading