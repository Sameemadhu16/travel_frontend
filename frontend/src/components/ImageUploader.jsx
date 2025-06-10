import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { validateImageUpload } from "../core/validation";

/**
 * @param {string} label - Label text displayed above the upload box.
 * @param {Array} images - Images array upload
 * @param {setArray} setImages - set array to uploaded images
 * @param {string} [error] - Optional error message displayed below the upload box.
 * @param {boolean} [multiple=false] - Whether multiple file uploads are allowed.
 * @returns {JSX.Element} ImageUploadComponent - A drag-and-drop image upload box with validation.
 */

const ImageUploader = ({
    label,
    images,
    setImages,
    error,
    setError = () => {},
    multiple = false,
}) => {
    const [uploading, setUploading] = useState(false);

    const handleFiles = async (files) => {
        const validationError = validateImageUpload(files, 5,);
        if (validationError) {
            setError(validationError);
            return;
        }
console.log(files)
        //check wether image length
        let uploadFiles = files;
        let errorMsg = '';

        if (multiple) {
            if (files.length < 5) {
                errorMsg = ('*You should add 5 images to verify');
            } else if (files.length > 5) {
                errorMsg = ('*You can upload a maximum of 5');
                // Only upload the first 5 images
                uploadFiles = files.slice(0, 5);
            } else {
                // Exactly 5 images, no error
                setError('');
            }
        }

        setError(errorMsg);
        setUploading(true);
        //const urls = [];
        // for (const file of files) {
        //     const uploadedUrl = await uploadToServer(file);
        //     if (uploadedUrl) {
        //         urls.push(uploadedUrl);
        //     }
        // }
        // Convert File objects to object URLs for preview
        const urls = files.map(file =>
            typeof file === "string" ? file : URL.createObjectURL(file)
        );
        setImages((prev) => [...prev, ...urls]);
        setUploading(false);
    };

    useEffect(() => {
    console.log("Current error:", error);
}, [error]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const removeImage = (id) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== id));
    };

    return (
        <div className="text-start">
            {label && (
                <label className="font-medium text-[16px]">
                    {label}
                </label>
            )}
            <div
                className={`
                    border-2 w-full py-6 px-4 rounded-md mt-2
                    flex flex-col items-center justify-center relative
                    cursor-pointer bg-fourthColor
                    border-dashed
                    focus-within:border-brand-primary
                    ${ error ? 'border-danger' : 'border-gray-300'}
                `}
                tabIndex={0}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="text-gray-500 flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4 4m0 0l4-4m-4 4V4m8 0h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"
                        />
                    </svg>
                    <p>
                        Drop your images here, or{" "}
                        <span className="underline text-brand-primary">browse</span>
                    </p>
                    <p className="text-sm text-gray-400">JPG, PNG, SVG (Max 5MB each)</p>
                </div>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    multiple={multiple}
                />

                {( error ) && (
                    <p className="text-danger text-[16px] font-medium mt-2">
                        { error }
                    </p>
                )}
            </div>

            {Array.isArray(images) && images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-32 h-32 border rounded-md overflow-hidden">
                            <img src={img} alt="Uploaded" className="h-full w-full object-fit" />
                            <button
                                type="button"
                                className="absolute top-1 right-1 bg-gray-100 
                                    text-gray-500 rounded-full h-5 w-5 p-1 text-xs"
                                onClick={() => removeImage(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {
                uploading && (
                    <></>
                )
            }
        </div>
    );
};

ImageUploader.propTypes = {
    label: PropTypes.string,
    images: PropTypes.array.isRequired,
    setImages: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func,
    multiple: PropTypes.bool,
};

export default ImageUploader;
