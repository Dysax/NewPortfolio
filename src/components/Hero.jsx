import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useState, useEffect} from "react";

import React from "react";

const useTypewriter = (text, duration = 500) => {
  const [typedText, setTypedText] = useState("");
  const [isCursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const delay = duration / text.length;
    const cursorTimer = setInterval(() => setCursorVisible(prev => !prev), 500);
  
    const type = () => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      }
    };

    const typingInterval = setInterval(type, delay);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorTimer);
    };
  }, [text, duration]);

  return [typedText, isCursorVisible];
};

const Hero = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [typedText, isCursorVisible] = useTypewriter(
    modelLoaded
      ? "I'm an indie maker and software developer working on projects that make life easier or a bit more fun."
      : ""
  );

  useEffect(() => {
    console.log('Model loaded:', modelLoaded);
  }, [modelLoaded]);

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      {/*background*/}
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          {/*purple ball*/}
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          {/*purple gradient line*/}
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          {/* Hi, I'm Luke*/}
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Luke</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          <span>{typedText}</span>
          <span className={isCursorVisible ? "cursor" : ""}>|</span>
        </p>
        </div>
      </div>

      <ComputersCanvas onModelLoaded={handleModelLoaded} />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about"></a>
      </div>
    </section>
  );
};

export default Hero;
