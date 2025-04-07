import React from 'react'

const BookingItem = ({ name, date, time , status , phone , totalPerson}) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold text-primary">{name}</h3>
				<div className="flex flex-col">
        	<p className="text-sm text-gray-500">
				<span className="font-semibold">Date: </span>
				{date}
			</p>
			<p className="text-sm text-gray-500">
				<span className="font-semibold">Time: </span>
				{time}
			</p>
			<p className="text-sm text-gray-500">
				<span className="font-semibold">Total Person: </span>
				{totalPerson} Person
			</p>
			<p className="text-sm text-gray-500">
				<span className="font-semibold">Phone: </span>
				{phone}
			</p>
		</div>
      </div>
      <div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "accepted" ? "bg-green-100 text-green-800" 
						:
						status === "rejected" ? "bg-red-100 text-red-800" 
						:
						"bg-yellow-100 text-yellow-800"
          }`}
        	>
          {status}
        </span>
      </div>
    </div>
  )
}

export default BookingItem