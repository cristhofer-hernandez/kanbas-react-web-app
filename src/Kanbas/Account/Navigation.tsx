import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const AllLinks = currentUser ? ["Profile", "Users"] : ["Signin", "Signup"];
    const [ links, setLinks ] = useState(AllLinks);
    const { pathname } = useLocation();
    const userPageForFacultyOnly = () => {
        if (currentUser && currentUser.role != "ADMIN")  {
            const newLinks = links.filter((link) => link != "Users")
            setLinks(newLinks);
        }
    }

    useEffect(() => {
        userPageForFacultyOnly();
    }, []);

return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 ">
        {currentUser && links.map((link) => (
            <Link key={`Kanbas/Account//${ link }`} to={ `${ link }` }
                  className={`
          ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
                {link}
            </Link>
        ))}
    </div>
);}


