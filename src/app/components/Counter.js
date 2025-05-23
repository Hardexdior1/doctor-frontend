import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when the component comes into view
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  return (
    <div
      ref={ref}
      className="px-5 bg-[#4977E5] px-20  rounded-lg text-white font-bold rounded grid grid-cols-2 gap-6 md:flex items-center justify-between  md:px-20 py-10">
      <div>
        <div className="flex gap-1 items-center">
          {inView && (
            <CountUp
              className="text-2xl md:text-4xl"
              start={0}
              end={500}
              duration={2}
              delay={0}
            />
          )}
          <span className="text-2xl md:text-4xl"> + </span>
        </div>
        <p className="font-semibold text-[#fff]">Projects done</p>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          {inView && (
            <CountUp
              className="text-2xl md:text-4xl"
              start={0}
              end={800}
              duration={2}
              delay={0}
            />
          )}
          <span className="text-2xl md:text-4xl"> + </span>
        </div>
        <p className="font-semibold text-[#fff]"> Happy Clients </p>
      </div>

      <div>
        <div className="flex gap-1 items-center">
          {inView && (
            <CountUp
              className="text-2xl md:text-4xl"
              start={0}
              end={18}
              duration={2}
              delay={0}
            />
          )}
          <span className="text-2xl md:text-4xl"> + </span>
        </div>
        <p className="font-semibold text-[#fff]">Award Winner </p>
      </div>

      <div>
        <div className="flex gap-1 items-center">
          {inView && (
            <CountUp
              className="text-2xl md:text-4xl"
              start={0}
              end={600}
              duration={2}
              delay={0}
            />
          )}
          <span className="text-2xl md:text-4xl"> + </span>
        </div>
        <p className="font-semibold text-[#fff]">Team Member </p>
      </div>

    </div>
  );
};

export default Counter;
