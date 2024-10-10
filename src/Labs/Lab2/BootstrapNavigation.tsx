import pomeranians from "../../public/images/stacked.jpg";

export default function BootstrapNavigation() {
    return(
        <div>
            <div id="wd-css-navigating-with-tabs">
                <h2>Tabs</h2>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>

            <div id="wd-css-navigating-with-cards">
                <h2>
                    Cards
                </h2>
                <div className="card"
                     style={{ width: "18rem" }}>
                    <img src={pomeranians}
                         className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">
                            Cute Dogs
                        </h5>
                        <p className="card-text">
                            Science says that looking at these dogs will put a smile on your face!
                        </p>
                        <a href="#" className="btn btn-primary">
                            Boldly Go
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}