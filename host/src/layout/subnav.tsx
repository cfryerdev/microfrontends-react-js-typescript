import { NavLink } from "react-router-dom";

export default function Page() {
    return (
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
                <NavLink className="nav-link" to="/">Root</NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink className="nav-link" to="/sample/123456">Sample</NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink className="nav-link" to="/example">Example</NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink className="nav-link" to="/notfound">404</NavLink>
            </li>
            <li className="nav-item" role="presentation">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
        </ul>
    )
}
