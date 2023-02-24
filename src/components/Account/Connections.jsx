import React from "react";
import { Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { showConnections } from "../../features/modalDisplay/connectionSlice";
import { showModal, setProfile } from "../../features/modalDisplay/matchingProfileSlice";
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
    dispatch(setProfile(profile))
    dispatch(showConnections())
    dispatch(showModal())
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
                
              <a
                key={connection._id}
                href="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {console.log(connection)}
                <div className="flex-shrink-0">
                  <img
                    className="rounded-full w-11 h-11"
                    src={connection?.profilePhoto || avatar}
                    alt="ProfilePhoto"
                  />
                  {/* <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800"></div> */}
                </div>
                <div className="w-full pl-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {connection?.userName}
                    </span>
                  </div>
                  <div onClick={()=> viewProfile(connection)} className="text-xs text-blue-600 dark:text-blue-500">
                    <span className="text-gray-500 ">Country: {connection.location.country} ,</span> View Profile
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Connections;
