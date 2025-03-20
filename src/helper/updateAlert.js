import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { UpdateStatusRequest } from "../APIRequest/APIRequest";

export async function UpdateToDo(id, currentStatus) {
    try {
        const { value: newStatus } = await Swal.fire({
            title: "Change Status",
            input: "select",
            inputOptions: {
                New: "New",
                Completed: "Completed",
                Progress: "Progress",
                Cancelled: "Cancelled"
            },
            inputValue: currentStatus, // Set default selection
            showCancelButton: true,
            confirmButtonText: "Update",
            cancelButtonText: "Cancel",
        });

        if (!newStatus) {
            toast.error("Status update cancelled!");
            return false;
        }

        const response = await UpdateStatusRequest(id, newStatus);

        if (response) {
            //toast.success("Status updated successfully!");
            return true;
        } else {
            toast.error("Failed to update status!");
            return false;
        }
    } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Something went wrong!");
        return false;
    }
}
