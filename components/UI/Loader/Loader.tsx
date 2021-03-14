
export default function Loader() {


    const phrases = [
        "Adding some more salt...",
        "This needs more chilli...",
        "Spotify: Play Fleetwood",
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
