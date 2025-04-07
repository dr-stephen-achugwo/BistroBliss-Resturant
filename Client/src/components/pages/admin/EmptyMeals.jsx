import { Button } from '@/components/ui/button'
import { UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmptyMeals = () => {
  return (
    <div className= "flex flex-col items-center justify-center text-center p-8 bg-muted/50 min-h-screen space-y-6 ">
      <div className="rounded-full bg-muted p-4">
        <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-medium">
          No Meals Found
        </h3>
        <p className="text-sm text-muted-foreground">
          There are currently no meals available in this menu.
        </p>
      </div>

      <Button variant="outline">
        <Link href={"#AddMeal"}>
          Add Meals
        </Link>
      </Button>
    </div>
  )
}

export default EmptyMeals