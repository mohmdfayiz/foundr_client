import React from 'react'

export const Articles = () => {
  return (
    <div>
        <div className='flex items-center m-[3rem]'>
            <img src="src\assets\Document.svg" width={32} alt="article_icon" />
            <h2 className='ml-px text-[#91AABA] text-3xl font-bold'>Articles</h2>
        </div>

        <div className='flex flex-wrap justify-evenly m-[3rem]'>
            <div className='articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative'>
                <img src="src\assets\pexels-fauxels-3183197.jpg" alt="cover_img" className='coverImage'/>
                <h2 className='text-md font-bold text-darkBlue'>Should you start a startup?</h2>
                <p className='text-xs text-lightBlue text-end absolute bottom-4 right-4'>10-01-2023</p>
            </div>
            <div className='articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative'>
                <img src="src\assets\pexels-pixabay-264507.jpg" alt="cover_img" className='coverImage'/>
                <h2 className='text-md font-bold text-darkBlue'>Why You Should Leave Your FAANG Job.</h2>
                <p className='text-xs text-lightBlue text-end absolute bottom-4 right-4'>11-01-2023</p>
            </div>
            <div className='articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative'>
                <img src="src\assets\pexels-pixabay-259132.jpg" alt="cover_img" className='coverImage'/>
                <h2 className='text-md font-bold text-darkBlue'>Why to Not Not Start a Startup</h2>
                <p className='text-xs text-lightBlue text-end absolute bottom-4 right-4'>12-01-2023</p>
            </div>
           
            <div className='articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative'>
                <img src="src\assets\pexels-fauxels-3184292.jpg" alt="cover_img" className='coverImage'/>
                <h2 className='text-md font-bold text-darkBlue'>Before starting a startup</h2>
                <p className='text-xs text-lightBlue text-end absolute bottom-4 right-4'>13-01-2023</p>
            </div>
        </div>
        
    </div>
  )
}
