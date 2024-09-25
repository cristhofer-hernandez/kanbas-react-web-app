import { Link } from "react-router-dom";
import AI from "../../public/images/AI.jpg";
import Algo from "../../public/images/Algo.jpeg";
import discrete from "../../public/images/discree.png";
import ML from "../../public/images/machine_learning.jpeg";
import NLP from "../../public/images/NLP.jpeg";
import OOD from "../../public/images/OOD.jpg";
import Webdev from "../../public/images/Webdev.jpeg";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <img src={discrete} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/Discrete/Home">
                            CS1800
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Discrete Structures
                        </p>
                        <Link to="/Kanbas/Courses/Discrete/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={OOD} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/OOD/Home">
                            CS3500
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Object Oriented Design
                        </p>
                        <Link to="/Kanbas/Courses/OOD/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={Algo} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/Algo/Home">
                            CS3000
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Algorithms & Data
                        </p>
                        <Link to="/Kanbas/Courses/Algo/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={AI} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/AI/Home">
                            CS4100
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Artificial Intelligence
                        </p>
                        <Link to="/Kanbas/Courses/AI/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={NLP} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/NLP/Home">
                            CS4120
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Natural Language Processing
                        </p>
                        <Link to="/Kanbas/Courses/NLP/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={ML} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/ML/Home">
                            DS4400
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Machine Learning & Data Mining I
                        </p>
                        <Link to="/Kanbas/Courses/ML/Home"> Go </Link>
                    </div>
                </div>

                <div className="wd-dashboard-course">
                    <img src={Webdev} width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kanbas/Courses/Webdev/Home">
                            CS4550
                        </Link>
                        <p className="wd-dashboard-course-title">
                            Web Development
                        </p>
                        <Link to="/Kanbas/Courses/Webdev/Home"> Go </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
