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
import characterInfoData from "@/assets/info.json";
import sideFrame from "@/assets/square frames/FRAME H - FLOWER.png";
import infoFrame from "@/assets/square frames/FRAME W - LIGHT.png";

const characters = [
  { id: "liora", name: "Liora", image: liora },
  { id: "valeria", name: "Valeria", image: valeria },
  { id: "lucienne", name: "Lucienne", image: lucienne },
  { id: "reverina", name: "Reverina", image: reverina },
  { id: "vespera", name: "Vespera", image: vespera },
  { id: "eugenia", name: "Eugenia", image: eugenia },
  { id: "amethyst", name: "Amethyst", image: amethyst },
] satisfies Array<{ id: string; name: string; image: StaticImageData }>;

type CharacterInfoEntry = (typeof characterInfoData.characters)[number];

export default function CharactersSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCharacter = characters[selectedIndex];
  const selectedInfo = getCharacterInfo(selectedCharacter.id);
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
      className="relative min-h-screen w-full snap-start snap-always overflow-x-hidden overflow-y-visible"
    >
      <Image
        src={charactersBackground}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />

      <div className="absolute inset-0 bg-[#21111c]/10" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-wrap items-end justify-center gap-x-[clamp(12px,2vw,36px)] gap-y-6 overflow-x-hidden overflow-y-visible px-5 pt-20 md:flex-nowrap md:px-[clamp(24px,4vw,70px)]">
        <aside className="relative z-20 hidden h-[clamp(600px,74vh,820px)] w-[clamp(245px,18vw,310px)] shrink-0 md:flex md:items-center md:justify-center">
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

        <div
          aria-label={`${selectedCharacter.name} preview`}
          className="relative z-10 h-[clamp(480px,68vh,680px)] w-[clamp(300px,26vw,460px)] shrink-0 overflow-visible translate-y-[400px]"
        >
          <div className="absolute inset-0 origin-bottom scale-[2.8125]">
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

        <div className="relative z-10 mb-[clamp(90px,15vh,170px)] hidden aspect-[4/3] w-[clamp(430px,43vw,700px)] shrink-0 overflow-hidden rounded-[32px] bg-[#171719]/78 shadow-[0_24px_60px_rgba(19,8,17,0.42)] backdrop-blur-[2px] lg:block">
          {selectedInfo ? (
            <div className="absolute inset-[clamp(96px,22%,128px)_clamp(88px,18%,120px)_clamp(92px,20.5%,124px)_clamp(88px,18%,120px)] z-0 flex min-h-0 flex-col overflow-y-auto">
              <h2 className="shrink-0 font-cormorant text-[clamp(1.5rem,2.2vw,2.125rem)] font-semibold uppercase tracking-[0.12em] text-[#F1E5D5]">
                {selectedInfo.name.vi.toUpperCase()}
              </h2>
              <div
                aria-hidden="true"
                className="mt-2 mb-4 h-px w-full max-w-[14rem] shrink-0 bg-[#F1E5D5]/55"
              />
              <p className="shrink-0 font-cormorant text-[clamp(0.875rem,0.95vw,1rem)] leading-[1.65] text-[#c4bab0]">
                {selectedInfo.description.vi}
              </p>
              <dl className="mt-auto shrink-0 space-y-1 pt-4 font-cormorant text-[clamp(0.875rem,0.92vw,1rem)] leading-snug">
                <InfoDetail label="Độ tuổi" value={String(selectedInfo.age)} />
                <InfoDetail
                  label="Chiều cao"
                  value={`${selectedInfo.height_cm} cm`}
                />
                <InfoDetail label="Phân viện" value={selectedInfo.division.vi} />
                <InfoDetail label="Vai trò" value={selectedInfo.role.vi} />
              </dl>
            </div>
          ) : null}
          <Image
            src={infoFrame}
            alt=""
            fill
            sizes="(min-width: 1024px) 43vw, 0px"
            className="pointer-events-none z-10 object-contain"
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

function getCharacterInfo(id: string): CharacterInfoEntry | undefined {
  return characterInfoData.characters.find((entry) => entry.id === id);
}

function InfoDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="inline text-[#c4bab0]">{label}: </dt>
      <dd className="inline text-[#a89e94]">{value}</dd>
    </div>
  );
}
