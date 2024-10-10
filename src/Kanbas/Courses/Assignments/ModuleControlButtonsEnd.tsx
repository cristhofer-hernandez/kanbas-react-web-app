import { FaEllipsisVertical } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <BsPlus className="fs-4 me-3" />
            <FaEllipsisVertical className="fs-4" />
        </div>
    );}
