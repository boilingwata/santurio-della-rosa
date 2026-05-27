"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import charactersBackground from "@/assets/artwork/santhuong.png";
import arrow from "@/assets/buttons/arrow.png";
import amethyst from "@/assets/characters/AMETHYST.png";
import eugenia from "@/assets/characters/EUGENIA.png";
import liora from "@/assets/characters/LIORA.png";
import lucienne from "@/assets/characters/LUCIENNE.png";
import reverina from "@/assets/characters/REVERINA.png";
import valeria from "@/assets/characters/VALERIA.png";
import vespera from "@/assets/characters/VESPERA.png";
import sideFrame from "@/assets/square frames/FRAME H - FLOWER.png";
import infoFrame from "@/assets/square frames/FRAME W - LIGHT.png";

const characters = [
  { name: "Liora", image: liora },
  { name: "Valeria", image: valeria },
  { name: "Lucienne", image: lucienne },
  { name: "Reverina", image: reverina },
  { name: "Vespera", image: vespera },
  { name: "Eugenia", image: eugenia },
  { name: "Amethyst", image: amethyst },
] satisfies Array<{ name: string; image: StaticImageData }>;

export default function CharactersSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCharacter = characters[selectedIndex];
  const visibleCharacters = getVisibleCharacters(selectedIndex);

  const selectPrevious = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0 ? characters.length - 1 : currentIndex - 1,
    );
  };

  const selectNext = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === characters.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section
      id="characters"
      aria-label="Characters"
      className="relative min-h-screen w-full snap-start snap-always overflow-hidden"
    >
      <Image
        src={charactersBackground}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />

      <div className="absolute inset-0 bg-[#21111c]/10" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] items-end justify-between gap-[clamp(18px,3vw,52px)] overflow-hidden px-5 pt-20 md:px-[clamp(24px,4vw,70px)]">
        <div className="flex min-w-0 flex-1 items-end gap-[clamp(6px,1vw,20px)]">
        <aside className="relative z-20 hidden h-[clamp(600px,74vh,820px)] w-[clamp(245px,18vw,310px)] shrink-0 self-center md:flex md:items-center md:justify-center">
          <div className="relative h-[85%] w-[85%]">
            <div className="pointer-events-none absolute inset-y-0 left-0 aspect-[1653/5669] overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-[200%]">
                <Image
                  src={sideFrame}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 10vw, 0px"
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(12px,1.7vh,20px)] pl-[clamp(48px,4.9vw,92px)]">
            <button
              type="button"
              aria-label="Previous character"
              onClick={selectPrevious}
              className="relative h-[clamp(76px,6vw,112px)] w-[clamp(76px,6vw,112px)] cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110 active:scale-95"
            >
              <Image
                src={arrow}
                alt=""
                fill
                sizes="112px"
                className="object-contain"
              />
            </button>

            <div className="flex flex-col gap-[clamp(14px,1.8vh,22px)]">
              {visibleCharacters.map(({ character, index }) => (
                <button
                  key={character.name}
                  type="button"
                  aria-label={`Select ${character.name}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative h-[clamp(134px,13.6vh,158px)] w-[clamp(108px,8.8vw,127px)] overflow-hidden rounded-[16px] bg-[#efe5d0] shadow-[0_8px_22px_rgba(24,10,20,0.35)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 ${
                    index === selectedIndex
                      ? "ring-2 ring-[#F1E5D5]"
                      : "opacity-95"
                  }`}
                >
                  <div className="absolute left-1/2 bottom-[-132px] h-[clamp(320px,31vh,360px)] w-[clamp(235px,20vw,270px)] -translate-x-1/2">
                    <Image
                      src={character.image}
                      alt=""
                      fill
                      sizes="270px"
                      className="object-contain object-bottom"
                    />
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next character"
              onClick={selectNext}
              className="relative h-[clamp(76px,6vw,112px)] w-[clamp(76px,6vw,112px)] rotate-180 cursor-pointer transition-transform duration-200 hover:translate-y-0.5 hover:scale-110 active:scale-95"
            >
              <Image
                src={arrow}
                alt=""
                fill
                sizes="112px"
                className="object-contain"
              />
            </button>
            </div>
          </div>
        </aside>

        <div className="relative z-10 h-[clamp(720px,78vh,1020px)] w-[clamp(450px,39vw,690px)] max-w-[min(690px,calc(100%-clamp(245px,18vw,310px)-1.25rem))] shrink min-w-0 self-end translate-y-[clamp(12px,2vh,32px)]">
          <Image
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            fill
            priority
            sizes="(min-width: 768px) 39vw, 88vw"
            className="object-contain object-bottom drop-shadow-[0_18px_18px_rgba(30,14,26,0.34)]"
          />
        </div>
        </div>

        <div className="relative z-10 mb-[clamp(90px,15vh,170px)] hidden aspect-[4/3] w-[clamp(430px,43vw,700px)] shrink-0 rounded-[32px] bg-[#171719]/78 shadow-[0_24px_60px_rgba(19,8,17,0.42)] backdrop-blur-[2px] lg:block">
          <Image
            src={infoFrame}
            alt=""
            fill
            sizes="(min-width: 1024px) 43vw, 0px"
            className="pointer-events-none object-contain p-3"
          />
        </div>
      </div>
    </section>
  );
}

function getVisibleCharacters(selectedIndex: number) {
  return [-1, 0, 1].map((offset) => {
    const index = (selectedIndex + offset + characters.length) % characters.length;
    return { character: characters[index], index };
  });
}
