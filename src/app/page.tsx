import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { FeaturedEvents } from "@/components/FeaturedEvents";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <FeaturedEvents />
    </div>
  );
}
