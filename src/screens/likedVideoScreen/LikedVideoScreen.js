import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLikedVideos } from '../../redux/actions/videos.action'
import { Container } from 'react-bootstrap'
import VideoHoziontal from '../../components/videoHorizontal/VideoHoziontal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
const LikedVideoScreen = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLikedVideos())
    },[dispatch])
    const {videos, loading} = useSelector(state=>state.likedVideos)
  return (
    <Container>

    {
        !loading ? (
            videos.map(video=><VideoHoziontal video={video} key={video.id} searchedVideo/>)
        ) : <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width='100%' height='160px' count={20}/>
        </SkeletonTheme>
    }
   </Container>
  )
}

export default LikedVideoScreen
