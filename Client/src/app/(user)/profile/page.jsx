import ProfilePage from '@/components/pages/profile/MyProfile'
import React from 'react'

export const metadata = {
  title:"Profile",
}
const page = () => {
  return (
    <div className='min-h-screen bg-[#F9F9F7]'>
			<ProfilePage />
		</div>
  )
}

export default page