import Swal from "sweetalert2";
const ErrorAlert = (title) => {
    const error = Swal.fire({
        title: title,
        icon: "error",
        text:'Something went wrong, please try again later.',
    });
    return error;
}
export default ErrorAlert;