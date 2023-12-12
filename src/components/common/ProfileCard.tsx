import { useState } from "react";
import EditModal from "./EditModal";
import { GetCurrentUser, UpdateUser } from "@/lib/firebase/firestore";
import { FaLocationDot } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useCurrentUser } from "@/context/UserContext";

const ProfileCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { currentUser, setCurrentUser } = useCurrentUser();

  const [changes, setChanges] = useState({
    displayName: currentUser?.displayName ? currentUser?.displayName : "",
    email: currentUser?.email ? currentUser?.email : "",
    headline: currentUser?.headline ? currentUser?.headline : "",
    location: currentUser?.location ? currentUser?.location : "",
  });

  const updateProfileData = async () => {
    UpdateUser(currentUser?.id, changes);
    GetCurrentUser(setCurrentUser);
    setModalOpen(false);
  };

  return (
    <div className="relative w-auto mx-32 my-8  border-slate-300 border rounded-3xl">
      <div className="w-full h-48 bg-orange rounded-t-2xl" />

      {/* Top details section */}
      <div className="-translate-y-24 ml-6">
        <div className="w-48 h-48 bg-green border-2 border-white rounded-full" />

        <div className="flex justify-between p-6">
          <div className="">
            {currentUser?.displayName && (
              <h3 className="text-2xl font-semibold">
                {currentUser?.displayName}
              </h3>
            )}

            {currentUser?.location && (
              <div className="flex text-darkGray">
                <IconContext.Provider value={{ size: "1.2em" }}>
                  <div className="mr-2 translate-y-1">
                    <FaLocationDot />
                  </div>
                </IconContext.Provider>
                <p className="text-md">{currentUser?.location}</p>
              </div>
            )}
          </div>

          <div className="">
            <button
              className="text-orange font-semibold border-2 border-orange py-1 px-4 rounded-full"
              onClick={() => setModalOpen(true)}
            >
              Edit Profile
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
      </div>
    </div>
  );
};

export default ProfileCard;
