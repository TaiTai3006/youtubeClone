import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./_subscriptionsScreen.scss";
import { getSubscribedChannels } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import VideoChannel from "../../components/videoChannel/VideoChannel";
import { Helmet } from "react-helmet";

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);
  const { loading, videos } = useSelector(
    (state) => state.subscriptionsChanneL
  );
  return (
    <Container fluid>
      <Helmet>
        <title>YouTube</title>
      </Helmet>
      {!loading ? (
        videos?.map((video) => <VideoChannel video={video} key={video.id} />)
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="120px" count={15} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
