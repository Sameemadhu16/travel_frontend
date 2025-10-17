let navigate;

export const setNavigator = (navInstance) => {
    navigate = navInstance;
};

export const navigateTo = (path) => {
    if (navigate) {
        navigate(path);
        // Scroll to top after navigation
        window.scrollTo(0, 0);
    } else {
        console.error("Navigator not set. Call setNavigator(navigate) first.");
    }
};
