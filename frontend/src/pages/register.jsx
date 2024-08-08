import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sparkle from 'react-sparkle';
import { useNavigate, Link } from 'react-router-dom';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import { motion } from "framer-motion";
import eyeOpen from '../assets/eye.png';
import eyeSlash from '../assets/eye-slash.png';
import Spinner from '../components/Spinner';

const Register = () => {
    const [loading, setLoading] = useState(true);
    const [backURL, setData] = useState("./greathall.png");
    const [hovered, setHovered] = useState(false);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pressed, setPressed] = useState(false);
    const [correctUsername, setCorrectUsername] = useState(false);
    const [correctPassword, setCorrectPassword] = useState(false);
    const [correctConfirmPassword, setCorrectConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

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

    const checkConfirmPassword = () => {
        if (confirmPassword === password && password != "" && confirmPassword != "") {
            setCorrectConfirmPassword(true);
        } else {
            setCorrectConfirmPassword(false);
        }
    };

    const handleRegister = () => {
        setPressed(true);
        setLoginError(false);
        if (!correctUsername || !correctPassword || !correctConfirmPassword || lastName === "" || firstName === "") {
            setLoading(false);
            return;
        }
        try {
            navigate('/quiz', { state: { firstName, lastName, username, password } });
        } catch (error) {
            console.error('Register error:', error);
            setLoginError(true);
        }
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1100);
    }, []);

    useEffect(() => {
        checkUsername();
    }, [username]);

    useEffect(() => {
        checkPassword();
        checkConfirmPassword();
    }, [password]);

    useEffect(() => {
        checkConfirmPassword();
    }, [confirmPassword]);

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
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflowX: 'hidden'
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
                                    marginBottom: 150,
                                    position: 'relative',
                                }}
                            >
                                <Glow
                                    radius={hovered ? 50 : 0}
                                    opacity={hovered ? 0.5 : 0}
                                    color="#fde74c"
                                >
                                    "I'll have a look inside your mind<br />
                                    and tell where you belong!"
                                    <h2
                                        style={{
                                            fontFamily: "Bluu Next",
                                            fontSize: 34,
                                            color: "#d1b202",
                                            textShadow: "15px 15px 13px #000000",
                                            marginBottom: 70,
                                            textAlign: "center",
                                            position: 'relative',
                                        }}>
                                        - The Sorting Hat, Harry Potter and the Goblet of Fire
                                    </h2>
                                    <h2
                                        style={{
                                            fontFamily: "Sofia Sans Variable",
                                            fontSize: '0.8em',
                                            fontWeight: 1000,
                                            letterSpacing: '2px',
                                            color: "#d1b202",
                                            textShadow: "15px 10px 10px #000000",
                                            textAlign: "center",
                                            position: 'absolute',
                                            top: '350px',
                                            left: '50%',
                                            transform: 'translateX(-50%) translateY(-50%)',
                                            whiteSpace: 'nowrap',
                                        }}>
                                        Tell Us About Yourself
                                    </h2>
                                </Glow>
                            </h1>
                        </Glow>
                    </GlowCapture>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 900 }}>
                        <form>
                            <label className="label-style" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="w-full h-full bg-gray-200 input-style"
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Harry"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            /><br /><br />
                            {(firstName == "") && pressed && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em', marginTop: -18 }}>
                                    Required!
                                </div>
                            )}
                            <label className="label-style" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="w-full h-full bg-gray-200 input-style"
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Potter"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            /><br /><br />
                            {(lastName == "") && pressed && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em', marginTop: -18 }}>
                                    Required!
                                </div>
                            )}
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
                            /><br /><br />
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
                       
                            <div className="relative">
                                <label className="label-style" htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    className="w-full h-full bg-gray-200 input-style mb-2 pr-10"
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
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
                            {!correctConfirmPassword && pressed && (
                                <div className="relative text-red-400" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.1em' }}>
                                    Passwords Do Not Match!
                                </div>
                            )}
                        </form>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 1630, paddingBottom: 70 }}>
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
                                handleRegister();
                            }}
                        >
                            Let The Sorting Now Begin!
                        </motion.button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', marginTop: 1690 }}>
                        <Link to="/login" className="text-gray-400 hover:text-gray-600" style={{ fontFamily: 'Sofia Sans Variable', fontWeight: 800, fontSize: '1.3em' }}>
                            Already Sorted? Login Here
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Register;