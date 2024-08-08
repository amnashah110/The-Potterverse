import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Sparkle from 'react-sparkle';
import { GlowCapture, Glow } from '@codaworks/react-glow';
import { motion } from "framer-motion";
import Spinner from '../components/Spinner';
import { useInView } from 'react-intersection-observer';

const UserPage = () => {
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({});
    const [backURL, setBackURL] = useState("");
    const [hovered, setHovered] = useState(false);
    const [imageHovered, setImageHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [characters, setCharacters] = useState([]);
    const [traits, setTraits] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState("");
    const [loading, setLoading] = useState(true);
    const [founderImage, setFounderImage] = useState("");
    const [traitName, setTraitName] = useState([]);
    const [currentTrait, setCurrentTrait] = useState("");
    const [direction, setDirection] = useState(1); // 1 for next, -1 for previous
    const [colour, setColour] = useState("");
    const [glowType, setGlowType] = useState("");
    const [traitIndex, setTraitIndex] = useState(0);

    const { ref: founderRef, inView: founderInView } = useInView({ triggerOnce: true, threshold: 0.0001 });

    useEffect(() => {
        const { state } = location;
        if (state !== null) {
            const { firstName, lastName, gender, house, quote, houseID, founder, founder_description } = state;
            setUserDetails({ firstName, lastName, gender, house, quote, houseID, founder, founder_description });
            setFounderImage(`./${founder.split(' ')[0].toLowerCase()}.gif`);
            if (house === "Gryffindor") {
                setBackURL("./gryffindor.jpg");
                setColour("rgba(172, 2, 2, 0.7)");
                setGlowType("glowG");
            } else if (house === "Slytherin") {
                setBackURL("./slytherin.jpg");
                setColour("rgba(20, 78, 2, 0.7)");
                setGlowType("glowS");
            } else if (house === "Ravenclaw") {
                setBackURL("./ravenclaw.jpg");
                setColour("rgba(2, 32, 78, 0.7)");
                setGlowType("glowR");
            } else if (house === "Hufflepuff") {
                setBackURL("./hufflepuff.jpg");
                setColour("rgba(131, 111, 1, 0.7)");
                setGlowType("glowH");
            }
            getCharacters(houseID);
        }
    }, [location]);

    const getCharacters = async (houseID) => {
        try {
            const response = await axios.post('http://localhost:2000/userpage', { house_id: houseID });
            setCharacters(response.data.characters);
            setTraits(response.data.traits);
            setCurrentCharacter(response.data.characters[0]);
            setCurrentTrait(response.data.traits[0]);
            if (response.data.characters.length > 0) {
                setCurrentCharacter(response.data.characters[0]);
                setCurrentImage(`./${response.data.characters[0].name.split(' ')[0].toLowerCase()}.png`);
            }
            if (response.data.traits.length > 0) {
                setCurrentTrait(response.data.traits[0]);
                const imageSequence = response.data.traits.map(trait => `./${trait.trait.split(' ')[0].toLowerCase()}.gif`);
                setTraits(imageSequence);
                setTraitName(response.data.traits);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    };

    useEffect(() => {
        setTimeout(() => {
                setLoading(false);
            }, 1100);
    }, []);


    const toggleHover = (value) => {
        setHovered(value);
    };

    const imageToggleHover = (value) => {
        setImageHovered(value);
    };

    const incrementIndex = () => {
        if (traitIndex != 3) {
            var indexToSet = traitIndex + 1;
            setTraitIndex(indexToSet);
        } else {
            setTraitIndex(0);
        }
    }

    const decrementIndex = () => {
        if (traitIndex != 0) {
            var indexToSet = traitIndex - 1;
            setTraitIndex(indexToSet);
        } else {
            setTraitIndex(3);
        }
    }

    const handleNextImage = () => {
        // Define your image sequence or array
        const imageSequence = characters.map(character => `./${character.name.split(' ')[0].toLowerCase()}.png`);

        // Find the index of the current image
        const currentIndex = imageSequence.indexOf(currentImage);

        // Calculate the next index with wrapping around
        const nextIndex = (currentIndex + 1) % imageSequence.length;

        // Update the current image state
        setCurrentImage(imageSequence[nextIndex]);
        setCurrentCharacter(characters[nextIndex]);
        setDirection(1);
    };

    const handlePreviousImage = () => {
        const imageSequence = characters.map(character => `./${character.name.split(' ')[0].toLowerCase()}.png`);
        const currentIndex = imageSequence.indexOf(currentImage);
        const previousIndex = (currentIndex - 1 + imageSequence.length) % imageSequence.length;
        setCurrentImage(imageSequence[previousIndex]);
        setCurrentCharacter(characters[previousIndex]);
        setDirection(-1);
    };

    return (
        <div>
            <Link to={'/login'}
                className="fixed text-white border-b-8 border-opacity-80 opacity-80 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                style={{
                    fontFamily: 'Sofia Sans Variable',
                    fontSize: '1.8em',
                    fontWeight: 700,
                    cursor: 'pointer',
                    borderRadius: "60px",
                    width: 300,
                    backgroundColor: `${colour}`,
                    borderColor: `${colour}`,
                    height: 50,
                    letterSpacing: '3px',
                    textShadow: "5px 5px 5px #000000",
                    alignItems: 'right',
                    position: 'relative',
                    zIndex: 6,
                    marginLeft: 1000,
                    marginTop: 30,
                }}
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
            >
                Logout
            </Link>
            <div
                className="fixed top-0 left-0 right-0 bottom-0 p-20 overflow-y-auto"
                style={{
                    backgroundImage: `url(${backURL})`,
                    backgroundPosition: "center",
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    overflowX: 'hidden',
                    paddingBottom: 50,
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
                                        fontSize: "5.5em",
                                        color: "#d1b202",
                                        textShadow: "15px 15px 13px #000000",
                                        textAlign: "center",
                                        marginBottom: -150,
                                        position: 'relative',
                                    }}
                                >
                                    <Glow
                                        radius={hovered ? 50 : 0}
                                        opacity={hovered ? 0.5 : 0}
                                        color="#fde74c"
                                    >
                                        Yer A Wizard, {userDetails.firstName} {userDetails.lastName}!
                                        <h2
                                            style={{
                                                fontFamily: "Sofia Sans Variable",
                                                fontSize: 34,
                                                fontWeight: 800,
                                                letterSpacing: '2px',
                                                color: "#d1b202",
                                                textShadow: "15px 10px 10px #000000",
                                                textAlign: "center",
                                                position: 'relative',
                                                whiteSpace: 'nowrap'
                                            }}>
                                            "{userDetails.quote}"
                                        </h2>
                                    </Glow>
                                </h1>
                                <h2
                                    style={{
                                        fontFamily: "Sofia Sans Variable",
                                        fontSize: '3.5em',
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
                                    Meet Your House Mates
                                </h2>
                            </Glow>
                        </GlowCapture>
                        <div>
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, x: (direction == 1) ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: (direction == 1) ? -100 : 100 }}
                                transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
                                className="each-slide-effect"
                                style={{ position: 'absolute', top: '550px', right: '60%', zIndex: 2 }}
                            >
                                <div style={{ paddingBottom: '60px' }}>
                                    <img
                                        src={currentImage}
                                        alt={currentCharacter.name}
                                        style={{
                                            width: '450px',
                                            height: '300px',
                                            transition: 'transform 0.2s ease-in-out',
                                            transform: imageHovered ? 'scale(1.03)' : 'scale(1)',
                                            border: '3px solid #d1b202',
                                            borderRadius: '20px',
                                            padding: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            animation: "glow 1.5s infinite",
                                        }}
                                        onMouseEnter={() => imageToggleHover(true)}
                                        onMouseLeave={() => imageToggleHover(false)}
                                    />
                                </div>
                            </motion.div>
                            <div style={{ marginTop: 650, marginLeft: 615, zIndex: 3 }}>
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                                    style={{
                                        fontFamily: 'Sofia Sans Variable',
                                        fontSize: '1.8em',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        borderRadius: "60px",
                                        width: 200,
                                        height: 70,
                                        letterSpacing: '3px',
                                        textShadow: "5px 5px 5px #000000",
                                        alignItems: 'right',
                                        position: 'relative',
                                        animation: "glow 1.5s infinite",
                                        marginRight: 100,
                                        zIndex: 6
                                    }}
                                    onMouseEnter={() => toggleHover(true)}
                                    onMouseLeave={() => toggleHover(false)}
                                    onClick={handlePreviousImage}
                                >
                                    Previous
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                                    style={{
                                        fontFamily: 'Sofia Sans Variable',
                                        fontSize: '1.8em',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        borderRadius: "60px",
                                        width: 200,
                                        height: 70,
                                        letterSpacing: '3px',
                                        textShadow: "5px 5px 5px #000000",
                                        alignItems: 'right',
                                        position: 'relative',
                                        animation: "glow 1.5s infinite",
                                        zIndex: 6
                                    }}
                                    onMouseEnter={() => toggleHover(true)}
                                    onMouseLeave={() => toggleHover(false)}
                                    onClick={handleNextImage}
                                >
                                    Next
                                </motion.button>
                            </div>
                            <div style={{
                                position: 'relative',
                                top: '-13%', right: '-0%',
                                transform: 'translateY(-50%)',
                                textAlign: 'right',
                                paddingRight: '10%',
                                paddingBottom: 180,
                                paddingTop: 40,
                                borderRadius: '20px',
                                padding: '10px',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                width: 1250,
                                height: 340,
                                zIndex: 1
                            }}>
                                <h2
                                    style={{
                                        fontFamily: "Sofia Sans Variable",
                                        fontSize: '3.5em',
                                        fontWeight: 1000,
                                        letterSpacing: '2px',
                                        color: "#d1b202",
                                        textShadow: "15px 10px 10px #000000",
                                        textAlign: "center",
                                        whiteSpace: 'nowrap',
                                        marginLeft: 470,
                                        marginTop: 30
                                    }}
                                >
                                    {currentCharacter.name}
                                </h2>
                                <h2
                                    style={{
                                        fontFamily: "Sofia Sans Variable",
                                        fontSize: '2em',
                                        fontWeight: 1000,
                                        letterSpacing: '2px',
                                        color: "#d1b202",
                                        textShadow: "15px 10px 10px #000000",
                                        textAlign: "center",
                                        whiteSpace: 'nowrap',
                                        marginLeft: 470
                                    }}
                                >
                                    {currentCharacter.description}
                                </h2>
                            </div>

                        </div>
                        <h2
                            style={{
                                fontFamily: "Sofia Sans Variable",
                                fontSize: '3.5em',
                                fontWeight: 1000,
                                letterSpacing: '2px',
                                color: "#d1b202",
                                textShadow: "15px 10px 10px #000000",
                                textAlign: "center",
                                position: 'absolute',
                                top: '970px',
                                left: '25%',
                                whiteSpace: 'nowrap',
                            }}>

                            The Founder of {userDetails.house}
                        </h2>

                        <div style={{ position: 'absolute', top: '1085px', left: '60%', zIndex: 2 }}>
                            <div style={{ paddingBottom: '300px' }}>
                                <section ref={founderRef} className={`mt-8 glassy-div flex flex-col md:flex-row transition-opacity duration-1000 ${founderInView ? 'opacity-100' : 'opacity-0'}`}>
                                    <img
                                        src={founderImage}
                                        alt="Harry Potter"
                                        style={{
                                            width: '450px',
                                            height: '300px',
                                            transition: 'transform 0.2s ease-in-out', // Add smooth transition
                                            transform: imageHovered ? 'scale(1.03)' : 'scale(1)', // Scale effect on hover
                                            border: `3px solid ${colour}`,
                                            borderRadius: '20px',
                                            padding: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            animation: `${glowType} 1.5s infinite`,
                                        }}
                                        onMouseEnter={() => imageToggleHover(true)}
                                        onMouseLeave={() => imageToggleHover(false)}
                                    />
                                </section>
                            </div>
                        </div>
                        <div style={{
                            position: 'relative',
                            top: '13%', right: '-0%',
                            transform: 'translateY(-42%)',
                            textAlign: 'right',
                            paddingRight: '10%',
                            paddingBottom: 180,
                            paddingTop: 40,
                            borderRadius: '20px',
                            padding: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: 1250,
                            height: 340,
                            zIndex: 1
                        }}>
                            <h2
                                style={{
                                    fontFamily: "Sofia Sans Variable",
                                    fontSize: '3.5em',
                                    fontWeight: 1000,
                                    letterSpacing: '2px',
                                    color: "#d1b202",
                                    textShadow: "15px 10px 10px #000000",
                                    textAlign: "center",
                                    whiteSpace: 'nowrap',
                                    marginRight: 470,
                                    marginTop: 30,
                                    paddingRight: 30
                                }}
                            >
                                {userDetails.founder}
                            </h2>
                            <h2
                                style={{
                                    fontFamily: "Sofia Sans Variable",
                                    fontSize: '2em',
                                    fontWeight: 1000,
                                    letterSpacing: '2px',
                                    color: "#d1b202",
                                    textShadow: "15px 10px 10px #000000",
                                    textAlign: "center",
                                    marginRight: 470,
                                    paddingRight: 40,
                                    paddingTop: 20,
                                    paddingBottom: 50
                                }}
                            >
                                {userDetails.founder_description}
                            </h2>
                        </div>
                        <h2
                            style={{
                                fontFamily: "Sofia Sans Variable",
                                fontSize: '3.5em',
                                fontWeight: 1000,
                                letterSpacing: '2px',
                                color: "#d1b202",
                                textShadow: "15px 10px 10px #000000",
                                textAlign: "center",
                                position: 'absolute',
                                top: '1550px',
                                left: '50%',
                                transform: 'translateX(-50%) translateY(-50%)',
                                whiteSpace: 'nowrap',
                            }}>
                            Traits of the Students of {userDetails.house}
                        </h2>
                        <div className="flex h-screen w-full flex justify-center items-center" style={{ justifyContent: 'space-around' }}>
                            <img src={`./${traits[0]}`} className="bg-red-500 rounded-full" style={{ marginTop: 130, height: 220, width: 220, border: '3px solid #d1b202', animation: `glow 1.5s infinite`, filter: traitIndex != 0 ? 'brightness(0.2)' : 'brightness(0.8)', transform: traitIndex == 0 ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }} />
                            <img src={`./${traits[1]}`} className="bg-red-500 rounded-full" style={{ marginTop: 130, height: 220, width: 220, border: '3px solid #d1b202', animation: `glow 1.5s infinite`, filter: traitIndex != 1 ? 'brightness(0.2)' : 'brightness(0.8)', transform: traitIndex == 1 ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }} />
                            <img src={`./${traits[2]}`} className="bg-red-500 rounded-full" style={{ marginTop: 130, height: 220, width: 220, border: '3px solid #d1b202', animation: `glow 1.5s infinite`, filter: traitIndex != 2 ? 'brightness(0.2)' : 'brightness(0.8)', transform: traitIndex == 2 ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }} />
                            <img src={`./${traits[3]}`} className="bg-red-500 rounded-full" style={{ marginTop: 130, height: 220, width: 220, border: '3px solid #d1b202', animation: `glow 1.5s infinite`, filter: traitIndex != 3 ? 'brightness(0.2)' : 'brightness(0.8)', transform: traitIndex == 3 ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }} />
                            {traitName.length > 0 && (
                                <h2
                                    style={{
                                        fontFamily: "Sofia Sans Variable",
                                        fontSize: '3.5em',
                                        fontWeight: 1000,
                                        letterSpacing: '2px',
                                        color: "#d1b202",
                                        textShadow: "15px 10px 10px #000000",
                                        textAlign: "center",
                                        position: 'absolute',
                                        whiteSpace: 'nowrap',
                                        marginTop: 500
                                    }}>
                                    {traitName[traitIndex].trait}
                                </h2>
                            )}
                        </div>
                        <div style={{ marginTop: 140, zIndex: 3 }}>
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                                style={{
                                    fontFamily: 'Sofia Sans Variable',
                                    fontSize: '1.8em',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    borderRadius: "60px",
                                    width: 200,
                                    height: 70,
                                    letterSpacing: '3px',
                                    textShadow: "5px 5px 5px #000000",
                                    alignItems: 'right',
                                    position: 'relative',
                                    animation: "glow 1.5s infinite",
                                    marginRight: 100,
                                    zIndex: 6
                                }}
                                onMouseEnter={() => toggleHover(true)}
                                onMouseLeave={() => toggleHover(false)}
                                onClick={decrementIndex}
                            >
                                Previous
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.85 }}
                                className="text-white bg-gradient-to-tr from-orange-900 to-orange-400 border-b-8 border-opacity-80 opacity-80 border-orange-800 hover:border-opacity-100 hover:opacity-100 transition duration-100 inline-flex items-center justify-center flex"
                                style={{
                                    fontFamily: 'Sofia Sans Variable',
                                    fontSize: '1.8em',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    borderRadius: "60px",
                                    width: 200,
                                    height: 70,
                                    letterSpacing: '3px',
                                    textShadow: "5px 5px 5px #000000",
                                    alignItems: 'right',
                                    position: 'relative',
                                    animation: "glow 1.5s infinite",
                                    zIndex: 6
                                }}
                                onMouseEnter={() => toggleHover(true)}
                                onMouseLeave={() => toggleHover(false)}
                                onClick={incrementIndex}
                            >
                                Next
                            </motion.button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserPage;
