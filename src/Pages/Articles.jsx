import React, { useEffect, useState } from "react";
import axios from "axios";
import articleIcon from "../assets/Document.svg";
import ArticleCard from "../components/Articles/ArticleCard";

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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center m-[2rem]">
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
          : articles.map((article, index) => (
              <ArticleCard key={index} article={article}/>
            ))}
      </div>
    </div>
  );
};
