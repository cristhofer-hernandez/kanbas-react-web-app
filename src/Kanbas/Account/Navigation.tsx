import { Link, useParams, useLocation } from "react-router-dom";
export default function AccountNavigation() {
    const { pathname } = useLocation();
    const links = ["Signin", "Signup", "Profile"];

return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => (
            <Link key={`Kanbas/Account//${ link }`} to={ `${ link }` }
                  className={`
          ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
                {link}
            </Link>
        ))}
    </div>
);}


