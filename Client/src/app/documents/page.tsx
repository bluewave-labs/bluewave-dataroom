"use client";

import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal/DeleteConfirmationModal";
import UploadModal from "@/Components/UploadModal/UploadModal";
import { useState } from "react";

export default function Home() {
  //this is just an example which props are passed.
  const [showDeleteModal, setShowDeleteModal] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(true);
  const handleDelete = () => {
    alert("It successfully deleted.");
  };

  return (
    <div style={{ verticalAlign: "top", display: "table" }}>
      <div style={{ display: "table-cell" }}>
        {showDeleteModal && (
          <DeleteConfirmationModal
            itemToDelete="file"
            handleDelete={handleDelete}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </div>
      <div style={{ display: "table-cell" }}>
        {showUploadModal && (
          <UploadModal
            itemToUpload="file"
            setShowUploadModal={setShowUploadModal}
          />
        )}
      </div>
    </div>
  );
}
