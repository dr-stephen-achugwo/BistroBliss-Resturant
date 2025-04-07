"use client"
import React, { useEffect, useState } from 'react'
import SingleMeal from './SingleMeal'
import { getMeals } from '@/services/mealsServices'
import EmptyMeals from './EmptyMeals'
import { Skeleton } from '@/components/ui/skeleton'

const MealsList = () => {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);
      const data = await getMeals();
      if (data) {
        setMenuItems(data);
      }
      setIsLoading(false);
    }
    fetchMenuItems();
  }, [])

  return (
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {
          isLoading ?
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-5 p-10 max-lg:flex-col">
                <div className="flex flex-col gap-5 w-2/3 max-lg:order-2 max-lg:w-full">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-60 w-1/3 rounded-3xl max-lg:order-1 max-lg:w-full" />
              </div>
            ))
          :
          menuItems.length === 0 ?
            <EmptyMeals />
          :
          menuItems.map((item) => (
            <SingleMeal key={item._id} item={item}/>
          ))
        }
      </div> 
  )
}

export default MealsList