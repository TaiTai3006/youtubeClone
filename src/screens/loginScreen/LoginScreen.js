import React, { useEffect } from 'react'
import './_loginScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {login} from '../../redux/actions/auth.action'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state=>state.auth.accessToken)
  const handleLogin = ()=>{
    dispatch(login())
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(accessToken){
      navigate('/');
    }
  },[accessToken, navigate])
  return (
    <div className="login">
        <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png" alt="" />
            <button onClick={handleLogin}>Login with Google</button>
            <p>A Youtube clone project made using Youtube-API</p>
        </div>
    </div>
  )
}

export default LoginScreen
