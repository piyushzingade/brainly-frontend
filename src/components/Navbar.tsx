import { ReactElement } from "react";
import BrainIcon from "../icon/BrainIcon";
import LinkIcon from "../icon/LinkIcon";
import TagsIcon from "../icon/TagsIcon";
import DocIcon from "../icon/DocIcon";
import VideoIcon from "../icon/VideoIcon";
import TweeterIcon from "../icon/TweeterIcon";


interface colProps {
  startIcon : ReactElement,
  title : string,
}


function Navbar() {
  return (
    <div className=" px-4 mt-4">
      <div className="text-2xl font-bold mt-3">
        <Col startIcon={<BrainIcon size="lg" />} title={"Brainly"} />
      </div>
      <div className="mt-8 py-2 px-3 space-y-6 text-lg font-medium">
        <Col startIcon={<TweeterIcon size="md"  />} title={"Tweet"} />
        <Col startIcon={<VideoIcon size="md" />} title={"Videos"} />
        <Col startIcon={<DocIcon size="md" />} title={"Documents"} />
        <Col startIcon={<LinkIcon size="md" />} title={"Links"} />
        <Col startIcon={<TagsIcon size="md" />} title={"Tags"} />
      </div>
    </div>
  );
}

const Col = (props : colProps) =>{
  return (
    <div className="flex items-center ">
      {props.startIcon}
      <div className="pl-2 pr-2 hover:cursor-pointer hidden md:block font-normal">{props.title}</div>
    </div>
  );
}

export default Navbar;
