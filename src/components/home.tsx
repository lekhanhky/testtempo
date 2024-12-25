import React, { useState } from "react";
import CardStack from "./CardStack";
import SwipeControls from "./SwipeControls";

interface CardItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

interface HomeProps {
  initialCards?: CardItem[];
}

const defaultCards: CardItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    title: "Sarah Parker",
    description: "Photography enthusiast and nature lover",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    title: "Michael Johnson",
    description: "Adventure seeker and mountain climber",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    title: "Emma Wilson",
    description: "Coffee lover and book enthusiast",
  },
];

const Home = ({ initialCards = defaultCards }: HomeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right", cardId: string) => {
    setCurrentIndex((prev) => Math.min(prev + 1, initialCards.length));
  };

  const handleLike = () => {
    if (currentIndex < initialCards.length) {
      handleSwipe("right", initialCards[currentIndex].id);
    }
  };

  const handleDislike = () => {
    if (currentIndex < initialCards.length) {
      handleSwipe("left", initialCards[currentIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full flex flex-col">
        <CardStack cards={initialCards} onSwipe={handleSwipe} />
        <SwipeControls
          onLike={handleLike}
          onDislike={handleDislike}
          currentIndex={currentIndex}
          totalCards={initialCards.length}
        />
      </div>
    </div>
  );
};

export default Home;
