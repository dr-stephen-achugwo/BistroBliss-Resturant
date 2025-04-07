"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Playfair_Display } from 'next/font/google'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import "../../../app/globals.css"
import CustomAlertDialog from "@/atoms/CustomAlertDialog"
import { getProfile, updateProfile } from "@/services/userServices"
import toast from "react-hot-toast"

const personalInfoSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters."),
	email: z.string().email("Invalid email address."),
	password: z.string().min(8, "Password must be at least 8 characters."),
	confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters."),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Confirm Password does not match.",
	path: ["confirmPassword"]
});


const playFairDisplay_Font = Playfair_Display({ subsets: ['latin'] })

const PersonalInfo = () => {
	const [updatedData, setUpdatedData] = useState({})
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors , isSubmitting },
	} = useForm({
		resolver: zodResolver(personalInfoSchema)
	});

	useEffect(() => {
		const fetchProfile = async () => {
			const data = await getProfile();				
			if (data) {
				const { username, email } = data.data.user;
				reset({ username, email });
			}
		};
		fetchProfile();
	}, [reset]);


	const onSubmit = (data) => {
		setOpen(true)
		setUpdatedData(data)
	}


	const onConfirm = () => {
		toast.promise(
			updateProfile(updatedData),
			{
				loading: "Updating profile...",
				success: "Profile updated successfully!",
				error: (err) => {
					setError("root", { message: err.message });
					return "Something went wrong! Please try again.";
				}
			}
		)
	}

	return(
		<>
			<Card>
					<CardHeader>
						<CardTitle className={playFairDisplay_Font.className } >
						<span className="font-semibold tracking-wide" >Personal Information</span>
						</CardTitle>
						<CardDescription>Update your profile details here.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-3">

							{/* Username */}
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input 
									id="username" 
									type="text"
									{...register('username')}
								/>
								<div className="h-1">
									{errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
								</div>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input 
									id="email" 
									type="email" 
									{...register("email")}
								/>
								<div className="h-1">
									{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
								</div>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<Label htmlFor="password">New password</Label>
								<Input
									id="password"
									type="password"
									{...register("password")}
									placeholder="Enter your new password"
								/>
								<div className="h-1">
									{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
								</div>
							</div>

							{/* Confirm Password */}
							<div className="space-y-2">
								<Label htmlFor="password">Confirm new password</Label>
								<Input
									id="password"
									type="password"
									{...register("confirmPassword")}
									placeholder="Confirm your new password"
								/>
								<div className="h-1">
									{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
								</div>
							</div>

							{/* Root */}
							<div className="h-1">
									{errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
							</div>

							{/* Submit Button */}
							<Button className="w-full text-white activeButtonStyle" type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Loading..." : "Update Profile"}
							</Button>

						</form>
					</CardContent>
			</Card>

			<CustomAlertDialog 
				isOpen={open} 
				setIsOpen={setOpen}
				title={"Update Profile"}
				message={"Are you sure you want to update your profile?"}
				confirmButtonTitle={"Confirm"}
				onConfirm={onConfirm}
			/>
		</>
	)
}

export default PersonalInfo