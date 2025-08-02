// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Icons } from "../lib/Icons";
import { projects } from "../lib/projects";
import { sections } from "../lib/sections";
import { option } from "../lib/githubOption";
import { technicalSkills } from "../lib/technicalSkills";
import {
  Clock,
  File,
  Github,
  Globe,
  Lock,
  MapPinHouse,
  Medal,
  Menu,
  X,
} from "lucide-react";
import { professionalTimeline } from "../lib/professionalTimeline";
import { socialMediaLinks } from "../lib/socialMedia";

const HeroPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const githubChartRef = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const fullText = "Front End Developer";
  const [index, setIndex] = useState(0);

  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [contributionsCount, setContributionsCount] = useState(0);

  const [showAllSkills, setShowAllSkills] = useState(false);

  const visibleSkills = showAllSkills
    ? technicalSkills
    : technicalSkills.slice(0, 8);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const currentPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const yearsInterval = setInterval(() => {
            setYearsCount((prev) => {
              if (prev < 2) return prev + 1;
              clearInterval(yearsInterval);
              return prev;
            });
          }, 200);

          const projectsInterval = setInterval(() => {
            setProjectsCount((prev) => {
              if (prev < 10) return prev + 1;
              clearInterval(projectsInterval);
              return prev;
            });
          }, 50);

          const contributionsInterval = setInterval(() => {
            setContributionsCount((prev) => {
              if (prev < 700) return prev + 5;
              clearInterval(contributionsInterval);
              return 700;
            });
          }, 20);

          return () => {
            clearInterval(yearsInterval);
            clearInterval(projectsInterval);
            clearInterval(contributionsInterval);
          };
        }
      },
      { threshold: 0.1 }
    );

    const backgroundSection = document.getElementById("background");
    if (backgroundSection) {
      observer.observe(backgroundSection);
    }

    return () => {
      if (backgroundSection) {
        observer.unobserve(backgroundSection);
      }
    };
  }, []);

  // GitHub activity chart
  useEffect(() => {
    if (githubChartRef.current) {
      const chart = echarts.init(githubChartRef.current);

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-red-600"
          >
            Dovudkhon | Portfolio
          </a>

          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`!rounded-button whitespace-nowrap cursor-pointer text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-transparent bg-gradient-to-r from-orange-500 via-yellow-500 to-red-600 bg-clip-text"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <button
            className="md:hidden !rounded-button whitespace-nowrap cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-red-600 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-6 py-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`!rounded-button whitespace-nowrap cursor-pointer block w-full text-left py-3 text-sm font-medium transition-colors ${
                    activeSection === section
                      ? "text-gradient-to-r from-orange-500 via-yellow-500 to-red-600 bg-clip-text bg-transparent"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500 rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-yellow-500 rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-amber-500 rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <Medal className="mr-2" size={16} />
                Honor Graduate with Golden Medal
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
              Hello, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500">
                Dovudkhon
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 h-10">
              {displayText}
              <span className="animate-blink">|</span>
            </h2>

            <p className="text-lg text-gray-400 mb-10 max-w-2xl">
              Passionate about creating elegant solutions to complex problems.
              Specializing in full-stack development with a focus on modern
              JavaScript frameworks and responsive design.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="!rounded-button whitespace-nowrap cursor-pointer bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 hover:from-orange-400 hover:to-red-500 text-white font-medium px-8 py-3 rounded-md transition-all transform duration-300"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="!rounded-button whitespace-nowrap cursor-pointer bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-md transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("skills")}
            className="!rounded-button whitespace-nowrap cursor-pointer text-gray-400 hover:text-white transition-colors"
          >
            Scroll
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency
              levels in various programming languages and frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4`}
                  >
                    <skill.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>

                <div className="mb-2 flex justify-between">
                  <span className="text-gray-400 text-sm">Proficiency</span>
                  <span className="text-white font-medium">{skill.level}%</span>
                </div>

                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            {!showAllSkills && technicalSkills.length > 6 && (
              <button
                className="!rounded-button whitespace-nowrap cursor-pointer bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-md transition-all mt-8"
                onClick={() => setShowAllSkills(true)}
              >
                Load More
              </button>
            )}
            {showAllSkills && technicalSkills.length > 6 && (
              <button
                className="!rounded-button whitespace-nowrap cursor-pointer bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-md transition-all mt-8"
                onClick={() => setShowAllSkills(false)}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Technical Background */}
      <section id="background" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Technical Background</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My journey in software development, showcasing experience and
              contributions in the field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-orange-400 mb-2">
                {yearsCount}+
              </div>
              <div className="text-gray-400">Years of Experience</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-yellow-400 mb-2">
                {projectsCount}+
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">
                {contributionsCount}+
              </div>
              <div className="text-gray-400">GitHub Contributions</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Code Expertise</h3>

              <div className="bg-gray-950 rounded-lg p-6 mb-6 overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">
                    react-component.jsx
                  </div>
                </div>

                <pre className="text-sm overflow-x-auto">
                  <code className="language-javascript">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">MyComponent</span> ={" "}
                    <span className="text-yellow-400">()</span> =&gt; {`{`}
                    <br /> <span className="text-purple-400">const</span> [
                    <span className="text-blue-400">count</span>,{" "}
                    <span className="text-blue-400">setCount</span>] ={" "}
                    <span className="text-yellow-400">useState</span>(0);
                    <br />
                    <br /> <span className="text-purple-400">useEffect</span>(()
                    =&gt; {`{`}
                    <br />{" "}
                    <span className="text-green-400">
                      &nbsp;&nbsp;// Effect runs on component mount
                    </span>
                    <br /> &nbsp; <span className="text-blue-400">console</span>
                    .<span className="text-yellow-400">log</span>(
                    <span className="text-orange-400">'Component mounted'</span>
                    );
                    <br />
                    <br /> &nbsp;{" "}
                    <span className="text-purple-400">return</span> () =&gt;{" "}
                    {`{`}
                    <br />{" "}
                    <span className="text-green-400">
                      &nbsp;&nbsp; // Cleanup on unmount
                    </span>
                    <br />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <span className="text-blue-400">console</span>.
                    <span className="text-yellow-400">log</span>(
                    <span className="text-orange-400">
                      'Component unmounted'
                    </span>
                    );
                    <br />
                    &nbsp;&nbsp; {`}`};
                    <br /> {`}`}, []);
                    <br />
                    <br /> <span className="text-purple-400">return</span> (
                    <br /> &lt;<span className="text-yellow-400">div</span>&gt;
                    <br />
                    &nbsp; &lt;<span className="text-yellow-400">h1</span>
                    &gt;Count: {`{`}
                    <span className="text-blue-400">count</span>
                    {`}`}&lt;/<span className="text-yellow-400">h1</span>&gt;
                    <br />
                    &nbsp; &lt;<span className="text-yellow-400">
                      button
                    </span>{" "}
                    <span className="text-purple-400">onClick</span>={`{`}()
                    =&gt; <span className="text-blue-400">setCount</span>(
                    <span className="text-blue-400">count</span> + 1){`}`}&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp; Increment
                    <br />
                    &nbsp; &lt;/<span className="text-yellow-400">button</span>
                    &gt;
                    <br /> &lt;/<span className="text-yellow-400">div</span>&gt;
                    <br /> );
                    <br />
                    {`}`};
                  </code>
                </pre>
              </div>

              <div className="bg-gray-950 rounded-lg p-6 overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">algorithm.py</div>
                </div>

                <pre className="text-sm overflow-x-auto">
                  <code className="language-python">
                    <span className="text-purple-400">def</span>{" "}
                    <span className="text-yellow-400">quick_sort</span>(arr):
                    <br /> <span className="text-green-400"># Base case</span>
                    <br /> <span className="text-purple-400">if</span>{" "}
                    <span className="text-yellow-400">len</span>(arr) &lt;= 1:
                    <br /> <span className="text-purple-400">return</span> arr
                    <br />
                    <br /> pivot = arr[
                    <span className="text-yellow-400">len</span>(arr) // 2]
                    <br /> left = [x{" "}
                    <span className="text-purple-400">for</span> x{" "}
                    <span className="text-purple-400">in</span> arr{" "}
                    <span className="text-purple-400">if</span> x &lt; pivot]
                    <br /> middle = [x{" "}
                    <span className="text-purple-400">for</span> x{" "}
                    <span className="text-purple-400">in</span> arr{" "}
                    <span className="text-purple-400">if</span> x == pivot]
                    <br /> right = [x{" "}
                    <span className="text-purple-400">for</span> x{" "}
                    <span className="text-purple-400">in</span> arr{" "}
                    <span className="text-purple-400">if</span> x &gt; pivot]
                    <br />
                    <br /> <span className="text-purple-400">return</span>{" "}
                    <span className="text-yellow-400">quick_sort</span>(left) +
                    middle + <span className="text-yellow-400">quick_sort</span>
                    (right)
                    <br />
                    <br />
                    <span className="text-green-400"># Example usage</span>
                    <br />
                    numbers = [3, 6, 8, 10, 1, 2, 1]
                    <br />
                    sorted_numbers ={" "}
                    <span className="text-yellow-400">quick_sort</span>(numbers)
                    <br />
                    <span className="text-yellow-400">print</span>
                    (sorted_numbers){" "}
                    <span className="text-green-400">
                      # Output: [1, 1, 2, 3, 6, 8, 10]
                    </span>
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Professional Timeline</h3>
              <div className="relative">
                <ul className="space-y-8">
                  {professionalTimeline.map((item, index) => (
                    <li key={index} className="flex items-start relative">
                      <div className="flex flex-col items-center mr-6">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-red-500 border-4 border-gray-900 flex items-center justify-center z-10 shadow-lg">
                          <i className="fas fa-briefcase text-xs text-white"></i>
                        </div>
                        {index !== professionalTimeline.length - 1 && (
                          <div className="flex-1 w-1 bg-gradient-to-b from-orange-400 via-yellow-500 to-red-500"></div>
                        )}
                      </div>
                      <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full border border-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <span className="text-orange-400 font-semibold">
                            {item.year}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {item.company}
                          </span>
                        </div>
                        <div className="text-lg font-bold mb-1">
                          {item.title}
                        </div>
                        <div className="text-gray-400">{item.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section id="achievements" className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Academic Achievements</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Highlighting my educational background and notable academic
              accomplishments.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 rounded-lg mb-8">
                <div className="bg-gray-900 p-8 rounded-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-medal text-gray-900 text-3xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        Golden Medal Graduate
                      </h3>
                      <p className="text-gray-400">
                        Awarded for academic excellence
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    Graduated with the highest honors, receiving the prestigious
                    Golden Medal for outstanding academic performance and
                    contributions to the university community.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        4.0
                      </div>
                      <div className="text-gray-400 text-sm">GPA</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        Top 1%
                      </div>
                      <div className="text-gray-400 text-sm">Class Ranking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Portfolio */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Project Portfolio</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing my recent work and projects across various technologies
              and domains.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex bg-gray-800 rounded-lg p-1">
              {["All", "React.js", "Node.js", "JavaScript", "HTML/CSS"].map(
                (filter, index) => (
                  <button
                    key={index}
                    className="!rounded-button whitespace-nowrap cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors text-gray-300 hover:text-white"
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-center">
                        <a
                          href={project.demo}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex items-center !rounded-button whitespace-nowrap cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          {project.demoStatus === "deployed" ? (
                            <div className="flex items-center">
                              <Globe size={16} className="mr-2" />
                              Live Demo
                            </div>
                          ) : (
                            <div>Not Deployed</div>
                          )}
                        </a>
                        <a
                          href={project.github}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="flex items-center !rounded-button whitespace-nowrap cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          {project.githubAccess === "public" ? (
                            <div className="flex items-center">
                              <Github size={16} className="mr-2" />
                              GitHub
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Lock size={16} className="mr-2" />
                              Private
                            </div>
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="David"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 text-white font-medium px-8 py-3 rounded-md transition-all transform"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <div className="flex space-x-8">
                  {socialMediaLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="size-10" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">GitHub Activity</h3>
                <div ref={githubChartRef} className="w-full h-64"></div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      {<Icons.SocialMedia.Gmail className="size-8" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">Email</h4>
                      <a
                        href="mailto:contact@johndoe.com"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        asrorxonovdovudxon@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <MapPinHouse size={30} className="text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">Location</h4>
                      <p className="text-gray-400">Beppu, Oita, Japan</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <Clock size={30} className="text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300">
                        Working Hours
                      </h4>
                      <p className="text-gray-400">
                        Monday - Friday, 9AM - 6PM PST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="/pdf/Resume_Front-end_Dev.pdf"
                    download={"Resume_Front-end_Dev.pdf"}
                    className="!rounded-button whitespace-nowrap cursor-pointer inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a
                href="#"
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500"
              >
                Portfolio
              </a>
              <p className="text-gray-400 mt-2">
                Building innovative web solutions with modern technologies.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="!rounded-button whitespace-nowrap cursor-pointer text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} David. All rights reserved.
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-gray-500 text-sm">
                Last updated: April 9, 2025
              </div>

              <div className="h-4 w-px bg-gray-800"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
