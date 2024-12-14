import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export function LogOutModal({ open, onClose }: ModalProps) {

const navigate=useNavigate();
    function logOutHandler(){
        localStorage.removeItem("token");

        toast.success("Logged Out ", {
            duration: 3000, position: 'top-center',
            style: {
                background: '#363636',
                color: '#fff',
            },
        })
        navigate("/")
    }
    return <>
    {open && <div onClick={onClose} className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-opacity-90 backdrop-blur-sm transition-all duration-300">
        <div onClick={(e)=>e.stopPropagation()} className="bg-black  text-white p-6 border-[1px] border-slate-400 rounded-md">
            <p>Are you sure want to logout?</p>
            <div className="flex mt-4 justify-between ">
                <button onClick={onClose} className="px-2 p-1 bg-red-600 rounded-md  ">Cancel</button>
                <button onClick={logOutHandler} className="px-2 p-1 bg-green-600 rounded-md  ">LogOut</button>
            </div>

        </div>

    </div>}
    </>
}