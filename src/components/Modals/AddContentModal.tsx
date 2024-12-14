
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { apiConnector } from "../../operations/apiconnector";
import { endPoints } from "../../operations/api";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { contentAtom, contentRefreshTriggerAtom } from "../Recoil/store/atom/contentAtom";
import { Navigate } from "react-router-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
}
interface Tag {
    _id: string;
    title: string;
}
export function AddContentModal({ open, onClose }: ModalProps) {

    const [loading,setLoading]=useState(false)

    const setContent = useSetRecoilState(contentAtom);
    const setRefreshTrigger = useSetRecoilState(contentRefreshTriggerAtom);

    const { register, handleSubmit } = useForm();
    const types = ["youtube","twitter", "link", "music"];
    const [tag, setTag] = useState<Tag[]>([])

    const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
  

    const [tagModal, setTagModal] = useState(false);



    useEffect(() => {
        
        async function getTag() {

            try {


                const response = await apiConnector({
                    method: "get",
                    url: endPoints.TAG,

                })

                setTag(response.data.tags)
              

            } catch (err) {

            }

        }
        getTag();
    }, [])


    const submit = async(data: any) => {
        const tagIds = selectedTag.map((tag) => tag._id);
        
        console.log("Selected Tags:", selectedTag);
        console.log("Tag IDs:", tagIds);
     try{
        setLoading(true)
        const response=await apiConnector({
            method:"post",
            url:endPoints.CONTENT,
            bodyData:{
                title:data.title,
                link:data.link,
                type:data.type.toLowerCase(),
                tags:tagIds,
                description:data.desc
            },
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setContent(response.data.userContent);
        setLoading(false)
        toast.success("Content Added", {
            duration: 3000,
            position: "top-center",
            style: {
              background: "#363636",
              color: "#fff",
            },
          });
          setRefreshTrigger((prev) => prev + 1);
          onClose();
         
          return <Navigate to="/dashboard"></Navigate>;

     }catch (error: any) {
               
        console.error("Error fetching data:", error);
        toast.error(`${error?.response?.data?.message}`, {
            duration: 3000, position: 'top-center',
            style: {
                background: '#363636',
                color: '#fff',
            },
        })
        setLoading(false)
    }
       

    }

    return <> {open && <div onClick={onClose} className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-opacity-90 backdrop-blur-sm transition-all duration-300">

        <div onClick={(e) => e.stopPropagation()} className="bg-black p-4 border rounded-lg text-black w-[300px] ">
        <span onClick={onClose} className="text-white  hover:text-red-600 flex justify-end cursor-pointer text-[30px]">
        <RxCross2/></span>
            <div className="mt- p-6 max-w-md mx-auto bg-black shadow-lg rounded-lg">
              
                <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
                    {/* Title Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            {...register('title')}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Link Field */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 font-medium mb-1">Link</label>
                        <input
                            type="text"
                            placeholder="Enter Link"
                            {...register('link')}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Type Dropdown */}
                    <div className="flex relative flex-col">
                        <label className="text-gray-300 font-medium mb-1">Type</label>
                        <select
                        
                            className="w-full  px-4 py-1 border border-gray-300 rounded-lg text-black bg-white appearance-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            {...register('type')}
                        >
                            {
                                types.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))
                            }

                        </select>
                        <span className="text-gray-600 mt-[38px] ml-[190px] w-1 h-1 absolute"><FaArrowDown /></span>
                    </div>
{/* Description */}
<div className="flex flex-col">
                        <label className="text-gray-300 font-medium mb-1">Description</label>
                        <textarea
                           
                            placeholder="Description"
                            {...register('desc')}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div onClick={() => setTagModal(c => !c)} className="flex relative flex-col">
                        <label className="text-gray-300 font-medium mb-1">Tags</label>
                        <div className="w-full gap-1 flex-wrap flex min-h-10 rounded-md  bg-white px-2 py-1">
                            {
                                selectedTag.map((tag, index) => (
                                    <div key={index} onClick={(e) => e.stopPropagation()} className="flex items-center bg-black text-white rounded-full p-[3px] ">
                                        <span className="">{tag.title}</span>
                                        <span onClick={() => {

                                            const newTags = selectedTag.filter((x) => x !== tag)
                                            setSelectedTag(newTags)

                                        }} className="mt-1 cursor-pointer hover:text-red-700 "> <RxCross2 /></span>

                                    </div>
                                ))
                            }
                            <input className="  focus:outline-none w-20" placeholder="Select tags"></input>
                        </div>
                        {
                            tagModal && <div className="bg-white h-28  absolute overflow-y-scroll z-10 w-full mt-16 rounded-md">
                                <ul>
                                    {tag.map((tag, index) => (
                                        <li key={index} onClick={() => setSelectedTag(prev => [...prev, tag])} className="border cursor-pointer p-1">{tag?.title}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <span onClick={(e) => {
                            setTagModal(c => !c)
                            e.stopPropagation()
                        }} className="text-gray-600 cursor-pointer mt-[38px] ml-[190px] w-1 h-1 absolute"><FaArrowDown /></span>
                    </div>





                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-gray-500 text-white py-2 px-4 flex justify-center items-center gap-1 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                     <span>Add </span>{loading ? <span className="loader "></span> : <span className=""><FaArrowRight /></span>}
                    </button>
                </form>
            </div>

        </div>
    </div>}
    </>
}