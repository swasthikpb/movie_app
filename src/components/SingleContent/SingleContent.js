import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import Dialog from '../ContentModal/ContentModal'
const SingleContent = ({

  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <Dialog media_type={media_type} id={id}>
    <div className="media">
        <Badge badgeContent= {vote_average} color={vote_average>6?'primary':'secondary'}/>
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movies"}
         <span className="sunTitle">{date}</span>
      </span>
    </div>
    </Dialog>
  );
};

export default SingleContent;
