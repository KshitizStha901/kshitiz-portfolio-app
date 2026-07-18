import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { profile } from "@/lib/content";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#hero">
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
