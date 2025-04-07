"use client"

import { useState } from 'react'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { format } from "date-fns"
import { IMaskInput } from "react-imask";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { createBooking } from '@/services/bookingServices';
import "../../../app/globals.css"
import CustomAlertDialog from '@/atoms/CustomAlertDialog';

const bookingFormSchema = z.object({
  date: z
    .date()
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },{
        message: "Please select a valid date.",
      }
    ),

  time: z
    .string()
    .min(1, "Please select a time.")
    .refine(
      (time) => {
        const open = new Date();
        const close = new Date();
        open.setHours(9, 0, 0, 0);
        close.setHours(21, 0, 0, 0);
        const selectedTime = new Date();
        selectedTime.setHours(time.split(":")[0], time.split(":")[1], 0, 0);
        return selectedTime >= open && selectedTime <= close;
      }, {
        message: "Select a time between 9:00 AM and 9:00 PM.",
      }
    ),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters."),

  phone: z
    .string(),

  totalPerson: z
    .string()
});


export default function BookingForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
  });

  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  const onConfirm = () => {
    toast.promise(
      createBooking(bookingData),
      {
        loading: "Booking a table...",
        success: "Table booked successfully!",
        error: (error) => {
          setError("root", { message: error.message });
          return "Something went wrong!\n Please try again.";
        },
      }
    )
  }

  const onSubmit = (data) => {
    setBookingData({ ...data, date });
    setOpen(true)
  }

  return (
    <div className='bg-[#F9F9F7] min-h-screen flex flex-col justify-around items-center p-6'>
      <Toaster position='top-center' reverseOrder={false} />
      <img src="book/title.svg" alt="" className='p-5'/>
      <div className="w-full max-w-2xl mx-auto p-10 m-10 bg-white rounded-xl shadow-lg">
        <form  className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild >
                  <button
                    id="date"
                    className={`w-full px-4 py-2 text-left border relative border-gray-300 rounded-full 
                      ${date ? "text-gray-900" : "text-gray-500"}
                    `}
                  >
                    {date ? format(date, "PPP") : "Select a date"}
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  className="rounded-md border"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setValue("date", selectedDate);
                  }}
                />
                </PopoverContent>
              </Popover>
              <div className="h-5">{
                errors.date 
                && 
                <span className="text-red-500 text-xs ml-1">
                  {errors.date.message}
                </span>
              }</div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="relative">
                <Input
                  type="time"
                  id="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full"
                  {...register("time")}
                />
                <div className="h-5">{
                  errors.time 
                  && 
                  <span className="text-red-500 text-xs ml-1">
                    {errors.time.message}
              </span>
            }</div>
              </div>
            </div>
          </div>

          {/* Name and Phone*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="h-5">{
                errors.name 
                && 
                <span className="text-red-500 text-xs ml-1">
                  {errors.name.message}
              </span>
            }</div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="relative">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="00000000000"
                      id="phone"
                      placeholder="01234567890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-full"
                      onAccept={(value) => field.onChange(value.replace(/\s/g, ""))} 
                      />
                  )}
                />
              </div>
              <div className="h-4">{
                errors.phone 
                && 
                <span className="text-red-500 text-xs ml-3">
                  {errors.phone.message}
              </span>
            }</div>
            </div>

          </div>

          {/* Total Person */}
          <div className="space-y-2 my-5">
            <label htmlFor="totalPerson" className="block text-sm font-medium text-gray-700">
              Total Person
            </label>
            <div className="relative">
              <select
                id="totalPerson"
                {...register("totalPerson")}
                className="w-full px-4 py-2 border border-gray-300 rounded-full appearance-none"
              >
                <option value={"1"}>1 Person</option>
                <option value={"2"}>2 People</option>
                <option value={"3"}>3 People</option>
                <option value={"4"}>4 People</option>
                <option value={"+5"}>+5 People</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="h-1">{
              errors.totalPerson 
              && 
              <span className="text-red-500 text-xs ml-1">
                {errors.totalPerson.message}
              </span>
            }</div>
          </div>

          {/* Roor Error */}
          <div className="h-1">{
            errors.root 
            && 
            <span className="text-red-500 text-xs ml-1">
              {errors.root.message}
            </span>
          }</div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full px-4 py-3 font-semibold rounded-full text-white activeButtonStyle "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book A Table"}
          </Button>

        </form>
      </div>
      <CustomAlertDialog
        isOpen={open}
        setIsOpen={setOpen}
        onConfirm={onConfirm}
        message={"Are you sure you want to book this table?"}
        title={"Book A Table"}
        confirmButtonTitle={"Book"}
      />
    </div>

  )
}