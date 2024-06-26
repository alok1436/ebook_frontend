
import { ToastContainer, toast } from 'react-toastify';
export const successToast = (msg) => {
    toast.success( msg, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
       // draggable: true,
        progress: undefined,
    })
}

export const errorToast = (msg) => {
    toast.error( msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
       // draggable: true,
        progress: undefined,
    })
}

export const infoToast = (msg) => {
    toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        });
}
