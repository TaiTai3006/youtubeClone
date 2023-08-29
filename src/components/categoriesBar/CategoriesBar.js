import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
const keyword = [
  "All",
  "React js",
  "Java",
  "JavaScript",
  "C++",
  "C#",
  "Ruby",
  "Swift",
  "Go",
  "PHP",
  "TypeScript",
  "Kotlin",
  "Rust",
  "MATLAB",
  "R",
  "Perl",
  "Lua",
  "Dart",
  "Scala",
  "Objective-C",
  "Haskell",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");
  console.log(activeElement);
  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else dispatch(getVideosByCategory(value));
  };
  return (
    <div className="categoriesBar">
      {keyword.map((value, key) => (
        <span
          onClick={() => handleClick(value)}
          className={activeElement === value ? "active" : ""}
          key={key}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
