import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditModal from "./EditModal";
import { UpdateUser } from "@/lib/firebase/firestore";

export default function ProfileCard({ currentUser }) {
  let user = auth.currentUser;
  const [modalOpen, setModalOpen] = useState(false);
  const [changes, setChanges] = useState({
    displayName: currentUser.displayName ? currentUser.displayName : "",
    email: currentUser.email ? currentUser.email : "",
    headline: currentUser.headline ? currentUser.headline : "",
    location: currentUser.location ? currentUser.location : "",
  });

  const router = useRouter();

  const updateProfileData = async () => {
    UpdateUser(currentUser.id, changes);
    setModalOpen(false);
  };

  console.log(currentUser);

  return (
    <div className="relative w-auto m-8 p-8 border-slate-300 border">
      {currentUser.displayName && <h3>{currentUser.displayName}</h3>}
      {currentUser.headline && <p>{currentUser.headline}</p>}
      {currentUser.location && <p>{currentUser.location}</p>}

      <div className="absolute top-8 right-8">
        <button className="bg-orange p-2" onClick={() => setModalOpen(true)}>
          Edit
        </button>
        <EditModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          changes={changes}
          setChanges={setChanges}
          updateProfileData={updateProfileData}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
