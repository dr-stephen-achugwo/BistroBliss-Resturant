import { updateBookingStatus } from '@/services/bookingServices';
import CustomAlertDialog from './CustomAlertDialog';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PendingItem = ({bookingId, name, date, time , phone , totalPerson}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [confirmButtonTitle, setConfirmButtonTitle] = useState('');

  const handleUpdateStatus = async () => {
    toast.promise(
      updateBookingStatus(bookingId, status),
      {
        loading: 'Updating booking status...',
        success: 'Booking updated successfully!',
        error: 'Failed to update booking status'
      }
    )
  };

  const handleAccept = () => {
    setTitle("Accept Booking");
    setMessage("Are you sure to accept this booking?");
    setConfirmButtonTitle("Accept");
    setStatus("accepted");
    setIsOpen(true);
  };

  const handleReject = () => {
    setTitle("Reject Booking");
    setMessage("Are you sure to reject this booking?");
    setConfirmButtonTitle("Reject");
    setStatus("rejected");
    setIsOpen(true);
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg 
      max-md:flex-col max-md:justify-start max-md:items-start max-md:gap-5">

      {/* Booking Details */}
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
        {
          totalPerson > 1 ? `${totalPerson} People` : `${totalPerson} Person`
        }
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Phone: </span>
        {phone}
      </p>
    </div>
      </div>

      {/* Booking Actions */}
      <div className="flex items-center gap-5 max-md:w-full max-md:justify-center">
        <button
          onClick={handleAccept}
          title='Accept this booking'
          className="mr-2 px-2 py-1 w-20 text-sm font-semibold rounded-full bg-green-100 text-green-800"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          title='Reject this booking'
          className="px-2 py-1 text-sm w-20 font-semibold rounded-full bg-red-100 text-red-800"
        >
          Reject
        </button>
      </div>

      <CustomAlertDialog 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        message={message} 
        title={title}
        confirmButtonTitle={confirmButtonTitle}
        onConfirm={handleUpdateStatus}
      />
    </div>
  )
}

export default PendingItem