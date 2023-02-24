import React from "react";
import { useLocation } from "react-router-dom";

function Article() {

    const location = useLocation();
    const article = location.state?.article;

  return (
    <div>
      <div className="m-[3rem] border rounded-lg flex flex-col gap-4 bg-white">
        <div>
          <img
            src={article.coverImage}
            alt="coverImage"
            className="w-full h-[250px] object-cover"
          />
        </div>
        <div className="px-5 flex justify-between">
          <h2 className="text-2xl text-darkBlue font-bold">
            {article.title}
          </h2>
            <p className="text-gray-500">{article.createdAt}</p>
        </div>
        <div className="px-5 pb-8">
          <div className="text-gray-600" dangerouslySetInnerHTML={{__html: article.content}} />
        </div>
      </div>
    </div>
  );
}

export default Article;