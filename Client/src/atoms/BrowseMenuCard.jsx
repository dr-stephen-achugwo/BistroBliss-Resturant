import { Card, CardContent } from "@/components/ui/card"
import React from 'react'
import Link from "next/link"

const BrowseMenuCard = ({data}) => {
	return (
		<Card className="w-full max-w-sm mx-auto rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center p-6 space-y-4 gap-3">
				<img src={`home/BrowseMenu/${data.img}`} alt="" className="w-28 h-28" />
        <h2 className="text-2xl font-semibold text-center">{data.title}</h2>
        <p className="text-center text-gray-600 text-base">{data.description}</p>
        <Link href={data.link} className="text-primary font-bold hover:text-primary-dark hover:underline duration-300">Explore Menu</Link>
      </CardContent>
    </Card>
	)
}

export default BrowseMenuCard