import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './_videoChannel.scss'
import { useNavigate } from 'react-router-dom';
const VideoChannel = ({video}) => {
    const {snippet:{title, thumbnails, description,resourceId}} = video
    const navigate = useNavigate()
    const handleClick = () => {
      navigate(`/channel/${resourceId?.channelId}`)
   }
    
  return (
    <Row className="videoHorizontal m-1 py-2 align-align-items-center" onClick={handleClick}>
    <Col xs={6} md={4} className="videoHorizontal_left">
      <LazyLoadImage
        src={thumbnails.medium.url}
        style={{borderRadius: '50%'}}
        effect="blur"
        className="videoHorizontal_thumbnail "
        wrapperClassName="videoHorizontal_thumbnail-wrapper"
      />
      {/* <span className="video_top_duration">{_duration}</span> */}
    </Col>
    <Col xs={6} md={8} className="videoHorizontal_right p-0">
      {/* <p className="videoHorizontal_title mb-1">
        {title}
      </p> */}
      {/* <div className="videoHorizontal_details">
     
          <AiFillEye /> {numeral(views).format("0.a")} Views •
       
          {moment(publishedAt).fromNow()}
      </div> */}
     {/* {searchedVideo ? <p className="mt-1">{description}</p> : ''} */}
     
     <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
      {/* <LazyLoadImage
        src="https://www.svgrepo.com/download/5125/avatar.svg"
        effect="blur"
        
      /> */}
       {/* <LazyLoadImage src="https://www.svgrepo.com/download/5125/avatar.svg" effect="blur"/> */}
      <p>{title}</p>
      
      </div>
      <p className='mt-1 videoHorizontal__desc'>{description}</p>
      <p className='mt-2'>
                  {video.contentDetails.totalItemCount} Videos
               </p>
    </Col>
  </Row>
);

}

export default VideoChannel
