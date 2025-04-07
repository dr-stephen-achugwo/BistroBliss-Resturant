"use client"
import MealCard from '@/atoms/MealCard'
import { getMeals, getMealsByCategory } from '@/services/mealsServices'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import EmptyMenu from './EmptyMenu'
import MealSkeleton from './MealSkeleton'


const MenuMeals = () => {
	const searchParams = useSearchParams();
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const category = searchParams.get("category");
			try {
				let data;
				if (!category) {
					data = await getMeals();
				} else {
					data = await getMealsByCategory(category);
				}
				setMeals(data || []);
			} 
			catch (error) {
				console.error("Error fetching meals:", error);
			} 
			finally {
				setIsLoading(false);
			}
		};

		fetchMeals();
	}, [searchParams.toString()]);



	return (
		<>
			{
				isLoading ?
					<div className='container mx-auto grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-8 m-10'>
						{
							[...Array(8)].map((_, index) => (
									<MealSkeleton key={index} />
							))
						}
					</div>
					:
					meals.length === 0 ?
						<EmptyMenu />
					:
					<div className='container mx-auto grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-8 m-10'>
					{
						meals.map((meal, index) => {
							return (
								<MealCard key={index} meal={meal} />
							)
						})
					}
				</div>
			}
		</>
	)
}

export default MenuMeals