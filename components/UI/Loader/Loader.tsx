import { useState, useEffect } from "react"

export default function Loader() {
    const [loaderText, setloaderText] = useState("undefined")


    const phrases = [
        "Adding some more salt...",
        "This needs more chilli...",
        "Spotify: Play Fleetwood",
        "There's nothing like a crunchy salad",
    ]

    function chooseRandom(): string {
        return phrases[Math.floor(Math.random() * phrases.length)];
    }


    useEffect(() => {
        setloaderText(chooseRandom())
    })


    return (
        <div className="loader">
            <img src="/images/loader.svg" alt="" />
            <h3>{loaderText ? loaderText : null}</h3>
        </div>
    )
}
