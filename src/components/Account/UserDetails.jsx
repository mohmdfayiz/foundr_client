import React, { useEffect, useState } from "react";
// import { Country, State, City } from "country-state-city";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const PersonalInfo = (props) => {
 
  const [ about, setAbout ] = useState("");
  const [ gender, setGender ] = useState("");
  const [ country, setCountry ] = useState("");
  const [ state, setState ] = useState("");
  const [ city, setCity ] = useState("");
  const [age, setAge] = useState("");
  const [changed, setChanged] = useState(false)

  useEffect(()=>{
    if(props){
      setAbout(props.about)
      setGender(props.gender)
      setAge(props.age)
      setCountry(props.location?.country)
      setState(props.location?.state)
      setCity(props.location?.city)
    }
  },[props])

  const updateUserDetails = async() => {
    try {
      const data = {
        about:about,
        gender:gender, 
        age:age, 
        country:country, 
        state:state,
        city:city
      }
      const token = localStorage.getItem('token')
      const {status} = await axios.post('/api/user/updateUserDetails', data, {headers:{Authorization: `Bearer ${token}`}})
      if(status === 201){toast.success("User details updated successfully")}
    } catch (error) {
      toast.error('Sorry, something went wrong!')
    }
  }

  return (
    <div className="md:col-span-7 p-5 col-span-12 shadow-md rounded-lg bg-white">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h3 className="font-bold text-lg text-darkBlue">User Details</h3>
      <form >
        <textarea
          className="border w-full p-3 mt-2"
          id="about"
          cols="30"
          value={about}
          placeholder="About your self..."
          onChange={(e)=> {
            setAbout( e.target.value )
            setChanged(true)
          }}
        />
        <div className="grid gap-2 grid-cols-6">

            <select 
              id="gender" 
              className="border p-1 h-10 col-span-3"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value)
                setChanged(true)
              }}
            >
              <option value="" className="text-gray-400">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">other</option>
            </select>
         
            <input
              className="border h-10 pl-2 col-span-3" 
              type="number" 
              placeholder="Age"
              id="age" 
              value={age} 
              onChange={(e) =>{ 
                setAge(e.target.value) 
                setChanged(true)
              }} 
            />
          
          <input
            className="border col-span-2 p-2 "
            placeholder="Country"
            type="text"
            name="country"
            value={country}
            onChange={(e)=>{ 
              setCountry(e.target.value)
              setChanged(true)
            }}
          />
          <input
            className="border col-span-2 p-2 "
            placeholder="State"
            type="text"
            name="state"
            value={state}
            onChange={(e)=>{
              setState(e.target.value)
              setChanged(true)
            }}
          />
          <input
            className="border col-span-2 p-2"
            placeholder="City"
            type="text"
            name="city"
            value={city}
            onChange={(e)=>{
              setCity(e.target.value)
              setChanged(true)
            }}
          />
          
        </div>
      </form>
      {changed && 
      <div className="flex justify-end mt-2">
        <button onClick={updateUserDetails} className="mx-2 border py-1 px-2  border-darkBlue text-darkBlue font-bold">
          Save
        </button>
        <button className="mx-2 border border-gray-500 py-1 px-2 text-gray-500 font-bold">
          Cancel
        </button>
      </div>}
    </div>
  );
};

export default PersonalInfo;