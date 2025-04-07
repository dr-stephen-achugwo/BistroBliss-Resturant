"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { deleteMeal, updateMeal } from '@/services/mealsServices'
import CustomAlertDialog from '@/atoms/CustomAlertDialog'
import "../../../app/globals.css"

const SingleMealSchema = z.object({
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

const SingleMeal = ( { item } ) => {
  const [open, setOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [confirmButtonTitle, setConfirmButtonTitle] = useState("");
  const [option , setOption] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(SingleMealSchema),
    defaultValues: item
  });

  const onUpdate = async () => {
    toast.promise(
      updateMeal(item._id, updatedData),
      {
        loading: "Updating meal...",
        success: "Meal updated successfully!",
        error: (error) => {
          setError("root", { message: error.message });
          return "Something went wrong!\nPlease try again.";
        }
      }
    )
  }

  const onDelete = async () => {
    toast.promise(
      deleteMeal(item._id),
      {
        loading: "Deleting meal...",
        success: "Meal deleted successfully!",
        error: (error) => {
          setError("root", { message: error.message });
          return "Something went wrong!\nPlease try again.";
        }
      }
    )
  }

  const handleUpdateButton = (data) => {
    setUpdatedData(data)
    setTitle("Update Meal")
    setMessage("Are you sure you want to update this meal?")
    setConfirmButtonTitle("Update")
    setOption("update")
    setOpen(true)
  }

  const handleDeleteButton = () => {
    setTitle("Delete Meal")
    setMessage("Are you sure you want to delete this meal?")
    setConfirmButtonTitle("Delete")
    setOption("delete")
    setOpen(true)
  }

  return (
      <form 
        onSubmit={handleSubmit(handleUpdateButton)} 
        className='flex flex-col px-4 py-4 sm:px-6 space-y-5'>

        <div className="flex items-center justify-between max-h-fit max-lg:flex-col w-full">

          <div className="flex flex-col w-1/2 gap-2 p-3 max-lg:order-2 max-lg:w-full space-y-5">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-500 mr-2">Name:</Label>
              <Input
                type="text"
                placeholder='Name'
                {...register("name")}
                className="text-sm font-medium text-primary mb-1 w-full border border-gray-200 rounded p-1"
              />
              <div className='h-1'>
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-500 mr-2">Description:</Label>
              <textarea
                type="text"
                placeholder="Description"
                {...register("description")}
                className="text-sm  text-gray-500 mb-1 w-full border border-gray-200 rounded p-1"
              />
              <div className='h-1'>
                {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-500 mr-2">Price:</Label>
              <Input
                type="number"
                placeholder="Price"
                {...register("price" , { valueAsNumber: true })}
                className="text-sm text-gray-500 mb-1 w-full border border-gray-200 rounded p-1"
              />
              <div className='h-1'>
                {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
              </div>
            </div>

            {/* Image */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-500" htmlFor="image">Image URL</Label>
              <Input
                type="text"
                placeholder="Image URL"
                {...register("image")}
                className="text-sm  text-gray-500 mb-1 w-full border border-gray-200 rounded p-1"
                />
              <div className='h-1'>
                {errors.image && <span className="text-xs text-red-500">{errors.image.message}</span>}
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

          </div> 

          <div className="flex ml-4 w-1/2 justify-center items-center max-lg:order-1 max-lg:w-full">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="object-contain rounded w-2/3 h-2/3"
            />
          </div>

        </div>

        <div className="flex gap-3 px-5 max-lg:justify-center max-lg:items-center">
          <Button className="mt-2 px-5 py-2 text-xs font-semibold rounded-lg 
            text-primary bg-[#F9F9F7] hover:text-primary-dark activeButtonStyle" 
            type="submit"
            title="Update this Meal"
            disabled={isSubmitting}
            variant="outline">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
          <Button className="mt-2 px-5 py-2 text-xs font-semibold rounded-lg activeButtonStyle"
            onClick = {handleDeleteButton}
            type="button"
            title="Delete this Meal"
            variant="destructive">
            Delete
          </Button>
        </div>
        
        <CustomAlertDialog 
          isOpen={open} 
          setIsOpen={setOpen} 
          onConfirm={()=>{
            if(option == "delete") {
              onDelete()
            }
            else if (option == "update") {
              onUpdate()
            }
          }} 
          message={message}
          title={title}
          confirmButtonTitle={confirmButtonTitle} 
        />

      </form>
  )
}

export default SingleMeal