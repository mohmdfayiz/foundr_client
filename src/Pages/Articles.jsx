import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import articleIcon from "../assets/Document.svg";
import dateFormat from "dateformat";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const times = Array.from({ length: 4 });

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/user/getArticles");
      if (data) {
        setLoading(false);
        setArticles(data.articles);
      }
    };
    getArticles();
  }, []);

  const navigate= useNavigate()
  function redirect(article){
    navigate(`/article/${article._id}`, {state:{article}})
  }

  return (
    <div>
      <div className="flex items-center m-[3rem]">
        <img src={articleIcon} width={32} alt="article_icon" />
        <h2 className="ml-px text-[#91AABA] text-3xl font-bold">Articles</h2>
      </div>

      <div className="flex flex-wrap justify-center m-[3rem]">
        {loading
          ? times.map((item, index) => (
              <div
                key={index}
                className="border border-blue-300 shadow eventCard p-3 rounded-md "
              >
                <div className="animate-pulse flex flex-col">
                  <div className="bg-slate-700 h-[180px] w-full"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-5 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : articles.map((article) => (
              <div className="articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative">
                <img
                  src={article.coverImage}
                  alt="cover_img"
                  className="coverImage"
                />
                <h2 onClick={ ()=> redirect(article)} className="text-md font-bold text-darkBlue cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-xs text-lightBlue text-end absolute bottom-4 right-4">
                  {dateFormat(article.createdAt,"mediumDate")}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};
