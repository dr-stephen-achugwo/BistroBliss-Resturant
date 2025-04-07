import { UtensilsCrossed } from 'lucide-react'
import React from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import "@/app/globals.css"
import { useRouter } from 'next/navigation';

const EmptyMenu = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center h-96 m-10 w-1/2 
      max-md:w-4/5 p-8 space-y-6 border rounded-3xl bg-[#F9F9F7] shadow-md">

      <UtensilsCrossed className="h-20 w-20 text-primary-dark animate-bounce" />

      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 max-md:">
          Oops! No Meals Available
        </h3>
        <p className="text-sm text-gray-600 max-md:text-xs">
          It looks like our menu is empty at the moment. Check back later for delicious meals!
        </p>
      </div>

      <Button onClick={() => router.push('/')} 
        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg activeButtonStyle ">
        Back to Home
      </Button>
    </div>
  );
};

export default EmptyMenu;
