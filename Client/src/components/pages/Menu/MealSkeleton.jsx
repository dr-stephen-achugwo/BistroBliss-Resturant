import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const MealSkeleton = () => {
  return (
    <Card className="w-80 h-[450px] max-w-sm mx-auto rounded-3xl shadow-md
        hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center p-5 gap-3">
        <Skeleton className="h-52 w-full rounded-3xl" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  )
}

export default MealSkeleton