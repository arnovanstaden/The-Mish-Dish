
export default function Loader() {


    const phrases = [
        "Adding some more salt...",
        "Adding some fresh chilli...",
        "Spotify: Play Fleetwood Mac",
        "Pouring another glass of wine...",
    ]

    function chooseRandom(): string {
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return (
        <div className="loader">
            <img src="/images/loader.svg" alt="" />
            <h3>{chooseRandom()}</h3>
        </div>
    )
}
