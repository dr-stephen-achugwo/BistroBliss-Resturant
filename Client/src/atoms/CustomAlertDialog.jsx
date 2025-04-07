import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const CustomAlertDialog = ({ isOpen, setIsOpen, onConfirm , message, title , confirmButtonTitle}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen} className="z-50">
      <AlertDialogContent className="bg-[#f4f4f4]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 font-semibold">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="text-white" 
            onClick={onConfirm}>
            {confirmButtonTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
