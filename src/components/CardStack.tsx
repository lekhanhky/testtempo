import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

interface CardItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards?: CardItem[];
  onSwipe?: (direction: "left" | "right", cardId: string) => void;
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

const CardStack: React.FC<CardStackProps> = ({
  cards = defaultCards,
  onSwipe = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const currentCard = cards[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setDirection(direction);
    onSwipe(direction, currentCard.id);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
      setDirection(null);
    }, 300);
  };

  return (
    <div className="relative w-full h-[520px] bg-gray-100 flex items-center justify-center">
      <AnimatePresence>
        {currentIndex < cards.length && (
          <motion.div
            key={currentCard.id}
            initial={{ scale: 1 }}
            animate={{
              scale: 1,
              x: direction === "left" ? -200 : direction === "right" ? 200 : 0,
              rotate:
                direction === "left" ? -30 : direction === "right" ? 30 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-[300px]"
          >
            <Card className="overflow-hidden">
              <div className="relative h-[400px]">
                <img
                  src={currentCard.imageUrl}
                  alt={currentCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <h3 className="text-xl font-bold">{currentCard.title}</h3>
                  <p className="text-sm">{currentCard.description}</p>
                </div>
              </div>
              <div className="p-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleSwipe("left")}
                  className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <button
                  onClick={() => handleSwipe("right")}
                  className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <Heart size={24} />
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      {currentIndex >= cards.length && (
        <div className="text-center text-gray-500">
          <p className="text-xl">No more cards!</p>
        </div>
      )}
    </div>
  );
};

export default CardStack;
