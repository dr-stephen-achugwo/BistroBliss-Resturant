import React from 'react'

const AboutHeader = () => {
  return (
		<div className='bg-[#F9F9F7]'>
			<div className='container mx-auto flex min-h-screen justify-between items-center py-10
			max-xl:flex-col max-xl:gap-10'>
				<img src="/about/Header/Img.svg" alt="" className='max-xl:order-2'/>
				<img src="/about/Header/text.svg" alt="" className='max-xl:order-1'/>
			</div>
		</div>
  )
}

export default AboutHeader