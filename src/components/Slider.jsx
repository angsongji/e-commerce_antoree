import React, { useEffect, useState, useRef } from "react";
import wavesOpacity from "../assets/wavesOpacity.svg";
import adventureMap from "../assets/adventureMap.svg";
import helloMan from "../assets/helloMan.svg";
import wavesNegative from "../assets/wavesNegative.svg";
const slides = [
  {
    id: 1,
    title: "Vô số khóa học",
    desc: "Hàng trăm khóa học đang chờ bạn khám phá!",
    cta: "Xem ngay",
    shapedivider: <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="white" fill-rule="evenodd" viewBox="0 0 2000 57"><path d="M2000 56.475H0v-50l9.502 3.421a45.758 45.758 0 0030.996 0L50 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L100 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L150 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L200 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L250 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L300 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L350 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L400 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L450 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L500 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L550 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L600 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L650 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L700 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L750 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L800 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L850 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L900 6.475l9.502 3.421a45.758 45.758 0 0030.996 0L950 6.476l8.007-3.204a45.759 45.759 0 0133.986 0L1000 6.475s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203s4.4 1.583 9.5 3.421a45.769 45.769 0 0031 0c5.1-1.838 9.5-3.42 9.5-3.42l8.01-3.204a45.743 45.743 0 0133.98 0l8.01 3.203v50z"/></svg>,
    illustration: adventureMap,
    background: "bg-gradient-to-b from-slate-200 to-slate-500",
  },
  {
    id: 2,
    title: "Học mọi lúc, mọi nơi",
    desc: "Trải nghiệm học tập linh hoạt trên mọi thiết bị.",
    cta: "Bắt đầu học",
    shapedivider: <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill" fill="#FFFFFF" fill-opacity="1"/></svg>,
     illustration: helloMan,
    background: "bg-gradient-to-b from-[##FFE4B5] to-[#C48252]",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => setCurrent(index);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const Slide = ({ title, cta, desc, index, current, shapedivider, illustration, background, rotate }) => {
    const isActive = index === current;
    return (
          <div
            className={` relative slide ${
              isActive ? "active" : ""
            } ${background}`}
          >
            <div className=" shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute top-1/6 left-1/10 rounded-md p-8 w-fit h-fit flex flex-col gap-3 justify-start  bg-white ">
              <div className="text-3xl font-bold  text-left text-[var(--dark-gray)]">
                {title}
              </div>
              <div className="text-left text-[var(--medium-gray)]">{desc}</div>
              <button className=" text-sm border-1 border-[var(--orange)] w-fit tracking-wider px-2 py-1  text-[var(--orange)] rounded-md hover:bg-[var(--orange)] hover:text-white transition-colors duration-500 cursor-pointer">
                {cta}
              </button>
            </div>
            <div className={`absolute bottom-[-1px] left-0 w-full h-auto`}>
            {shapedivider}
              </div>
            <img
              src={illustration}
              alt="Adventure Map"
              className="absolute bottom-0 right-10 w-1/3 h-auto "
            />
          </div>
        );
  };

  return (
    <div
      className="slider  relative w-full h-full "
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={() => {
        intervalRef.current = setInterval(nextSlide, 5000);
      }}
    >
      <div className="slides w-full h-full text-center">
        {slides.map((s, index) => (
          <Slide key={s.id} {...s} index={index} current={current} />
        ))}
      </div>

      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="dots absolute left-1/2 bottom-5 transform -translate-x-1/2 flex gap-5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

// (
//           <div
//             key={s.id}
//             className={`slide ${index === current ? "active" : ""}`}
//           >
//             <h2>{s.title}</h2>
//             <p>{s.desc}</p>
//           </div>
//         )
