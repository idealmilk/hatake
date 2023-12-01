import React, { MouseEventHandler, useState } from "react";
import { Button, Modal } from "antd";
import { auth } from "@/lib/firebase/config";

type EditModalProps = {
  modalOpen: boolean;
  setModalOpen: Function;
  changes: any;
  setChanges: Function;
  updateProfileData: MouseEventHandler;
  currentUser: any;
};

const EditModal: React.FC<EditModalProps> = ({
  modalOpen,
  setModalOpen,
  changes,
  setChanges,
  updateProfileData,
  currentUser,
}) => {
  let user = auth.currentUser;

  return (
    <Modal
      title="Edit Profile"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => {
        setModalOpen(false);
        setChanges({
          displayName: currentUser.displayName ? currentUser.displayName : "",
          email: currentUser.email ? currentUser.email : "",
          headline: currentUser.headline ? currentUser.headline : "",
          location: currentUser.location ? currentUser.location : "",
        });
      }}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={updateProfileData}
          // disabled={changes.length < 1}
        >
          Submit
        </Button>,
      ]}
    >
      <input
        className="block description bg-gray-100 sec p-3 w-full border border-gray-300 outline-none"
        spellCheck="false"
        placeholder="Display Name"
        value={changes.displayName}
        onChange={(event) =>
          setChanges((prevState: any) => ({
            ...prevState,
            displayName: event.target.value,
          }))
        }
      />

      <input
        className="block description bg-gray-100 sec p-3 w-full border border-gray-300 outline-none"
        spellCheck="false"
        placeholder="Email"
        value={changes.email}
        onChange={(event) =>
          setChanges((prevState: any) => ({
            ...prevState,
            email: event.target.value,
          }))
        }
      />

      <input
        className="block description bg-gray-100 sec p-3 w-full border border-gray-300 outline-none"
        spellCheck="false"
        placeholder="Headline"
        value={changes.headline}
        onChange={(event) =>
          setChanges((prevState: any) => ({
            ...prevState,
            headline: event.target.value,
          }))
        }
      />

      <input
        className="block description bg-gray-100 sec p-3 w-full border border-gray-300 outline-none"
        spellCheck="false"
        placeholder="Location"
        value={changes.location}
        onChange={(event) =>
          setChanges((prevState: any) => ({
            ...prevState,
            location: event.target.value,
          }))
        }
      />
    </Modal>
  );
};

export default EditModal;
