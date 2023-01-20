const EventCard = () =>{
    return(
        <div className="eventCard p-3 rounded shadow">
          <img
            className="coverImage"
            src="src\assets\pexels-igreja-dimensão-10401268.jpg"
            alt="coverImg"
          />
          <h2 className="font-bold text-darkBlue text-center my-1">Mentor</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              21 January, 10:00 AM
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
    )
}

export default EventCard