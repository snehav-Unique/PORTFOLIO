"use client";

import { type ReactNode, useState } from "react";

type StackProps = {
  cards: ReactNode[];
  layout?: "fan";
};

export default function Stack({ cards }: StackProps) {
  const [order, setOrder] = useState(() => cards.map((_, index) => index));

  const selectCard = (cardIndex: number, position: number) => {
    if (position === 0) {
      setOrder((current) => [...current.slice(1), current[0]]);
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
          aria-label={position === 0 ? `Move project ${cardIndex + 1} to the back` : `Bring project ${cardIndex + 1} to front`}
        >
          {cards[cardIndex]}
        </button>
      ))}
    </div>
  );
}
