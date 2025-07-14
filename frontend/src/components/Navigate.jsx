import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// PropTypes style reference: see InputField.jsx for detailed prop documentation

export default function Navigate({path,children,className=''}) {

    return (
        <Link to={path} className={className}>
            {children}
        </Link>
    )
}

Navigate.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
};
