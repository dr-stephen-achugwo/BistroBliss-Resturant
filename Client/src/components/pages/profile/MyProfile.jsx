import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfo from "./PersonalInfo"
import MyBookings from "./MyBookings"
import { Playfair_Display } from 'next/font/google'

const playFairDisplay_Font = Playfair_Display({ subsets: ['latin'] })


export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-4 text-center">
        <span className = { playFairDisplay_Font.className }>My Profile</span>
      </h1>

      <Tabs defaultValue="personal-info" className="w-full">

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <PersonalInfo />
        </TabsContent>

        <TabsContent value="my-bookings">
          <MyBookings />
        </TabsContent>
				
      </Tabs>

    </div>
  )
}