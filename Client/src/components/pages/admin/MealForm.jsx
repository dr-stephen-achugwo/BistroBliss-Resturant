"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import "../../../app/globals.css"
import toast from 'react-hot-toast'
import { addMeal } from '@/services/mealsServices'
import CustomAlertDialog from '@/atoms/CustomAlertDialog'

const mealFormSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(100, "Name must be at most 100 characters."),

  description: z.string()
    .trim()
    .min(3, "Description must be at least 3 characters.")
    .max(500, "Description must be at most 500 characters."),

  price: z.number()
    .positive("Price must be a positive number.")
    .min(0.01, "Price must be at least 1 £E .")
    .max(5000, "Price must be at most 5000 £E ."),

  image: z.string()
    .trim()
    .url("Image must be a valid URL."),

  category: z.enum(["Breakfast", "Drinks", "Main Dishes", "Desserts"], {
    errorMap: () => ({ message: "Please select a category." }),
  })
});


const MealForm = ({id}) => {
  const [open, setOpen] = useState(false);
  const [mealData, setMealData] = useState({});


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(mealFormSchema)
  });


  const onConfirm = async () => {
    toast.promise(
      addMeal(mealData),
      {
        loading: "Adding meal...",
        success: "Meal added successfully!",
        error: (error) => {
          setError("root", { message: error.message });
          return "Something went wrong!\nPlease try again.";
        }
      }
    )
  }

  const onSubmit = (data) => {
    setOpen(true)
    setMealData(data)
  }

  return (
    <div id={id} className="px-4 py-4 sm:px-6 border-t border-gray-200">
        <h4 className="text-lg leading-6 font-medium text-gray-900">Add New Meal</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 grid grid-cols-1 gap-y-6 ">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500" htmlFor="name">Name</Label>
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="px-2 py-1 border rounded w-full"
            />
            <div className="h-1">
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500" htmlFor="description">Description</Label>
            <textarea
              type="text"
              placeholder="Description"
              {...register("description")}
              className="px-2 py-1 border rounded w-full"
            />
            <div className="h-1">
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500" htmlFor="price">Price</Label>
            <Input
              type="number"
              placeholder="Price"
              {...register("price" , { valueAsNumber: true })}
              className="px-2 py-1 border rounded w-full"
            />
            <div className="h-1">
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500" htmlFor="image">Image URL</Label>
            <Input
              type="text"
              placeholder="Image URL"
              {...register("image")}
              className="px-2 py-1 border rounded w-full"
            />
            <div className="h-1">
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm text-gray-500" htmlFor="category">Category</Label>
            <select
              className="px-2 py-1 border rounded w-full"
              {...register("category", { required: "Category is required." })}
              defaultValue={"Select a category"}
            >
              <option disabled value="Select a category" >Select a category</option> {/* Placeholder */}
              <option value="Breakfast">Breakfast</option>
              <option value="Drinks">Drinks</option>
              <option value="Main Dishes">Main Dishes</option>
              <option value="Desserts">Desserts</option>
            </select>
            <div className="h-1">
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Root Error */}
          <div className="flex justify-center items-center">
            {
              errors.root && (
                <p className="text-red-500 text-xs mt-1">{errors.root.message}</p>
              )
            }
          </div>

          {/* Add button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            title="Add New Meal"
            className="px-2 py-1 text-sm font-semibold rounded-full w-full text-white activeButtonStyle"
          >
            {isSubmitting ? "Adding..." : "Add Meal"}
          </Button>

        </form>

        <CustomAlertDialog 
        isOpen={open} 
        setIsOpen={setOpen} 
        onConfirm={onConfirm} 
        message="Are you sure you want to add this meal?" 
        title="Add New Meal" 
        confirmButtonTitle="Add" />

      </div>
  )
}

export default MealForm