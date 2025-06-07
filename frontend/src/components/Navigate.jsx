import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// PropTypes style reference: see InputField.jsx for detailed prop documentation

export default function Navigate({path,children}) {

    return (
        <Link to={path}>
            {children}
        </Link>
    )
}

Navigate.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
