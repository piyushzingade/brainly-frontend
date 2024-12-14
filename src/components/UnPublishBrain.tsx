import { useEffect, useState } from "react";
import { apiConnector } from "../operations/apiconnector";
import { endPoints } from "../operations/api";
import toast from "react-hot-toast";

export default function UnPublishBrain({shareUrl}:any) {
  const [status, setStatus] = useState("false");

  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await apiConnector({
          method: "post",
          url: endPoints.STATUS,
          bodyData:{
            unLive:false
        },
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        // console.log("response from uNpublish", response.data.link);
        // console.log("response from uNpublish", response.data.link[0].live);

        if (response.data.link[0].live === "true") {
          setStatus("true");
        }
      } catch (err) {
        // console.error(err);
      }
    }

    checkStatus();
  }, [shareUrl]);

  
  const handleToggle = async() => {
    try{
        await apiConnector({
            method: "post",
            url: endPoints.STATUS,
            bodyData:{
                unLive:true
            },
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          toast.success("Brain Unpublished",{duration:3000,position:'top-center',
            style: {
                background: '#363636',
                color: '#fff',
              },
        })

          
    const newStatus = status === "true" ? "false" : "true";
    setStatus(newStatus);
    console.log("Updated status:", newStatus);

  
    }catch(err){

    }


  };

  return (
    <div className="flex items-center  justify-center space-x-4 h-3 ">
  
      
      
      {status=="true" &&<div className="relative inline-flex items-center cursor-pointer">
        <span className={`text-[15px] md:text-[20px]  font-medium ${status === "true" ? "text-blue-400" : "text-gray-600"}`}>
          {status === "true" ? " Share Mode " : "Unpublished"}
        </span>
        {" "}
        {/* Toggle button container */}
        <div
          onClick={handleToggle}
          className={`w-8 h-4 ml-2 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${status === "true" ? "bg-orange-500" : "bg-gray-400"}`}
        >
          {/* Circle inside the toggle */}
          <div
            className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              status === "true" ? "translate-x-3" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>}
    </div>
  );
}
