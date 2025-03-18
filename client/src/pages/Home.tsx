import { Link } from "react-router-dom";
import styled from "styled-components";
import heroBanner from "../assets/hero-banner.jpg";
import villainBanner from "../assets/villain-banner.jpg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      {/* Flex container for images */}
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

      {/* Page Title */}
      <h1 className={styles.pageTitle}>Epic Battle Enterprise</h1>

      {/* Start Battle Button */}
      <Link to="/character-selection">
        <StyledWrapper>
          <button>
            B A T T L E
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
      </Link>
    </main>
  );
};

// ✅ Styled Components for Animated Button
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  button {
    position: relative;
    width: 11em;
    height: 4em;
    outline: none;
    transition: 0.1s;
    background-color: transparent;
    border: none;
    font-size: 13px;
    font-weight: bold;
    color: #ddebf0;
    cursor: pointer;
  }

  #clip {
    --color: #2761c3;
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
    background-color: #2761c3;
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
    background-color: #2761c3;
    box-shadow: inset 1px 1px 8px #2781c3;
    transform: scale(1) rotate(45deg);
    transition: 0.2s;
  }

  #rightTop {
    top: -1.98em;
    left: 91%;
  }

  #leftTop {
    top: -1.96em;
    left: -3.0em;
  }

  #leftBottom {
    top: 2.10em;
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
      background-color: #2781c3;
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
