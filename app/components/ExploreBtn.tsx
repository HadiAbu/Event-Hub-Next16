"use client";
import Image from "next/image";

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("Explore button clicked");
  };

  return (
    <button
      id="explore-btn"
      type="button"
      className="mt-5 mx-auto"
      onClick={handleClick}
    >
      <a href="#events" className="">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="explore event"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;
