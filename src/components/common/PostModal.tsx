import React, { MouseEventHandler, useState } from "react";
import { Button, Modal } from "antd";

type PostModalProps = {
  modalOpen: boolean;
  setModalOpen: Function;
  body: string;
  setBody: Function;
  sendPost: MouseEventHandler;
};

const PostModal: React.FC<PostModalProps> = ({
  modalOpen,
  setModalOpen,
  body,
  setBody,
  sendPost,
}) => {
  return (
    <Modal
      title="Create a post"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={sendPost}
          disabled={body.length < 1}
        >
          Submit
        </Button>,
      ]}
    >
      <textarea
        className="block description bg-gray-100 sec p-3 h-60 w-full border border-gray-300 outline-none"
        spellCheck="false"
        placeholder="What do you want to talk about?"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      ></textarea>

      <button>Post</button>
    </Modal>
  );
};

export default PostModal;
