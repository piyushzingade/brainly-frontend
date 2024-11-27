import React, { ReactElement } from "react";
import DocIcon from "../icon/DocIcon";
import { ShareIcon } from "../icon/ShareIcon";
import DeleteIcon from "../icon/DeleteIcon";

interface HeaderProps {
  startIcon: ReactElement;
  title: string;
  secondLastIcon: ReactElement;
  lastIcon: ReactElement;
}

interface CardProps {
  title: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="bg-white w-96 h-80 rounded-3xl p-6 shadow-lg space-y-4">
      {/* Card Header */}
      <Header
        startIcon={<DocIcon size="md" />}
        title={props.title}
        secondLastIcon={<ShareIcon size="md" />}
        lastIcon={<DeleteIcon size="md" />}
      />

      {/* Card Content */}
      <div>
        <h2 className="font-bold text-xl">{props.title}</h2>
        <p className="text-sm text-gray-600">
          Add description or content here for your notes.
        </p>
        <div className="mt-4 space-x-3">
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
            #productivity
          </span>
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
            #ideas
          </span>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400">Added on 10/03/2024</p>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({
  startIcon,
  title,
  secondLastIcon,
  lastIcon,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>{startIcon}</div>
      <div className="text-sm font-medium">{title}</div>
      <div className="flex space-x-3">
        <button>{secondLastIcon}</button>
        <button>{lastIcon}</button>
      </div>
    </div>
  );
};

export default Card;
