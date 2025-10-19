import PropTypes from "prop-types";
import { useState } from "react";

export default function NewComplaintForm({ onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);   // send data to parent (GuideComplaints)
        setFormData({ title: "", category: "", description: "" });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">New Complaint</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Complaint Title"
                        className="border rounded-md p-2 text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="border rounded-md p-2 text-sm"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border rounded-md p-2 text-sm"
                        rows="4"
                        required
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm bg-gray-300 rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

NewComplaintForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
