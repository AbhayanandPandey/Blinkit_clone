import Axios from "./Axios";
import Api from "../config/Api";
import toast from "react-hot-toast";

const UplaodImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await Axios({
            ...Api.uploadImage,
            data: formData
        })

        return response;

    } catch (error) {
        toast.error("Failed to upload image");
    }
}
export default UplaodImage;