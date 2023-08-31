export const setupCards = () => {
    const cardWrapper = document.getElementById("cards") as HTMLDivElement;
    const cards = document.getElementById("cards")?.getElementsByClassName("card") as HTMLCollectionOf<HTMLAnchorElement>;

    const initialLoad = () => {
        cards[0].style.setProperty("--mouse-x", `left`);
        cards[0].style.setProperty("--mouse-y", `top`);
        cards[0].style.setProperty("--hover-opacity", "1");
    };

    cardWrapper.onmousemove = (e) => {
        for (const card of cards) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--hover-opacity", "0");
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    cardWrapper.onmouseleave = (e) => {
        setTimeout(() => {
            cards[0].style.setProperty("--mouse-x", `left`);
            cards[0].style.setProperty("--mouse-y", `top`);
            cards[0].style.setProperty("--hover-opacity", "1");
        }, 500);
    }; 
    initialLoad();
};