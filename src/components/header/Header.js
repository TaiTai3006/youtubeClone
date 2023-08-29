import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useSelector } from "react-redux";
const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const {user} = useSelector(state=> state.auth)
  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${input}`)
  }
  return (
    <div className="border border-dark header">
      <FaBars className="header_menu" size={26} onClick={handleToggleSidebar} />
      <img onClick={()=>{navigate('/')}}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
        alt=""
        className="header_logo"
      />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" value={input} onChange={e=> setInput(e.target.value)}/>
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <dic className="header_icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src={user?.photoURL}
          alt="Avatar"
        />
      </dic>
    </div>
  );
};

export default Header;
