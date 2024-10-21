import { Link, useParams, useLocation } from "react-router-dom";
import northeastern_logo from "../../public/images/northeastern.svg";
export default function CoursesNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link key={`Kanbas/Courses/${ cid }/${ link }`} to={ `${ link }` }
                      className={`
              ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
                    {link}
                </Link>
            ))}
        </div>
    );}

