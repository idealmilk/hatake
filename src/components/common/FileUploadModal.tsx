import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Button, Modal, Progress, Space } from "antd";
import { auth } from "@/lib/firebase/config";
import { useCurrentUser } from "@/context/UserContext";
import { UserType } from "@/types/user";

type FileUploadModalProps = {
  modalOpen: boolean;
  setModalOpen: Function;
  getImage: ChangeEventHandler<HTMLInputElement>;
  uploadDisplayPic: MouseEventHandler<HTMLElement>;
  currentImage: any;
  uploadProgress: number;
};

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadDisplayPic,
  currentImage,
  uploadProgress,
}) => {
  console.log(setModalOpen);
  return (
    <Modal
      title="Profile photo"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={uploadDisplayPic}
          disabled={!currentImage.name}
        >
          Save photo
        </Button>,
      ]}
    >
      <div className="flex flex-col justify-center items-center ">
        <p>{currentImage.name}</p>
        <label
          htmlFor="image-upload"
          className="p-2 border border-lightGray cursor-pointer"
        >
          Upload photo
        </label>
        {uploadProgress > 0 && (
          <div className="p-6">
            <Progress type="circle" percent={uploadProgress} />
          </div>
        )}
        <input hidden id="image-upload" type="file" onChange={getImage} />
      </div>
    </Modal>
  );
};

export default FileUploadModal;
