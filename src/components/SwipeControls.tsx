import React from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Heart, X } from "lucide-react";

interface SwipeControlsProps {
  onLike?: () => void;
  onDislike?: () => void;
  currentIndex?: number;
  totalCards?: number;
}

const SwipeControls = ({
  onLike = () => {},
  onDislike = () => {},
  currentIndex = 0,
  totalCards = 10,
}: SwipeControlsProps) => {
  const progress = totalCards > 0 ? (currentIndex / totalCards) * 100 : 0;

  return (
    <div className="bg-white p-4 w-full h-[80px] flex flex-col gap-2 shadow-lg">
      <div className="flex justify-center gap-8 items-center">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-12 w-12"
          onClick={onDislike}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-12 w-12"
          onClick={onLike}
        >
          <Heart className="h-6 w-6 text-green-500" />
        </Button>
      </div>

      <div className="w-full px-4">
        <Progress value={progress} className="h-2" />
        <div className="text-center text-sm text-muted-foreground mt-1">
          {currentIndex} of {totalCards}
        </div>
      </div>
    </div>
  );
};

export default SwipeControls;
