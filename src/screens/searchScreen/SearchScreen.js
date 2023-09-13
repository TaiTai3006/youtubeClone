import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHoziontal from "../../components/videoHorizontal/VideoHoziontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Helmet } from "react-helmet";
const SearchScreen = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <Container>
      <Helmet>
        <title>{query}</title>
      </Helmet>

      {!loading ? (
        videos.map((video) => (
          <VideoHoziontal video={video} key={video.id} searchedVideo />
        ))
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
