"use client"
import BookingItem from "@/atoms/BookingItem"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserBookings } from "@/services/bookingServices"
import { format, parse } from "date-fns"
import { Playfair_Display } from 'next/font/google'
import { useEffect, useState } from "react"
import EmptyBooking from "./EmptyBooking"
import { Skeleton } from "@/components/ui/skeleton"

const playFairDisplay_Font = Playfair_Display({ subsets: ['latin'] })

const MyBookings = () => {
  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBookings = async () => {
      setLoading(true);
      const data = await getUserBookings();
      if (data) {
        setBooking(data);
      }
      setLoading(false);
    }
    getBookings();
  },[])

  return (
    <Card>
      <CardHeader>
        <CardTitle  className={ playFairDisplay_Font.className } >
          <span className="font-semibold tracking-wide" >My Bookings</span>
        </CardTitle>
        <CardDescription>View and manage your current bookings.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {
          loading ?
          <div className="space-y-4">
            {
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))
            }
          </div>
          :
          booking.length === 0 ?
            <EmptyBooking />
          :
            <div className="space-y-4">
              {
                booking.map((booking) => (
                  <BookingItem 
                    key={booking._id}
                    name={booking.name} 
                    date={format(new Date(booking.date), "PPP")} 
                    time={format(parse(booking.time, "HH:mm", new Date()), "hh:mm a")}
                    totalPerson={booking.totalPerson}
                    phone={booking.phone}
                    status={booking.status} />
                ))
              }
            </div>
        }
      </CardContent>
    </Card>
  )
}

export default MyBookings