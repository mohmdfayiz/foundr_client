import { useDispatch } from "react-redux"
import { modalVisiblity  } from "../../features/modalDisplay/eventSlice"

const EventCard = (props) =>{
  const dispatch = useDispatch()
    return(
        <div className="eventCard p-3 rounded-md shadow-md ">
          <img
            className="coverImage"
            src={props.mentorImage}
            alt="coverImg"
          />
          <h2 className="font-bold text-darkBlue text-center my-1">{props.mentorName}</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              {props.dateAndTime}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={()=>dispatch(modalVisiblity())} className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
    )
}
export default EventCard