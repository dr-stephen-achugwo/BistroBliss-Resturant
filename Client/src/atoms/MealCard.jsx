import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MealCard = ({ meal }) => {
  const isLongDescription = meal.description.length > 75;

  return (
    <Card className='w-80 mx-auto rounded-3xl shadow-md hover:shadow-lg 
      transition-shadow duration-300 bg-[#F9F9F7] overflow-hidden'>
      <CardContent className='flex flex-col items-center gap-4 h-[450px] p-0'>
        <img src={meal.image} alt="" className='h-1/2 w-full'/>
        <section className='flex items-center flex-col h-1/2 gap-5'>
          <CardTitle className="text-primary">{meal.price} E£</CardTitle>
          <CardTitle>{meal.name}</CardTitle>
          <CardTitle className='text-primary-dark text-base'>{meal.category}</CardTitle>
          <div className="w-full">
            <CardDescription className="text-center line-clamp-2 px-3">
              {meal.description.slice(0, 75)}{isLongDescription && "..."}
            </CardDescription>
            {
							isLongDescription && (
								<Dialog >
									<DialogTrigger asChild>
										<Button variant="link" size="sm" className="mt-1 h-auto p-0 mx-auto block">
											Read full description
										</Button>
									</DialogTrigger>
									<DialogContent className="bg-[#F9F9F7]">
										<DialogHeader>
											<DialogTitle>{meal.name}</DialogTitle>
											<DialogDescription className="pt-4">{meal.description}</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

export default MealCard;