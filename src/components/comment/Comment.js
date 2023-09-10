import React from "react";
import moment from "moment";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import "./_comment.scss";
const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment p-2 d-flex align-items-start">
      <img src={authorProfileImageUrl} alt="" className="rounder-circle me-3" />
      <div className="comment_body">
        <p className="comment_header mb-1">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>

        <div className="comment_footer d-flex mt-1">
          <span className="mx-2">
            <MdThumbUp size={26} />{" "}
          </span>

          <span className="mx-2">
            <MdThumbDown size={26} />
          </span>

          <p className="comment_footer_reply p-1 rounded-5">Reply</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
