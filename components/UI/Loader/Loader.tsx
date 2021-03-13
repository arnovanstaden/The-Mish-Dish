export default function Loader() {

    const phrases = [
        "Adding some more salt...",
        "This needs more chilli...",
        "Spotify: Play Fleetwood",
        "This isn't yellow enough..."
    ]

    const loaderText = phrases[Math.floor(Math.random() * phrases.length)];

    return (
        <div className="loader">
            <img src="/images/loader.svg" alt="" />
            <h3>{loaderText}</h3>
        </div>
    )
}
