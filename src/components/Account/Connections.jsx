import React from "react";
import { Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { showConnections } from "../../app/slices/connectionSlice";
import { showModal, setProfile } from "../../app/slices/matchingProfileSlice";
import avatar from '../../assets/man.png'

function Connections() {

  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.connectionsModal);
  const {connections} = useSelector((state) => state.connectionsModal);

  // connection Modal open or close
  function onClick() {
    dispatch(showConnections());
  }

  // view selected profile
  function viewProfile(profile){
    dispatch(setProfile(profile)) // set selected profile
    dispatch(showConnections()) // close connections modal
    dispatch(showModal()) // open profile modal
  }

  return (
    <React.Fragment>
      <Modal show={show} size="sm" position="bottom-left" onClose={onClick}>
        <Modal.Header>
          <h4 className="text-darkBlue font-bold">Connections.</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {connections.map((connection) => (
              <div
                key={connection._id}
                onClick={()=> viewProfile(connection)}
                className="flex px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex-shrink-0">
                  <img
                    className="rounded-full w-11 h-11"
                    src={connection?.profilePhoto || avatar}
                    alt="ProfilePhoto"
                  />
                </div>
                <div className="w-full pl-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {connection?.userName}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    <span className="text-gray-500 ">Country: {connection.location.country} ,</span> View Profile
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Connections;
