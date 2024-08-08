import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Sparkle from 'react-sparkle';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import eyeOpen from '../assets/eye.png';
import eyeSlash from '../assets/eye-slash.png';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
    const [backURL, setData] = useState("./home.jpg");
    const [hovered, setHovered] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [correctUsername, setCorrectUsername] = useState(false);
    const [correctPassword, setCorrectPassword] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setPressed(true);
        setLoginError(false);
        if (!correctUsername || !correctPassword) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post('http://localhost:2000/login', { username, password });
            const { data } = response;
            const firstName = data.first_name;
            const lastName = data.last_name;
            const gender = data.gender;
            const house = data.house;
            const quote = data.quote;
            const houseID = data.house_id;
            const founder = data.founder;
            const founder_description = data.founder_description;
            navigate('/userpage', { state: { firstName, lastName, gender, house, quote, houseID, founder, founder_description } });
        } catch (error) {
            console.error('Login error:', error);
            setLoginError(true);
        }
    };

    const toggleHover = (value) => {
        setHovered(value);
    };

    useEffect(() => {
        setTimeout(() => {
                setLoading(false);
            }, 500);
    }, []);

    const usernamePattern = /^[a-zA-Z]+_[a-zA-Z]+$/;

    const checkUsername = () => {
        if (username === "" || !usernamePattern.test(username)) {
            setCorrectUsername(false);
        } else {
            setCorrectUsername(true);
        }
    };

    const checkPassword = () => {
        if (password === "") {
            setCorrectPassword(false);
        } else {
            setCorrectPassword(true);
        }
    };

    useEffect(() => {
        checkUsername();
    }, [username]);

    useEffect(() => {
        checkPassword();
    }, [password]);

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
                                    fontSize: "4em",
                                    color: "#d1b202",
                                    textShadow: "15px 15px 13px #000000",
                                    textAlign: "center",
                                    marginBottom: 300,
                                    position: 'relative',
                                }}
                            >
                                <Glow
                                    radius={hovered ? 50 : 0}
                                    opacity={hovered ? 0.5 : 0}
                                    color="#fde74c"
                                >
                                    "I'm Hermione Granger, and you are?"
                                    <h2
                                        style={{
                                            fontFamily: "Bluu Next",
                                            fontSize: 34,
                                            color: "#d1b202",
                                            textShadow: "15px 15px 13px #000000",
                                            marginBottom: 70,
                                            textAlign: "right",
                                            position: 'relative',
                                        }}>
                                        - Harry Potter and the Philosopher's Stone
                                    </h2>
                                </Glow>
                            </h1>
                        </Glow>
                    </GlowCapture>

                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 70 }}>
                        <form>
                            <label className="label-style" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="w-full h-full bg-gray-200 input-style"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="roonil_wazlib"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br /><br />
                            {!correctUsername && pressed && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em', marginTop: -18 }}>
                                    Incorrect Username!
                                </div>
                            )}
                            <div className="relative">
                                <label className="label-style" htmlFor="password">Password</label>
                                <input
                                    className="w-full h-full bg-gray-200 input-style mb-2 pr-10"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute right-0 bottom-0" style={{ bottom: '-25px', zIndex: 10 }}>
                                    <Link to="/forgot-password" className="text-gray-400 hover:text-gray-600" style={{
                                        fontFamily: 'Sofia Sans Variable',
                                        fontWeight: 800,
                                        fontSize: '1.1em',
                                    }}>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <img
                                        src={showPassword ? eyeSlash : eyeOpen}
                                        alt="Show/Hide Password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        width="26"
                                        height="26"
                                        style={{ marginTop: 35 }}
                                    />
                                </div>
                            </div>
                            {!correctPassword && pressed && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em' }}>
                                    Required!
                                </div>
                            )}
                            {loginError && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em' }}>
                                    Incorrect Username or Password!
                                </div>
                            )}
                        </form>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 420 }}>
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
                            onClick={() => {
                                setPressed(true);
                                handleLogin();
                            }}
                        >
                            Head to Platform 9 <p className="diagonal-fractions" style={{ fontSize: '1.2em' }}> 3/4! </p>
                        </motion.button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 550 }}>
                        <Link to="/register" className="text-gray-400 hover:text-gray-600" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.3em' }}>
                            Haven't got a letter yet?
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
