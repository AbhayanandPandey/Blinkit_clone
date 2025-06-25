import Swal from "sweetalert2";
const SuccessAlert = (title) => {
    const success = Swal.fire({
        title: title,
        icon: "success",
        draggable: true
    });
    return success;
}

export default SuccessAlert;