import { useState } from "react";

import Navbar from "../components/Navbar";
import ContentModal from "../components/ContentModal";
import { Button } from "../components/Button";
import { ShareIcon } from "../icon/ShareIcon";
import { PlusIcon } from "../icon/PlusIcon";
import Card from "../components/Card";


export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false); // Default is false to keep modal closed initially

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content Modal */}
      <ContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false); // Close the modal on user action
        }}
      />

      <div className="flex flex-1  ">
        {/* Sidebar */}
        <div className="w-20 min-h-screen md:w-72 border-r ">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 flex-1 ">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 py-4 mt-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              All Notes
            </h1>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              <Button
                // onClick={() => {
                //   setModalOpen(true); // Open modal on Share Brain click
                // }}
                variant="secondary"
                startIcon={<ShareIcon size="md" />}
                size="md"
                title="Share Brain"
              />
              <Button
                onClick={() => {
                  setModalOpen(true); // Open modal on Add Content click
                }}
                variant="primary"
                startIcon={<PlusIcon size="md" />}
                size="md"
                title="Add Content"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="py-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Project Ideas" />
            <Card title="How to Build a Second Brain" />
            <Card title="Productivity Tip" />
            <Card title="Another Note" />
            <Card title="More Ideas" />
          </div>
        </div>
      </div>
    </div>
  );
};


