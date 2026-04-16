import { Nav } from "@/components/layout/Nav";
import { Loader } from "@/components/animations/Loader";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Cursor } from "@/components/animations/Cursor";
import { ProgressBar } from "@/components/animations/ProgressBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Animation providers — client components */}
      <SmoothScroll />
      <Cursor />
      <ProgressBar />
      <Loader />

      {/* Layout */}
      <Nav />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
