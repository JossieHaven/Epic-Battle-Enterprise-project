import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import heroBanner from "../assets/hero-banner.jpg";
import villainBanner from "../assets/villain-banner.jpg";
import styles from "./Home.module.css";

// authentication check to redirect accordingly
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("id_token");
  return Boolean(token && token !== "null" && token !== "");
};

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [buttonText, setButtonText] = useState<string>(isAuthenticated() ? "START" : "ENTER");

  useEffect(() => {
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    setButtonText(loggedIn ? "START" : "ENTER");
  }, []);

  const handleBattleClick = () => {
    navigate(isLoggedIn ? "/search" : "/login"); // one-liner nav logic {testing new waters and it worked :') ...}
  };

  return (
    <main className={styles.main}>
      {/* Superhero Themed Logo */}
      <div className={styles.logo}>
        <span className={styles.epic}>EPIC</span>
        <span className={styles.battle}>BATTLE</span>
        <span className={styles.enterprise}>ENTERPRISE</span>
      </div>

      <div className={styles.imageContainer}>
        {/* Hero Banner */}
        <div className={styles.banner}>
          <img src={heroBanner} alt="Heroes" className={styles.image} />
          <div className={styles.overlay}>
            <h2 className={styles.text}>Heroes</h2>
          </div>
        </div>

        {/* Villain Banner */}
        <div className={styles.banner}>
          <img src={villainBanner} alt="Villains" className={styles.image} />
          <div className={styles.overlay}>
            <h2 className={styles.text}>Villains</h2>
          </div>
        </div>
      </div>

      {/* Start Battle Button */}
      <StyledWrapper>
        <button onClick={handleBattleClick}>
          {buttonText} {/* Dynamically changes between "Enter" and "Battle" */}
          <div id="clip">
            <div id="leftTop" className="corner" />
            <div id="rightBottom" className="corner" />
            <div id="rightTop" className="corner" />
            <div id="leftBottom" className="corner" />
          </div>
          <span id="rightArrow" className="arrow" />
          <span id="leftArrow" className="arrow" />
        </button>
      </StyledWrapper>
    </main>
  );
};

// Styled Components for Animated Button
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  button {
      position: relative;
    width: 11em;
    height: 4em;
    outline: none;
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.7);
    border: 2px solid rgb(255,255,0);
    font-size: 35px;
    letter-spacing: 5px;
    font-weight: 900;
    color: rgb(255, 255, 0);
    text-shadow: -2px -2px 0px rgba(0, 0, 0, 0.9), 
      2px 2px 0px rgba(0, 0, 0, 0.9),  
      0px 0px 15px rgb(255, 255, 255), 
      0px 0px 25px rgba(4, 0, 255, 0.8); 
    cursor: pointer;
    box-shadow: 0 0 15px rgba(255, 255, 0, 0.8);
  }

  #clip {
    --color:rgb(22, 14, 172);
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 5px double var(--color);
    box-shadow: inset 0px 0px 15px #195480;
    -webkit-clip-path: polygon(
      30% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  .arrow {
    position: absolute;
    transition: 0.2s;
    background-color:rgb(255, 0, 0);
    top: 35%;
    width: 11%;
    height: 30%;
  }

  #leftArrow {
    left: -13.5%;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }

  #rightArrow {
    -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
    left: 110%;
  }

  button:hover #rightArrow {
    background-color: #27c39f;
    left: -15%;
    animation: 0.6s ease-in-out both infinite alternate rightArrow8;
  }

  button:hover #leftArrow {
    background-color: #27c39f;
    left: 110%;
    animation: 0.6s ease-in-out both infinite alternate leftArrow8;
  }

  .corner {
    position: absolute;
    width: 4em;
    height: 4em;
    background-color:rgb(255, 0, 0);
    box-shadow: inset 3px 3px 15px rgb(195, 39, 39);
    transform: scale(1) rotate(45deg);
    transition: 0.2s;
  }

  #rightTop {
    top: -1.98em;
    left: 91%;
  }

  #leftTop {
    top: -1.96em;
    left: -3em;
  }

  #leftBottom {
    top: 2.1em;
    left: -2.15em;
  }

  #rightBottom {
    top: 45%;
    left: 88%;
  }

  button:hover #leftTop {
    animation: 0.1s ease-in-out 0.05s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightTop {
    animation: 0.1s ease-in-out 0.15s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightBottom {
    animation: 0.1s ease-in-out 0.25s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #leftBottom {
    animation: 0.1s ease-in-out 0.35s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover .corner {
    transform: scale(1.25) rotate(45deg);
  }

  button:hover #clip {
    animation: 0.2s ease-in-out 0.55s both greenLight8;
    --color: #27c39f;
  }

  @keyframes changeColor8 {
    from {
      background-color:rgb(195, 39, 39);
    }
    to {
      background-color: #27c39f;
    }
  }

  @keyframes lightEffect8 {
    from {
      box-shadow: 1px 1px 5px #27c39f;
    }
    to {
      box-shadow: 0 0 2px #27c39f;
    }
  }

  @keyframes greenLight8 {
    from {
    }
    to {
      box-shadow: inset 0px 0px 32px #27c39f;
    }
  }

  @keyframes leftArrow8 {
    from {
      transform: translate(0px);
    }
    to {
      transform: translateX(10px);
    }
  }

  @keyframes rightArrow8 {
    from {
      transform: translate(0px);
    }
    to {
      transform: translateX(-10px);
    }
  }
`;

export default Home;
