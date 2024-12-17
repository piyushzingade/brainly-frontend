
import {  useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { endPoints } from "../operations/api";
import { apiConnector } from "../operations/apiconnector";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { IoEyeOff,IoEyeSharp } from "react-icons/io5";

// interface SignupFormInputs {
//     username: string;
//     password: string;
//   }

export function SignIn() {

    const [loading,setLoading]=useState(false);
    const navigate =useNavigate()
    const { register, handleSubmit} = useForm();
    const [showPass,setShowPass]=useState(false)

    const onSubmit= (data:any) => {
        // console.log('Form Data:', data);
        const fetchData = async () => {
            try {

          const clock=  setTimeout(() => {
                toast.loading("Backend is hosted on free cluster.So it may take longer.", {
                    duration: 7000, position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                })
            }, 5000);

                setLoading(true)
                const response = await apiConnector({
                method: "post",
                url: endPoints.SIGN_IN,
                bodyData:{
                    email:data.username,
                    password:data.password
                }
    
               
              });
              localStorage.setItem("token",response.data.token)
            //   console.log("Response Data:", response.data);
              setLoading(false)
              toast.success("Logged In ", {
                duration: 3000, position: 'top-center',
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            })

            clearTimeout(clock)
            navigate("/dashboard")
              
            } catch (error:any) {
                // console.error("Error fetching data:", error);
                toast.error(`${error?.response?.data?.message}`,{duration:3000,position:'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                      },
                })
              setLoading(false)
            }
          };
          
          fetchData();
       
      };
    
    return <div className="h-screen text-white  flex justify-center items-center w-full bg-black">
        <div className="border rounded-md p-3">
           
            <form onSubmit={handleSubmit(onSubmit)}>
              
                <div className="flex flex-col p-3 gap-2 rounded-lg">
                    <h1 className=" text-orange-600 font-semibold text-[20px]">Login to continue</h1>
                    {/* firstname and lastnae */}
                
                    {/* email and username */}
                    <div className=" sm:flex gap-3">
                        {/* <div className="flex flex-col gap-1">
                            <label>Email</label>
                            <input placeholder="Email" className="p-1 text-black rounded-md" {...register('email')} />
                        </div> */}
                        <div className="flex w-full flex-col gap-1">
                            <label>Username</label>
                            <input placeholder="Username" className="p-1 text-black rounded-md" {...register('username')} />

                        </div>
                    </div>
{/* password */}
                    <div className="flex flex-col gap-1">
                            <label>Password</label>
                            <input type={`${showPass?"text":"password"}`} placeholder="Password" className="p-1 text-black font-medium rounded-md" {...register('password')} />
                                { !showPass? 
                                 <span 
                                     onClick={()=>setShowPass(c=>!c)} 
                                     className="absolute mt-[34px] text-xl ml-44 text-gray-800"
                                    >
                                    <IoEyeOff />
                                </span>:
                                <span 
                                    onClick={()=>setShowPass(c=>!c)} 
                                    className="absolute mt-[34px] text-xl ml-44 text-gray-800">
                                        <IoEyeSharp />
                                        </span>
                    }</div>

                    <button className="bg-white p-2 flex justify-center items-center gap-2 text-black font-mono font-bold mt-4 rounded-md hover:bg-slate-100"><span>Sign In </span>{loading ? <span className="loader "></span> : <span className=""><FaArrowRight /></span>}</button>
                    <h1>Create new account? <span onClick={()=>{
                    navigate("/signup")
                            }} className="text-blue-400 cursor-pointer underline">SignUp</span></h1>

                </div>

            </form>
        </div>
    </div>
}