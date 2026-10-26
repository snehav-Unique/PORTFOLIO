"use client";

import { type ReactNode, useState } from "react";

type StackProps = {
  cards: ReactNode[];
  layout?: "fan";
  onCardClick?: (index: number) => void;
};

export default function Stack({ cards, onCardClick }: StackProps) {
  const [order, setOrder] = useState(() => cards.map((_, index) => index));

  const selectCard = (cardIndex: number, position: number) => {
    if (position === 0) {
      onCardClick?.(cardIndex);
      return;
    }

    setOrder((current) => [cardIndex, ...current.filter((index) => index !== cardIndex)]);
  };

  return (
    <div className="stack" aria-label="Selected work">
      {order.map((cardIndex, position) => (
        <button
          className="stack-card"
          key={cardIndex}
          style={{
            zIndex: cards.length - position,
            transform: `translateX(${position * 17}px) translateY(${position * 15}px) rotate(${(position - 1) * 4.5}deg)`,
          }}
          onClick={() => selectCard(cardIndex, position)}
          aria-label={position === 0 ? `Open project ${cardIndex + 1}` : `Bring project ${cardIndex + 1} to front`}
        >
          {cards[cardIndex]}
        </button>
      ))}
    </div>
  );
}
