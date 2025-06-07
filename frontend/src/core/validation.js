export const validateImageUpload  = (files , limit , maxTotalSizeMB, multiple)  => {

    let error = '';
    const validExtensions = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const invalidFiles = files.filter(file => !validExtensions.includes(file.type));
    const totalSizeMB = files.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

    if (!files || files.length === 0) {
        error = '*You must upload at least one image';
    }
    if (files.length !== 5 && multiple) {
        error = '*You should add 5 images to verify';
    }
    if (files.length > limit) {
        error = `*You can upload a maximum of ${limit} ${limit === 1 ? 'image':'images'}`;
    }
    if (invalidFiles.length > 0) {
        error =  '*Only JPG, PNG, and SVG files are allowed';
    }
    if (totalSizeMB > maxTotalSizeMB) {
        error =  `*Total file size must not exceed ${maxTotalSizeMB} MB`;
    }

    return error;
}