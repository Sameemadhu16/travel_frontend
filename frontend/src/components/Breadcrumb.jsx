import { FaChevronRight } from "react-icons/fa6";
import Navigate from "./Navigate";
import PropTypes from "prop-types";


export default function Breadcrumb({ items }) {
    return (
        <nav className="flex items-center text-sm text-brand-primary space-x-1">
            {items && items.map((item, index) => (
                <div className="flex items-center" key={index}>
                {index > 0 && <FaChevronRight size={16} className="mx-1 text-gray-400" />}
                {item.path ? (
                    <Navigate
                        path={item.path}
                        className="hover:underline"
                    >
                        {item.label}
                    </Navigate>
                ) : (
                    <span className="text-gray-700 hover:underline">{item.label}</span>
                )}
                </div>
            ))}
        </nav>
    );
}

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string,
        })
    ).isRequired,
};
