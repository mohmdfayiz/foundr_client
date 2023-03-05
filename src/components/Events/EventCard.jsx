import { useDispatch } from "react-redux";
import { modalVisiblity, setEvent } from "../../app/slices/eventSlice";
import calendar from '../../assets/schedule.png'
import dateFormat from "dateformat";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    dispatch(setEvent(event))
    dispatch(modalVisiblity())
  }
  return (
    <div className="eventCard p-3 rounded-md shadow-md ">
      <img className="coverImage" src={event.mentorImage} alt="coverImg" />
      <h2 className="font-bold text-darkBlue text-center my-1">
        {event.mentorName}
      </h2>
      <div className="flex justify-center items-center">
        <img src={calendar} alt="Calender" width={20} />
        <p className="text-xs text-gray-400 text-center ml-1">
          {dateFormat(event.dateAndTime, "dddd, mmmm d")}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => handleClick(event)}
          className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};
export default EventCard;
