import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Sparkle from 'react-sparkle';
import axios from 'axios';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import Spinner from '../components/Spinner';

const Results = () => {
    const [loading, setLoading] = useState(true);
    const [backURL, setBackURL] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [hovered, setHovered] = useState(false);
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    const location = useLocation();
    const [posted, setPosted] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { state } = location;

    useEffect(() => {
        if (state !== null) {
            const { firstName, lastName, username, password, houseID } = state;
            console.log(state);
            setUserDetails({ firstName, lastName, username, password, houseID });
            if (houseID == 1) {
                setBackURL('./gHouse.jpg');
            } else if (houseID == 2) {
                setBackURL('./hHouse.jpg');
            } else if (houseID == 3) {
                setBackURL('./sHouse.jpg');
            } else if (houseID == 4) {
                setBackURL('./rHouse.jpg');
            }
            calculateResults();
        }
    }, [location]);

   

    const calculateResults = async () => {
        console.log("hello", state.houseID);
        try {
            const response = await axios.post('http://localhost:2000/register', {
                firstName: state.firstName,
                lastName: state.lastName,
                username: state.username,
                password: state.password,
                houseID: state.houseID,
            });
            setPosted(true);
        } catch (error) {
            console.log("HEHEHEH");
            console.error('Error posting data:', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1100);
    }, []);

    const toggleHover = (value) => {
        setHovered(value);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 p-20 overflow-y-auto"
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
            {loading && <Spinner />}
            {!loading && (
                <>
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
                                    fontSize: "5em",
                                    color: "#d1b202",
                                    textShadow: "15px 15px 13px #000000",
                                    textAlign: "center",
                                    marginBottom: 0,
                                    position: 'relative',
                                }}
                            >
                                <Glow
                                    radius={hovered ? 50 : 0}
                                    opacity={hovered ? 0.5 : 0}
                                    color="#fde74c"
                                >
                                    You're Sorted Into
                                    <h2
                                        style={{
                                            fontFamily: "Bluu Next",
                                            fontSize: '2.5em',
                                            color: "#d1b202",
                                            textShadow: "15px 15px 13px #000000",
                                            marginBottom: 0,
                                            textAlign: "center",
                                            position: 'relative',
                                        }}>
                                        {state && 
                                            state.houseID == 1 ? 'Gryffindor!' :
                                            state.houseID == 2 ? 'Hufflepuff!' :
                                            state.houseID == 3 ? 'Slytherin!' :
                                            state.houseID == 4 ? 'Ravenclaw!' :
                                            'Unknown'}
                                    </h2>
                                </Glow>
                            </h1>
                        </Glow>
                    </GlowCapture>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 540, paddingBottom: 70 }}>
                        <Link to={"/login"}>
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                            style={{
                                fontFamily: 'Sofia Sans Variable',
                                fontSize: '1.5em',
                                fontWeight: 800,
                                cursor: 'pointer',
                                borderRadius: "60px",
                                width: 430,
                                height: 75,
                                letterSpacing: '3px',
                                textShadow: "5px 5px 5px #000000",
                                alignItems: 'center',
                                position: 'relative',
                                animation: "glow 1.5s infinite",
                            }}
                            onMouseEnter={() => toggleHover(true)}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            Go Back To Login
                        </motion.button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
};

export default Results;