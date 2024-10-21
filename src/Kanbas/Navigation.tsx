import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import northeastern_logo from "../public/images/northeastern.svg";
import "./styles.css"
/* NOTE: Selected (active) links NOT made to have a white background,
was declared not required by Jose on Piazza as doing this requires javaScript */

export default function KanbasNavigation() {
    const { pathname } = useLocation();
    const links = [
        { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
        { label: "Courses",   path: "/Kanbas/Dashboard", icon: LiaBookSolid },
        { label: "Calendar",  path: "/Kanbas/Calendar",  icon: IoCalendarOutline },
        { label: "Inbox",     path: "/Kanbas/Inbox",     icon: FaInbox },
        { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
    ];

    return (
        <div id="wd-kanbas-navigation" style={{ width: 105 }}
             className="list-group rounded-0 position-fixed bottom-0 top-0
             d-none d-md-block bg-black z-2">
            <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
               className="list-group-item bg-black border-0 text-center">
                <img id="wd-northeastern_logo" src={northeastern_logo} />
            </a><br/>
            <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
                <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                <br />
                Account
            </Link>
            {links.map((link) => (
                <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                    {link.icon({ className: "fs-1 text-danger"})}
                    <br />
                    {link.label}
                </Link>
                ))}
            </div>
        );
    }


{/*<Link to="/Kanbas/Account" id="wd-account-link"*/}
{/*      className="list-group-item text-center border-0 bg-black text-white">*/}
{/*    <FaRegCircleUser className="fs-1 text text-white" /><br />Account</Link><br/>*/}
{/*<Link to="/Kanbas/Dashboard" id="wd-dashboard-link"*/}
{/*      className="list-group-item text-center border-0*/}
{/*       bg-white text-danger">*/}
{/*    <AiOutlineDashboard className="fs-1 text-danger" /><br />*/}
{/*    Dashboard</Link><br/>*/}
{/*<Link to="/Kanbas/Courses" id="wd-course-link"*/}
{/*      className="list-group-item text-white*/}
{/*       bg-black text-center border-0">*/}
{/*    <LiaBookSolid className="fs-1 text-danger" /><br />*/}
{/*    Courses</Link><br/>*/}
{/*<Link to="/Kanbas/Calendar" id="wd-calendar-link"*/}
{/*      className="list-group-item text-white*/}
{/*       bg-black text-center border-0">*/}
{/*    <IoCalendarOutline className="fs-1 text-danger" /><br />*/}
{/*    Calendar</Link><br/>*/}
{/*<Link to="/Kanbas/Inbox" id="wd-inbox-link"*/}
{/*      className="list-group-item text-white*/}
{/*       bg-black text-center border-0">*/}
{/*    <FaInbox className="fs-1 text-danger" /><br />*/}
{/*    Inbox</Link><br/>*/}
{/*<Link to="/Labs" id="wd-labs-link"*/}
{/*      className="list-group-item text-white*/}
{/*       bg-black text-center border-0">*/}
{/*    <LiaCogSolid className="fs-1 text-danger" /><br />*/}
{/*    Labs</Link><br/>*/}
// </div>