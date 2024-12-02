import { useRef, useState } from "react";
import CrossIcon from "../icon/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "./config";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube  = "youtube" ,
  Twitter = "twitter"
}

export default function ContentModal({ open, onClose }: ContentModalProps) {
  const titleRef = useRef<HTMLInputElement>()
  const linkRef = useRef<HTMLInputElement>();
  const [type , setType] = useState(ContentType.Youtube)

  async function addContent(){
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/content` , {
      title,
      link,
      type
    }, {
      headers: {
        "token" : localStorage.getItem("token")
      }
    })
    alert("Content Added")

  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            
          </div>
          <div className="w-screen h-screen fixed top-0 left-0  flex justify-center items-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded-lg">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder="Title" />
                  <Input reference={linkRef} placeholder="Link" />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-2 p-4">
                    <Button
                      title="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      size="md"
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      title="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      size="md"
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    ></Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    title="Submit"
                    size="md"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


