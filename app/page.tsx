import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { CoachingInContextSection } from "@/components/sections/CoachingInContextSection";
import { EveryDaySection } from "@/components/sections/EveryDaySection";
import { LessonLoopSection } from "@/components/sections/LessonLoopSection";
import { TournamentsSection } from "@/components/sections/TournamentsSection";
import { TenYearsSection } from "@/components/sections/TenYearsSection";
import { PlansJoinSection } from "@/components/sections/PlansJoinSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <CoachingInContextSection />
      <EveryDaySection />
      <LessonLoopSection />
      <TournamentsSection />
      <TenYearsSection />
      <PlansJoinSection />
    </>
  );
}
