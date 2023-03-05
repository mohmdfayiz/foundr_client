import React from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

function ArticleCard({ article }) {

  const navigate = useNavigate();
  function redirect(article) {
    navigate(`/article/${article._id}`, { state: { article } });
  }

  return (
    <div className="articleCard p-4 bg-white rounded-lg shadow-lg m-2 relative">
      <img src={article.coverImage} alt="cover_img" className="coverImage" />
      <h2
        onClick={() => redirect(article)}
        className="text-md font-bold text-darkBlue cursor-pointer"
      >
        {article.title}
      </h2>
      <p className="text-xs text-lightBlue text-end absolute bottom-4 right-4">
        {dateFormat(article.createdAt, "mediumDate")}
      </p>
    </div>
  );
}

export default ArticleCard;
