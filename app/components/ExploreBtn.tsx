import Image from "next/image";

("use client");

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("Explore button clicked");
  };
  return (
    <button onClick={handleClick}>
      Explore
      <a href="#events" className="mt-5">
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
