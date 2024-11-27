import CrossIcon from "../icon/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContentModal({ open, onClose }: ContentModalProps) {

  function addContent(){
    
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-lg">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div className="">
                <Input placeholder="Title"   />
                <Input placeholder="Link"  />
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" title="Submit" size="md" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


