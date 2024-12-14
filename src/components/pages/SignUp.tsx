
import { useForm } from "react-hook-form"
import {  useNavigate } from "react-router-dom";
import { apiConnector } from "../../operations/apiconnector";
import { endPoints } from "../../operations/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";


export function SignUp() {





    const navigate = useNavigate()
    const { register, handleSubmit,  } = useForm();
    const [loading, setLoading] = useState(false)
    const [showPass,setShowPass]=useState(false)

    const onSubmit = (data: any) => {
        
        const fetchData = async () => {
            let clock
            try {
                setLoading(true)


                 clock=  setTimeout(() => {
                    toast.loading("Backend is hosted on free cluster.So it may take longer.", {
                        duration: 7000, position: 'top-center',
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    })
                }, 5000);
           await apiConnector({
                    method: "post",
                    url: endPoints.SIGN_UP,
                    bodyData: {
                        email: data.username,
                        password: data.password
                    }

                });


                setLoading(false)
                toast.success("User Registered ", {
                    duration: 3000, position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                })

                clearInterval(clock)
                navigate("/signin")
               
               
            } catch (error: any) {
               
                console.error("Error fetching data:", error);
                toast.error(`${error?.response?.data?.message}`, {
                    duration: 3000, position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                })
                setLoading(false)
                clearInterval(clock)
            }
        };

        fetchData();

    };






    return <div className="h-screen text-white  flex justify-center items-center w-full bg-black">
        <div className="border rounded-md p-3">

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col  p-3 gap-2 rounded-lg">
                    <h1 className="text-[30px] text-orange-500 font-bold ">Welcome to Brainly</h1>
                    {/* firstname and lastnae */}
                    <div className=" sm:flex mt-4 gap-3">
                        <div className="flex flex-col  gap-1">
                            <label>Firstname</label>
                            <input placeholder="Firstname" className="border text-black p-1  rounded-md focus:outline-none bg-slate-00 focus:ring-2 focus:ring-blue-500" {...register('firstName')} />
                        </div>
                        <div className="flex gap-1 flex-col">
                            <label>Lastname</label>
                            <input placeholder="Lastname" className="border p-1 text-black  rounded-md focus:outline-none bg-slate-00 focus:ring-2 focus:ring-blue-500" {...register('lastName')} />
                        </div>
                    </div>

                    {/* email and username */}
                    <div className=" sm:flex gap-3">
                        {/* <div className="flex flex-col gap-1">
                            <label>Email</label>
                            <input placeholder="Email" className="p-1 text-black rounded-md" {...register('email')} />
                        </div> */}
                        <div className="flex w-full flex-col gap-1">
                            <label>Username</label>
                            <input placeholder="username" className="p-1 text-black rounded-md" {...register('username')} />

                        </div>
                    </div>
                    {/* password */}
                    <div className="flex flex-col gap-1">
                        <label>Password</label>
                        <input  type={`${showPass?"text":"password"}`} placeholder="Password" className="p-1 text-black rounded-md" {...register('password')} />
                           { !showPass?  <span  onClick={()=>setShowPass(c=>!c)} className="absolute mt-[34px] text-xl ml-60 text-gray-800"><IoEyeOff /></span>:<span onClick={()=>setShowPass(c=>!c)} className="absolute mt-[34px] text-xl ml-60 text-gray-800"><IoEyeSharp /></span>
                    }
                    </div>

                    <button className="bg-slate-600 p-2 flex justify-center items-center gap-2 text-white font-mono  font-bold mt-4 rounded-md"><span>Sign Up </span>{loading ? <span className="loader "></span> : <span className=""><FaArrowRight /></span>}</button>
                    <h1>Already have an account? <span onClick={() => {
                        navigate("/signin")
                    }} className="text-blue-400 cursor-pointer">SignIn</span></h1>

                </div>

            </form>
        </div>
    </div>
}