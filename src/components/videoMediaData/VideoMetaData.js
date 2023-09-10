import React, { useEffect, useState } from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from "moment";
import {
  MdThumbDown,
  MdThumbUp,
  MdThumbDownOffAlt,
  MdThumbUpOffAlt,
} from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
  subscribedChannel,
  unsubscribeChannel,
} from "../../redux/actions/channel.action";
import { changeRating, getRating } from "../../redux/actions/videos.action";
import { useNavigate } from "react-router-dom";
const VideoMediaData = ({
  video: { snippet, statistics },
  videoId,
  rating,
}) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();
  const [isHovered, setHovered] = useState(false);
  console.log(rating);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const {
    snippet: channelSnippet,
    statistics: channelStatistics,
    id,
  } = useSelector((state) => state.channelDetails.channel);

  const { idSubscribed } = useSelector((state) => state.channelDetails);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    dispatch(getRating(videoId));
  }, [dispatch, videoId]);

  const handleSubscribed = () => {
    subscriptionStatus
      ? dispatch(unsubscribeChannel(idSubscribed, id))
      : dispatch(subscribedChannel(id));
  };
  const handleLike = () => {
    if (rating === "like") {
      dispatch(changeRating(videoId, "none"));
    } else {
      dispatch(changeRating(videoId, "like"));
    }
  };

  const handleDislike = () => {
    if (rating === "dislike") {
      dispatch(changeRating(videoId, "none"));
    } else {
      dispatch(changeRating(videoId, "dislike"));
    }
  };

  const navigate = useNavigate();

  const handleClickChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData_top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              {rating === "like" ? (
                <MdThumbUp onClick={handleLike} size={26} />
              ) : (
                <MdThumbUpOffAlt onClick={handleLike} size={26} />
              )}{" "}
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-3">
              {rating === "dislike" ? (
                <MdThumbDown onClick={handleDislike} size={26} />
              ) : (
                <MdThumbDownOffAlt onClick={handleDislike} size={26} />
              )}{" "}
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData_channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            onClick={handleClickChannel}
            alt=""
            className="rounder-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span onClick={handleClickChannel}>{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && "btn-gray"}`}
          onClick={handleSubscribed}
        >
          {subscriptionStatus
            ? isHovered
              ? "Unsubscribe"
              : "Subscribed"
            : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData_description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMediaData;
