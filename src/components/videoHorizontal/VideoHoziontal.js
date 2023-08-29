import React from "react";
import "./_videoHoziontal.scss";
import { AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col } from "react-bootstrap";
const VideoHoziontal = ({video, searchedVideo}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      description,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)
  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')
  const _videoID = id?.videoId || id

  useEffect(()=>{
    const get_video_details = async()=>{
      const{
        data: {items},

      } = await request('/videos',{
        params:{
          part: 'contentDetails, statistics',
          id: _videoID
        }
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    get_video_details()
  },[_videoID])

  useEffect(()=>{
    const get_channel_icon = async()=>{
      const{
        data: {items},

      } = await request('/channels',{
        params:{
          part: 'snippet',
          id: channelId
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon()
  },[channelId])

  const navigate = useNavigate()

  const handleVideoClick = ()=>{
    navigate(`/watch/${_videoID}`)
  }


  return (
    <Row className="videoHorizontal m-1 py-2 align-align-items-center" onClick={handleVideoClick}>
      <Col xs={6} md={searchedVideo? 4: 6} className="videoHorizontal_left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHorizontal_thumbnail"
          wrapperClassName="videoHorizontal_thumbnail-wrapper"
        />
        <span className="video_top_duration">{_duration}</span>
      </Col>
      <Col xs={6} md={searchedVideo? 8: 6} className="videoHorizontal_right p-0">
        <p className="videoHorizontal_title mb-1">
          {title}
        </p>
        <div className="videoHorizontal_details">
       
            <AiFillEye /> {numeral(views).format("0.a")} Views •
         
            {moment(publishedAt).fromNow()}
        </div>
       {searchedVideo ? <p className="mt-1">{description}</p> : ''}
        <div className="videoHorizontal_channel d-flex align-items-center my-1">
        {/* <LazyLoadImage
          src="https://www.svgrepo.com/download/5125/avatar.svg"
          effect="blur"
          
        /> */}
         <LazyLoadImage src={channelIcon?.url} effect="blur"/>
        <p>{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHoziontal;
