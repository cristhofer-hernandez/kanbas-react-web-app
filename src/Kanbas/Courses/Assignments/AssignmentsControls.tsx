import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
// import GreenCheckmark from "./GreenCheckmark";
export default function AssignmentsControls() {
    return (
        <div id="wd-assignments-controls-buttons" className="text-nowrap float-end d-inline-flex align-items-center">

            <form className="form-inline input-group my-2 my-lg-0 me-5 mt-1 d-inline-flex justify-content-start">
                <span id="wd-search-icon" className="input-group-text">
                    <CiSearch />
                </span>
                <input className="form-control mr-sm-2" type="search"
                       placeholder="Search..." aria-label="Search" style={{ height: "50px" }}/>
            </form>

            <div id="wd-assignments-controls-buttons" className="ms-auto text-nowrap">
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment</button>

                <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group</button>
            </div>
        </div>
    );}
