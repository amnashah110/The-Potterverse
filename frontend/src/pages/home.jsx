import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Sparkle from 'react-sparkle';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import { motion } from "framer-motion";
import { ReactSVG } from 'react-svg';
import Typist from 'typewriter-effect';
import lock from "../assets/lock.svg";
import unlock from "../assets/unlock.svg";

const Home = () => {
    const [backURL, setData] = useState("./home.jpg");
    const [hovered, setHovered] = useState(false);

    const toggleHover = (value) => {
        setHovered(value);
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 p-20 overflow-y-auto"
            style={{
                backgroundImage: `url(${backURL})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: 'hidden'
            }}
        >
            <Sparkle
                color="#ac9204"
                count={20}
                fadeOutSpeed={10}
                flicker={true}
                flickerSpeed="slowest"
                flickerAmount={0.025}
                minSize={10}
                maxSize={10}
                newSparkleOnFadeOut={true}
            />
            <GlowCapture>
                <Glow>
                    <h1
                        style={{
                            fontFamily: "Bluu Next",
                            fontSize: "9em",
                            color: "#d1b202",
                            textShadow: "15px 15px 13px #000000",
                            textAlign: "center",
                            marginBottom: 190,
                            position: 'relative',
                        }}
                    >
                        <Glow
                            radius={hovered ? 50 : 0}
                            opacity={hovered ? 0.5 : 0} 
                            color="#fde74c"
                        >
                            The Potterverse
                        </Glow>
                    </h1>
                </Glow>
            </GlowCapture>
            <h2
                style={{
                    fontFamily: "Sofia Sans Variable",
                    fontSize: "3em",
                    color: "#d1b202",
                    textShadow: "10px 10px 10px #000000",
                    textAlign: "center",
                    marginBottom: 70,
                    marginTop: -180,
                    position: 'relative',
                    letterSpacing: '4px',
                    fontWeight: 900
                }}
            >
                <Typist options={{autoStart: true, loop: true, strings: ["Discover your Hogwarts' House"], delay:100}}></Typist>
            </h2>
            <Link to="/login">
                <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                    style={{
                        fontFamily: 'Sofia Sans Variable',
                        fontSize: '2.5em',
                        fontWeight: 800,
                        cursor: 'pointer',
                        borderRadius: "60px",
                        width: 450,
                        height: 85,
                        letterSpacing: '3px',
                        textShadow: "5px 5px 5px #000000",
                        alignItems: 'center',
                        position: 'relative',
                        animation: "glow 1.5s infinite",
                    }}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                >
                    <ReactSVG
                        className="fill-current"
                        src={hovered ? unlock : lock}
                        style={{
                            width: "50px",
                            height: "50px",
                            marginRight: 270,
                            position: 'absolute'
                        }}
                    />
                    <span className="flex text-align-center" style={{ marginLeft: 60, marginTop: 5 }}>
                        Alohomora!
                    </span>
                </motion.button>
            </Link>
        </div>
    );
};

export default Home;
