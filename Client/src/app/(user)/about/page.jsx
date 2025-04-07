import AboutHeader from '@/components/pages/about us/AboutHeader'
import Details from '@/components/pages/about us/Details'
import Features from '@/components/pages/about us/Features'
import Testimonials from '@/components/pages/about us/Testimonials'
import React from 'react'

export const metadata = {
  title:"About us",
}
const page = () => {
  return (
    <div>
			<AboutHeader />
      <Features />
      <Details />
      <Testimonials />
		</div>
  )
}

export default page