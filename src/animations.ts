const anim = {
    old: {
        name: "slideOutToTop",
        duration: "0.2s",
        easing: "linear",
        fillMode: "forwards",
    },
    new: {
        name: "slideInFromTop",
        duration: "0.3s",
        easing: "linear",
        fillMode: "backwards",
    },
};

export const slidePageToTop = {
    forwards: anim,
    backwards: anim,
};

export default {};