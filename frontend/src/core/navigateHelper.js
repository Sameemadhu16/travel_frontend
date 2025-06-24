let navigate;

export const setNavigator = (navInstance) => {
    navigate = navInstance;
};

export const navigateTo = (path) => {
    if (navigate) {
        navigate(path);
    } else {
        console.error("Navigator not set. Call setNavigator(navigate) first.");
    }
};
