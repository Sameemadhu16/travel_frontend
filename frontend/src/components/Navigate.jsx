import { Link } from "react-router-dom";

export default function Navigate({path,children}) {

    return (
        <Link to={path}>
            {children}
        </Link>
    )
}
