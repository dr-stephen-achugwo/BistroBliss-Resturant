import React from 'react'
import { CalendarX } from 'lucide-react'

const EmptyPending = () => {
  return (
    <div className= "flex flex-col items-center justify-center text-center p-8 bg-muted/50 min-h-screen space-y-6 ">
      <div className="rounded-full bg-muted p-4">
        <CalendarX className="h-10 w-10 text-muted-foreground" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-medium">
          No Pending Bookings
        </h3>
        <p className="text-sm text-muted-foreground">
          There are currently no pending bookings.
        </p>
      </div>
    </div>
  )
}

export default EmptyPending