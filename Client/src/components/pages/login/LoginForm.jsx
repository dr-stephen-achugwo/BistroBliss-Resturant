"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast , { Toaster } from 'react-hot-toast';
import { Input } from '@/components/ui/input'
import { login } from '@/services/userServices'
import "../../../app/globals.css"

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export default function LoginForm() {
  const { 
    register,
    handleSubmit,
    setError,
    formState: {
      errors , isSubmitting
    } } = useForm({
      resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = async (data) => {
    toast.promise(login(data), {
      loading: "Logging in...",
      success: "Login successful!",
      error: (err) => {
        setError("root", { message: err.message });
        return "Login failed!";
      },
    }); 
  }

  return (
    <div className='bg-[#F9F9F7] min-h-screen flex flex-col justify-around items-center p-6'>
      <Toaster position='top-center' reverseOrder={false}/>
      <img src="Login.svg" alt="" className='p-5'/>
      <div className="w-full max-w-2xl mx-auto p-10 m-10 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-3">
          
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="Email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:border-primary"
            />
            <div className="h-1">{
              errors.email 
              && 
              <span className="text-red-500 text-xs ml-3">
                {errors.email.message}
              </span>
            }</div>
          </div>
          
          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="Password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:border-primary"
            />
            <div className="h-1">{
              errors.password 
              && 
              <span className="text-red-500 text-xs ml-3">
                {errors.password.message}
              </span>
            }</div>
          </div>

          {/* Root Error */}
          <div className="h-1 flex justify-center items-center">{
              errors.root 
              && 
              <span className="text-red-500 text-xs ml-3">
                {errors.root.message}
              </span>
          }</div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full px-4 py-3 font-semibold rounded-full text-white activeButtonStyle"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {/* Register Link */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            <p className='text-gray-500'>Don't have an account?</p>
            <Link href='/register'
            className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>

        </form>
      </div>
    </div>

  )
}