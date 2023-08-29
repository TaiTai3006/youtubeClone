import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../redux/actions/comments.action";
const Comments = ({videoId, totalComments}) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCommentsOfVideoById(videoId))
  },[videoId, dispatch])

  const comments = useSelector(state=> state.commentList.comments)

  const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet)

  const [text, setText] = useState('')
  const handleCommnet = (e) => {
    e.preventDefault()
    if(text.length === 0) return
    dispatch(addComment(videoId, text))
    setText('')
  };
  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments_form d-flex w-100 my-2">
        <img
          src="https://www.svgrepo.com/download/5125/avatar.svg"
          alt=""
          className="rounder-circle mr-3"
        />
        <form onSubmit={handleCommnet} className="d-flex flex-grow-1">
          <input
            type="text"
            placeholder="Write a comment ..."
            className="flex-grow-1"
            value={text}
            onChange={e=>setText(e.target.value)}
          />
          <button className="border-0 p-2" >Comment</button>
        </form>
      </div>
      <div className="comments_list">
        {
          _comments?.map((comment, i)=>(
            <Comment comment={comment} key={i}/>
          ))
        }
      </div>
    </div>
  );
};

export default Comments;
