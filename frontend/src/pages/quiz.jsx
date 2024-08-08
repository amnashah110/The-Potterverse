import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Sparkle from 'react-sparkle';
import axios from 'axios';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import Spinner from '../components/Spinner';

const Quiz = () => {
    const [loading, setLoading] = useState(true);
    const [backURL] = useState("./greathall.png");
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({});
    const [intro, setIntro] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionLoaded, setQuestionLoaded] = useState(false);
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const [end, setEnd] = useState(false);
    const [options, setOptions] = useState([]);
    const [optionsLoaded, setOptionsLoaded] = useState(false);
    const [countG, setCountG] = useState(0);
    const [countS, setCountS] = useState(0);
    const [countR, setCountR] = useState(0);
    const [countH, setCountH] = useState(0);
    const [houseID, setHouseID] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const { state } = location;
        if (state !== null) {
            const { firstName, lastName, username, password } = state;
            setUserDetails({ firstName, lastName, username, password });
        }
        getQuestions();
        getOptions();
    }, [location]);

    useEffect(() => {
        console.log(questions);
        setQuestionLoaded(true);
    }, [questions]);

    useEffect(() => {
        console.log(options);
        setOptionsLoaded(true);
    }, [options]);

    useEffect(() => {
        if (houseID !== 0) {
            navigate('/results', { state: { firstName: userDetails.firstName, lastName: userDetails.lastName, username: userDetails.username, password: userDetails.password, houseID } });
        }
    }, [houseID, navigate, userDetails]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1100);
    }, []);

    const loadingDemand = () => {
        setIntro(true);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1100);
    }

    const handleResults = () => {
        if (countG > Math.max(countH, countR, countS)) {
            setHouseID(1);
        } else if (countH > Math.max(countG, countR, countS)) {
            setHouseID(2);
        } else if (countR > Math.max(countH, countG, countS)) {
            setHouseID(4);
        } else if (countS > Math.max(countH, countR, countG)) {
            setHouseID(3);
        }
        console.log(countG, countH, countR, countS);
    };

    const getOptions = async () => {
        try {
            const response = await axios.get('http://localhost:2000/register/options', {
                params: { question_id: indexOfQuestion + 1 } // Correct usage of params for query parameters
            });
            setOptions(response.data.options);
            setOptionsLoaded(true);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    }

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:2000/register');
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const incrementIndex = async () => {
        const newIndex = indexOfQuestion + 1;
        setIndexOfQuestion(newIndex);
        if (newIndex === 10) {
            setEnd(true);
        }
        try {
            const response = await axios.get('http://localhost:2000/register/options', {
                params: { question_id: newIndex + 1 } // Correct usage of params for query parameters
            });
            setOptions(response.data.options);
            setOptionsLoaded(true);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const incrementCount = (houseID) => {
        if (houseID === 1) {
            setCountG(countG + 1);
        } else if (houseID === 2) {
            setCountH(countH + 1);
        } else if (houseID === 3) {
            setCountS(countS + 1);
        } else if (houseID === 4) {
            setCountR(countR + 1);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 p-20 overflow-y-auto"
            style={{
                backgroundImage: `url(${backURL})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: 'hidden'
            }}
        >
            {loading ? (
                <Spinner />
            ) : (
                !intro ? (
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
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '50px',
                                marginLeft: '-60px',
                                marginTop: '80px'
                            }}
                        >
                            <img src={'./hat.gif'} style={{ width: '600px' }} alt="Sorting Hat" />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <GlowCapture>
                                    <Glow>
                                        <h1
                                            style={{
                                                fontFamily: "Bluu Next",
                                                fontSize: "2.58em",
                                                color: "#d1b202",
                                                textShadow: "15px 15px 13px #000000",
                                                marginBottom: 0,
                                                textAlign: "center"
                                            }}
                                        >
                                            "Oh, you may not think I'm pretty,<br />
                                            But don't judge on what you see,<br />
                                            I'll eat myself if you can find<br />
                                            A smarter hat than me"
                                        </h1>
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
                                                marginLeft: 110,
                                                marginTop: 50
                                            }}
                                            onClick={() => {
                                                loadingDemand();
                                            }}
                                        >
                                            Start The Sorting Quiz
                                        </motion.button>
                                    </Glow>
                                </GlowCapture>
                            </div>
                        </div>
                    </>
                ) : (
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
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '50px',
                                marginTop: '80px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <GlowCapture>
                                    <Glow>
                                        <h1
                                            className="floating-heading"
                                            style={{
                                                fontFamily: "Sofia Sans Variable",
                                                fontSize: "4em",
                                                fontWeight: 1000,
                                                letterSpacing: '2px',
                                                color: "#d1b202",
                                                textShadow: "15px 10px 10px #000000",
                                                marginBottom: '400px',
                                                textAlign: "center"
                                            }}
                                        >
                                            {questionLoaded && questions.length > 0 && questions[indexOfQuestion].question_heading}
                                        </h1>
                                    </Glow>
                                </GlowCapture>
                            </div>
                            <h1
                                style={{
                                    position: 'absolute',
                                    fontFamily: "Sofia Sans Variable",
                                    fontSize: '2.5em',
                                    fontWeight: 1000,
                                    letterSpacing: '2px',
                                    color: "#d1b202",
                                    textShadow: "15px 10px 10px #000000",
                                    marginRight: '170px',
                                    marginLeft: '170px',
                                    marginBottom: '30px',
                                    textAlign: "center",
                                }}
                            >
                                {questionLoaded && questions.length > 0 && questions[indexOfQuestion].question}
                            </h1>
                            <h1
                                style={{
                                    position: 'absolute',
                                    fontFamily: "Sofia Sans Variable",
                                    fontSize: '1.5em',
                                    fontWeight: 1000,
                                    letterSpacing: '2px',
                                    color: "#d1b202",
                                    textShadow: "15px 10px 10px #000000",
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    textAlign: "center",
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginBottom: '-300px'
                                }}
                            >
                                {optionsLoaded && options.length > 0 &&
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                                        {options.map((option, index) => (
                                            <motion.button
                                                key={index}
                                                whileTap={{ scale: 0.85 }}
                                                className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                                                style={{
                                                    fontFamily: 'Sofia Sans Variable',
                                                    fontSize: '1em',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    borderRadius: "60px",
                                                    letterSpacing: '3px',
                                                    textShadow: "5px 5px 5px #000000",
                                                    margin: '10px',
                                                    padding: '20px',
                                                    flexBasis: '-30px'
                                                }}
                                                onClick={() => {
                                                    if (indexOfQuestion === 9) {
                                                        handleResults();
                                                    } else {
                                                        incrementIndex();
                                                    }
                                                    incrementCount(option.house_id);
                                                }}

                                            >
                                                {option.options}
                                            </motion.button>
                                        ))}
                                    </div>
                                }
                            </h1>
                        </div>
                    </>
                )
            )}
        </div>
    )
};

export default Quiz;
