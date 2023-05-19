import { useContext, useState } from "react";
import { ImageContext } from "../App";
import Image from "./Image";
import Skeleton from "./Skeleton";

const Images = () => {
  const { response, isLoading } = useContext(ImageContext);
  const [likedImages, setLikedImages] = useState([]);
  const [filterLiked, setFilterLiked] = useState(false);

  const handleLike = (id) => {
    const index = likedImages.findIndex((image) => image.id === id);
    if (index === -1) {
      setLikedImages([...likedImages, { id, isLiked: true }]);
    } else {
      const newLikedImages = [...likedImages];
      newLikedImages.splice(index, 1);
      setLikedImages(newLikedImages);
    }
  };

  const filteredResponse = filterLiked
    ? response.filter((image) =>
        likedImages.some((likedImage) => likedImage.id === image.id && likedImage.isLiked)
      )
    : response;

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className={`${
            filterLiked ? "bg-gray-500 text-white" : "bg-white text-gray-500"
          } px-4 py-2 rounded-md border border-gray-500 mr-2`}
          onClick={() => setFilterLiked(!filterLiked)}
        >
          Filter Liked
        </button>
      </div>
      <h1 className="text-center mt-6 underline text-2xl">Photos</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <Skeleton item={10} />
        ) : (
          filteredResponse.map((data, key) => (
            <Image key={key} data={data} handleLike={handleLike} likedImages={likedImages} />
          ))
        )}
      </div>
    </>
  );
};

export default Images;
