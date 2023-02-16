import React, { useEffect, useState } from "react";
import converToBase64 from "../../helper/convert";
import avatar from '../../assets/man.png'
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileCard = (props) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [connections, setConnections] = useState('')
  const [file, setFile] = useState("");
  const token = localStorage.getItem('token');

  useEffect(()=>{
    setProfilePhoto(props?.profilePhoto)
    setUserName(props.userName)
    setEmail(props.email)
    setConnections(props.connections)
  },[props,file])

  const onUpload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]).then(async(file)=>{
      setFile(file)
      await axios.post('/api/user/profilePhoto',{file}, {headers:{Authorization: `Bearer ${token}`}})
    })
  };

  return (
    <div className="flex flex-col py-5 justify-center items-center md:col-span-5 col-span-12 rounded-lg shadow-md bg-white leading-none relative z-0">

      <div >
        <label htmlFor="profile-photo" className="cursor-pointer">
          <img src={ file || profilePhoto || avatar} alt="avatar" className='h-24 w-24 object-cover rounded-full'/>
        </label>
        <input type="file" id="profile-photo" className="hidden" onChange={onUpload}/>
      </div>

      <h2 className="text-xl font-bold text-darkBlue mt-2">{userName}</h2>
      <p className="text-gray-500 m-2">{email}</p>
      <div className="flex">
        <button className="border bg-darkBlue text-white font-semibold px-4 py-3 m-2 rounded-md">
          {connections?.length} Connection
        </button>
        <Link
          to={"/messages"}
          className="border bg-darkBlue text-white font-semibold px-4 py-3 m-2 rounded-md"
        >
          Messages
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
