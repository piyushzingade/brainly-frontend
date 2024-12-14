
import { RiLinksFill } from "react-icons/ri";

import toast from "react-hot-toast";
interface CardProps {
    title: string;
    link: string;
    type: string,
    desc: string,
    tags: []
}
export function PublishedCard(props: CardProps) {

    let videoUrl = "";
    if (props.type.toLowerCase() == "youtube") {

        if (!props.link) return

      

        if (props.link.includes("https://www.youtube.com")) {

            const videoId = props.link.split("?v=")[1];
            videoUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (props.link.includes("https://youtu.be")) {
            // https://youtu.be/0BDt08x-De8?si=Kw3VCY7Fo3ArYU6l
            const videoId = props.link.split("youtu.be/")[1]?.split("?")[0];
            videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        // console.log(videoUrl)
    }
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(props.link)
            .then(() => {
                toast.success("Link Copied", {
                    duration: 3000, position: 'top-center',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                })
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };
    return <div className="rounded-md border-[1px] text-white  border-gray-500 p-2 shadow-md max-w-80 ">


        <div className="flex mt-2  justify-between ">
            <div className="flex gap-2 text-md items-center">
                <div className="h-2 w-2 rounded-full bg-red-300"></div>
                <p className=" font-bold">{props.title}</p>
            </div>
            <div className="flex gap-1 text-white items-center">

                {/* <h1><FaShare/></h1> */}
                <span onClick={() => handleCopyToClipboard()} className="bg-blue-3 cursor-pointer  border-[px] border-gray-500 hover:bg-orange-600  rounded-full p-2 text-[20px]">
                    <RiLinksFill />
                </span>
               
            </div>

        </div>
        <div className=" rounded-md pt-3 ">
            {
                (props.type == "youtube") ? (<div className="">
                    <iframe className="rounded-md" width="full" height="full" src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="flex flex-col  ">
                    <span className="bg-blue-500 w-fit px-1 rounded-lg mt-2">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</span>
                        <p className="mt-4 text-gray-300 font p-">{props.desc}</p>
                        <div className="flex flex-wrap  mt-2 gap-1">
                            {
                                props.tags.map((tag, index) => (
                                    // @ts-ignore
                                    <span key={index} className="text-white  bg-orange-700 px-1 rounded-sm">{"#"}{tag?.title}</span>
                                ))
                            }
                        </div>
                    </div>
                    {/* https://www.youtube.com/watch?v=0BDt08x-De8 */}
                </div>) : (props.type === "twitter") ?
                    (<div className="">
                        {/* <blockquote className="twitter-tweet">
                            <a href={props.link}></a>
                        </blockquote> */}
                        <div className="">
                            <img width={""} className="rounded-md " src="https://store-images.microsoft.com/image/apps.57874.9007199266244427.12d00104-ac5d-4406-ad7b-66f678d54e19.e9fa7d2a-16a1-437c-bbd5-cf0e4e2d2c70" />
                        </div>
                        <div className="flex flex-col  ">
                        <span className="bg-blue-500 w-fit px-1 rounded-lg mt-2">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</span>
                            <p className="mt-4 text-gray-300 font p-">{props.desc}</p>
                            <div className="flex flex-wrap  mt-2 gap-1">
                                {
                                    props.tags.map((tag, index) => (
                                        // @ts-ignore
                                        <span key={index} className="text-white  bg-orange-600 px-1 rounded-sm">{"#"}{tag?.title}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>) : (props.type === "music") ? (<div>
                        {/* img section */}
                        <div className="">
                            <img className="rounded-md" src="https://cdn.logojoy.com/wp-content/uploads/20240517160549/05-16-24_Spotify-Logo-Evolution_HEADER.jpg"/>
                        </div>
                        <div className="flex flex-col  ">
                            <span className="bg-blue-500 w-fit px-1 rounded-lg mt-2">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</span>
                            <p className="mt-4 text-gray-300 font p-">{props.desc}</p>
                            <div className="flex flex-wrap  mt-2 gap-1">
                                {
                                    props.tags.map((tag, index) => (
                                        // @ts-ignore
                                        <span key={index} className="text-white  bg-orange-600 px-1 rounded-sm">{"#"}{tag?.title}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>) : (props.type === "link") ? (<div>
                        {/* img section */}
                        <div className="w-">
                            <img className="rounded-md" src="https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-link/sta-je-link.jpg"/>
                        </div>
                        <div className="flex flex-col  ">
                            <span className="bg-blue-500 w-fit px-1 rounded-lg mt-2">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</span>
                            <p className="mt-4 text-gray-300 font p-">{props.desc}</p>
                            <div className="flex flex-wrap  mt-2 gap-1">
                                {
                                    props.tags.map((tag, index) => (
                                        // @ts-ignore
                                        <span key={index} className="text-white  bg-orange-600 px-1 rounded-sm">{"#"}{tag?.title}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>) : (<div></div>)
            }

        </div>

    </div>
}
// props.link.replace("watch","embed").replace("?v=","/")
// https://www.youtube.com/watch?v=yS8k-bWtMWk

