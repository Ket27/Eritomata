import "../styling/Posting.css"
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaSignsPost } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Posting = () => {
    return (
        <div className="Posting-Container">
            Hey what's in your mind today?
            <div className="Posting-Type">
                <span ><Link to = "/dashboard/compose/question"><RxQuestionMarkCircled />Question</Link></span>
                <span ><Link to = "/dashboard/compose/post"><FaSignsPost />Post</Link></span>
            </div>
        </div>
    )
}

export default Posting;