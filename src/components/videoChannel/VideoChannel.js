import React from "react";
import { Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./_videoChannel.scss";
import { useNavigate } from "react-router-dom";
const VideoChannel = ({ video }) => {
  const {
    snippet: { title, thumbnails, description, resourceId },
  } = video;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/channel/${resourceId?.channelId}`);
  };

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col xs={6} md={3} className="videoHorizontal_left py-2 text-center">
        <LazyLoadImage
          src={thumbnails.medium.url}
          style={{ borderRadius: "50%", maxWidth: "150px" }}
          effect="blur"
          className="videoHorizontal_thumbnail "
          wrapperClassName="videoHorizontal_thumbnail-wrapper"
        />
      </Col>
      <Col
        xs={6}
        md={9}
        className="videoHorizontal_right p-0 d-flex flex-column align-items-between justify-content-between"
      >
        <div className="my-1 videoHorizontal__channel d-flex align-items-center  ">
          <h5 className="fw-bold">{title}</h5>
        </div>
        <p className="mt-1 videoHorizontal__desc">{description}</p>
        <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
      </Col>
    </Row>
  );
};

export default VideoChannel;
