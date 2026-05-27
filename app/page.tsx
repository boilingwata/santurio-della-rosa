import Image from "next/image";
import CharactersSection from "./components/CharactersSection";
import SnapScroll from "./components/SnapScroll";
import backgroundPoster from "@/assets/artwork/nhatho san dai.png";
import newsBackground from "@/assets/artwork/nhatho.png";
import featuresBackground from "@/assets/artwork/phong ngu.png";
import HomeHeroCta from "./components/HomeHeroCta";

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
          <HomeHeroCta />
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
