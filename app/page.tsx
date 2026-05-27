import Image from "next/image";
import CharactersSection from "./components/CharactersSection";
import SnapScroll from "./components/SnapScroll";
import backgroundPoster from "@/assets/artwork/nhatho san dai.png";
import newsBackground from "@/assets/artwork/nhatho.png";
import featuresBackground from "@/assets/artwork/phong ngu.png";
import playButton from "@/assets/buttons/Play button.png";
import preregisterFrame from "@/assets/square frames/khungchunhatdendai.png";

export default function Page() {
  return (
    <main className="w-full">
      <SnapScroll />

      <section
        id="home"
        aria-label="Home"
        className="relative min-h-screen w-full snap-start snap-always overflow-hidden"
      >
        <video
          src="/background.mp4"
          poster={backgroundPoster.src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div className="relative min-h-screen pt-14">
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
            <button
              type="button"
              aria-label="Play trailer"
              className="group relative h-24 w-24 cursor-pointer transition-all duration-200 ease-out hover:scale-110 hover:drop-shadow-[0_0_24px_rgba(241,229,213,0.55)] active:scale-95"
            >
              <Image
                src={playButton}
                alt=""
                width={360}
                height={360}
                priority
                sizes="360px"
                className="absolute left-1/2 top-1/2 h-[360px] w-[360px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_18px_rgba(241,229,213,0.35)]"
              />
            </button>

            <div className="relative flex h-[150px] w-[460px] scale-[0.75] items-center justify-center overflow-hidden">
              <Image
                src={preregisterFrame}
                alt=""
                width={150}
                height={460}
                sizes="460px"
                className="object-cover"
                style={{ transform: "rotate(90deg) scaleX(-1)" }}
              />
              <button
                type="button"
                className="absolute z-10 cursor-pointer px-10 py-3 font-isabella text-4xl text-[#272829] transition-all duration-200 ease-out hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(241,229,213,0.55)] active:scale-95"
              >
                Pre-register
              </button>
            </div>
          </div>
        </div>
      </section>

      <CharactersSection />
      <ArtworkSection id="news" label="News" src={newsBackground} />
      <ArtworkSection id="features" label="Features" src={featuresBackground} />
    </main>
  );
}

function ArtworkSection({
  id,
  label,
  src,
}: {
  id: string;
  label: string;
  src: typeof newsBackground;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className="relative min-h-screen w-full snap-start snap-always overflow-hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
    </section>
  );
}
