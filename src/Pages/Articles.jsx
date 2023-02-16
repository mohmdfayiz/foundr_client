import React,{useEffect,useState} from 'react'
import axios from 'axios'

export const Articles = () => {

    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        const getArticles = async () =>{
            const {status, data} = await axios.get('/api/user/getArticles')
            if(status === 200){
                setArticles(data.articles)
            }
        }
        getArticles()
    },[])

  return (
    <div>
        <div className='flex items-center m-[3rem]'>
            <img src="src\assets\Document.svg" width={32} alt="article_icon" />
            <h2 className='ml-px text-[#91AABA] text-3xl font-bold'>Articles</h2>
        </div>

        <div className='flex flex-wrap justify-evenly m-[3rem]'>
        {articles?.map((article)=> (
            <div className='articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative'>
                <img src={article.coverImage} alt="cover_img" className='coverImage'/>
                <h2 className='text-md font-bold text-darkBlue'>{article.title}</h2>
                <p className='text-xs text-lightBlue text-end absolute bottom-4 right-4'>{article.createdAt}</p>
            </div>
        ))}
        </div>
        
    </div>
  )
}
