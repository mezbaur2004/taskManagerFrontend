import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { DeleteRequest } from "../APIRequest/APIRequest";

export async function DeleteToDo(id) {
    try {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!confirmDelete.isConfirmed) {
            toast.error("Deletion cancelled!");
            return false;
        }

        const result = await DeleteRequest(id);

        if (result) {
            //toast.success("Task deleted successfully!");
            return true;
        } else {
            toast.error("Failed to delete task!");
            return false;
        }
    } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
        return false;
    }
}
