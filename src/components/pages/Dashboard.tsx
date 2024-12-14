import { useEffect, useState } from "react";
import { FaYoutube, FaTwitter, FaMusic, FaLink, FaPlus, FaShare } from "react-icons/fa";
import Brain1 from "../../assets/Brain1 (1).png"
import { AddContentModal } from "../Modals/AddContentModal";
import { ShareModal } from "../Modals/ShareModal";
import useGetContent from "../hooks/useGetContent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allContentAtom, contentAtom } from "../Recoil/store/atom/contentAtom";
import { Card } from "../cards/DashBoardCard";
import { apiConnector } from "../../operations/apiconnector";
import { endPoints } from "../../operations/api";
import toast from "react-hot-toast";
import { FaBrain } from "react-icons/fa6";

import { IconLogout } from "@tabler/icons-react";
import { LogOutModal } from "../Modals/LogOutModal";
import { useNavigate } from "react-router-dom";
import { Shimmer } from "../cards/Shimmer";
import UnPublishBrain from "../UnPublishBrain";


export function DashBoard() {


  const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState("My Brain");
  const [fetched, setFetched] = useState(false);

  const Menus = [
    { title: "My Brain", src: <FaBrain /> },
    { title: "Youtube", src: <FaYoutube /> },
    { title: "Twitter", src: <FaTwitter /> },
    { title: "Music", src: <FaMusic />, gap: true },
    { title: "Link", src: <FaLink /> },



  ];
  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openLogOutModal, setOpenLogOutModal] = useState(false);

  const setContent = useSetRecoilState(contentAtom);
  const setAllContent = useSetRecoilState(allContentAtom);
  const content = useRecoilValue(contentAtom);

  const allContentAtomValue = useRecoilValue(allContentAtom)
  const allContent = useGetContent({setFetched});
console.log(fetched)


  useEffect(() => {
   
    if (allContent) {
      setContent(allContent);
      setAllContent(allContent);



    }
 

  }, [allContent])



  const [shareUrl, setShareUrl] = useState("Loading...")


  async function ShareHandler() {
    try {
      const response = await apiConnector({
        method: "post",
        url: endPoints.SHARE,
        headers: {
          token: localStorage.getItem("token")
        },
        bodyData: {
          share: true
        }


      })
      // console.log(response.data.hash)
      const hash = response?.data?.hash;
      if (hash) {
        const baseUrl = "https://brainly-100xdevs.vercel.app/share";
        setShareUrl(`${baseUrl}/${hash}`);
        // console.log("Updated Share URL:", `${baseUrl}/${hash}`);
        toast.success("Brain Published", {
          duration: 3000, position: 'top-center',
          style: {
            background: '#363636',
            color: '#fff',
          },
        })
      }




    } catch (err) {

    }
  }


  function filterHandler(type: any) {
    console.log(type)
    if (type !== "My Brain") {
      setFilter(type)
      console.log(allContentAtomValue)
      const typeItem = allContentAtomValue.filter((c) => c.type == type.toLowerCase()
      );
      // console.log("content after filter",typeItem)
      setContent(typeItem);

    }
    else {
      setFilter(type)
      setContent(allContent)

    }
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false)
      } // `md` breakpoint is 768px
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <>

      <div className="flex max-h-screen w-full overflow-x-hidden  bg-black">
     
        <AddContentModal open={openModal} onClose={() => setOpenModal(c => !c)} />
        <ShareModal open={openShareModal} shareUrl={shareUrl} onClose={() => setOpenShareModal(c => !c)} />
        <LogOutModal open={openLogOutModal} onClose={() => setOpenLogOutModal(c => !c)} />

        {/* sidebar */}
        <div
          className={` ${open ? "w-72" : "w-16 "
            } bg-dark-purple h-screen p-5 rounded-md  border-[1px]   border-gray-600 pt- relative duration-300`}
        >
          <img
            src={Brain1}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border- rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div onClick={() => {
            navigate("/")
          }} className={`${open ? "" : "w-10"} flex cursor-pointer  gap-x-2 -ml-2 items-center`}>
            <img
              width={"100px"}
              src={Brain1}
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={`text-orange-400 mb-6 font-serif font-bold origin-left text-3xl duration-200 ${!open && "scale-0"
                }`}
            >
              BRAINLY
            </h1>
          </div>


          <ul className="pt-6 bg flex flex-col  gap-2">
            {Menus.map((Menu, index) => (
              <li

                onClick={() => filterHandler(Menu.title)}
                key={index}
                className={`${open ? " hover:bg" : "-ml-2 w-9  justify-center   "} ${filter == Menu.title ? "bg-blue-500 " : ""}  flex bg-gray-3 borde rounded-md p-2 transition-all duration-200 cursor-pointer hover:bg-gray-60 text-gray-300 text-sm items-center gap-x-4
               ${index === 0 && " opacity-"
                  } `}
              >
                <span className={` ${open ? "" : " border-0 hover:scale-150 transition-all duration-200"}  text-2xl md:p-1  -ml`}>{Menu.src}</span>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
          <div className="p-1 flex mt-3 flex-col gap-5">
            <button onClick={() => { setOpenModal(c => !c) }} className="text-white flex items-center gap-4 ">
              <span className={` ${open ? "ml-1" : " -ml-[6px] border-0 hover:scale-150 transition-all duration-200"}  text-2xl md:p-1  -ml`}><FaPlus /></span>
              <span className={`${!open && "hidden"} origin-left duration-200 text-gray-300 text-sm `}>Add Content</span>
            </button>
            <button onClick={() => {
              setOpenShareModal(c => !c)
              ShareHandler()
            }} className="text-white flex items-center gap-4 ">
              <span className={` ${open ? "ml-1" : "-ml-[6px] border-0 hover:scale-150 transition-all duration-200"}  text-2xl md:p-1  -ml`}><FaShare /></span>
              <span className={`${!open && "hidden"} origin-left duration-200 text-gray-300 text-sm`}>Share</span>
            </button>
            <button onClick={() => { setOpenLogOutModal(c => !c) }} className="text-white flex items-center gap-4  ">
              <span className={` ${open ? "ml-1" : " -ml-[6px] border-0 hover:scale-150 transition-all duration-200"}  text-[40px] md:p-1  -ml`}><IconLogout /></span>
              <span className={`${!open && "hidden"} origin-left duration-200 text-gray-300 text-sm `}>Logout</span>
            </button>
          </div>

        </div>


        <div className="overflow-y-scroll  flex-1 p-7">

          <div className={`text-2xl  bg-black  flex justify-between items-center text-white  font-semibold `}>
            Workspace
            <UnPublishBrain shareUrl={shareUrl} />
          </div>

          <div className="flex w-full justify-center mt-16 bg-black items-center gap-5  flex-wrap">
            {content?.length > 0 ? (
              content.map(({ type,_id, link, title, tags, description }, index) => (
                
                <div key={index} className='min-h-[300px]  hover:scale-105 transition-all duration-200'>
                  
                  <Card _id={_id} tags={tags} desc={description} type={type} title={title} link={link} />
                </div>
              ))
            ) : (

              fetched ? (content.length === 0 ? <div className="text-white  justify-center items-center "> No content</div> : <Shimmer />) : <Shimmer />
            )}
          </div>

        </div>


      </div>
    </>
  );
};

