import DeleteIcon from "../icon/DeleteIcon";
import DocIcon from "../icon/DocIcon";
import { ShareIcon } from "../icon/ShareIcon"

interface CardProps {
  title : string,
  link : string,
  type:  "youtube" | "twitter"
}

export const Card = ({title , link , type} : CardProps) =>{
  return (
    <div>
      <div className="p-4 rounded-lg bg-white border-gray-200 max-w-72 border ">
        <div className="">
          <div className="flex pr-3">
            <div className="flex gap-3 items-center text-gray-500">
              <DocIcon size="md" />
              <h2>{title}</h2>
            </div>
            <div className="flex items-center space-x-3 pl-10">
              <div className="pr-3 text-gray-500 cursor-pointer">
                <a href={link} target="_blank">
                  <ShareIcon size="md" />
                </a>
              </div>
              <div className="text-gray-500 cursor-pointer ">
                <DeleteIcon size="md" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            {type === "youtube" && (
              <iframe
                className="w-full rounded-lg"
                src={link.replace("watch" , "embed").replace("?v=" , "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {type === "twitter" && (
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com" , "twitter.com")}></a>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}