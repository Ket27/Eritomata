import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaSignsPost } from "react-icons/fa6";
import { useState } from "react";
import "../styling/Contents.css";
import PostContent from "./PostContent";
import QuestionContent from "./QuestionContent";

const Contents = () => {
    const [activeTab, setActiveTab] = useState("Posts");

    const handleClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className="contents-container">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === "Posts" ? "active" : ""}`}
                    onClick={() => handleClick("Posts")}
                >
                    <FaSignsPost /> Posts
                </button>
                <button
                    className={`tab ${activeTab === "Questions" ? "active" : ""}`}
                    onClick={() => handleClick("Questions")}
                >
                    <RxQuestionMarkCircled /> Questions
                </button>
            </div>
            <div className="line"></div>
            <div className="tab-content">
                {activeTab === "Posts" && <div><PostContent /></div>}
                {activeTab === "Questions" && <div><QuestionContent /></div>}
            </div>
        </div>
    );
}

export default Contents;