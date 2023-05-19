import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const Image = ({ data, handleLike, likedImages }) => {
  const [isLiked, setIsLiked] = useState(
    likedImages.some((likedImage) => likedImage.id === data.id && likedImage.isLiked)
  );

  const handleClick = (event) => {
    event.preventDefault();
    setIsLiked(!isLiked);
    handleLike(data.id);
  };

  return (
    <div className="relative">
      <img
        className="h-72 w-full object-cover rounded-lg shadow-md images"
        src={data.urls.small}
        alt={data.alt_description}
      />
      <button
        className={`${isLiked ? "text-red-500" : ""} absolute top-2 right-2`}
        onClick={handleClick}
      >
        <AiOutlineHeart size={32} />
      </button>
    </div>
  );
};

export default Image;
