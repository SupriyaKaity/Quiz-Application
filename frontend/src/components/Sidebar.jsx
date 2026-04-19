import React, { useState, useEffect, useRef } from "react";
import { sidebarStyles } from "../assets/dummyStyles";
import questionsData from "../assets/dummydata";
import { toast } from "react-toastify";
//import axios from "axios";
import API from "../utils/api";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
  Zap,
  Menu,
  CheckCircle,
  XCircle,
  X,
  LogOut,
  Home,
  RefreshCw,
  Trash2,
  RotateCcw,
} from "lucide-react";

//const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";

const Sidebar = ({ onExamStart, onExamEnd }) => {
  console.log("Sidebar component is rendering");

  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examActive, setExamActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isLevelSelectionPage, setIsLevelSelectionPage] = useState(false);
  const [isLevelPage, setIsLevelPage] = useState(false);

  const submittedRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const asideRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Technology & levels
  const technologies = [
    {
      id: "html",
      name: "HTML",
      icon: <Globe size={20} />,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      id: "css",
      name: "CSS",
      icon: <Layout size={20} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "js",
      name: "JavaScript",
      icon: <Code size={20} />,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      id: "react",
      name: "React",
      icon: <Cpu size={20} />,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      id: "node",
      name: "Node.js",
      icon: <Code size={20} />,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <Database size={20} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      id: "java",
      name: "Java",
      icon: <Coffee size={20} />,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: "python",
      name: "Python",
      icon: <Terminal size={20} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "cpp",
      name: "C++",
      icon: <Code size={20} />,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      icon: <Layout size={20} />,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
  ];

  const levels = [
    {
      id: "basic",
      name: "Basic",
      questions: 20,
      icon: <Star size={16} />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      questions: 40,
      icon: <Zap size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "advanced",
      name: "Advanced",
      questions: 60,
      icon: <Target size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const getQuestions = () => {
    if (!selectedTech || !selectedLevel) return [];
    return questionsData[selectedTech]?.[selectedLevel] || [];
  };

  // Calculate the score
  const calculateScore = () => {
    const questions = getQuestions();
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: questions.length
        ? Math.round((correct / questions.length) * 100)
        : 0,
    };
  };

  const questions = getQuestions();
  const currentQ = questions[currentQuestion];
  const score = calculateScore();

  // When quiz starts
  const startExam = () => {
    setExamActive(true);
    setIsExamActive(true);
    if (onExamStart) onExamStart();
    document.body.style.overflow = "hidden";
  };

  // When quiz ends
  const endExam = () => {
    setExamActive(false);
    setIsExamActive(false);
    if (onExamEnd) onExamEnd();
    document.body.style.overflow = "";
  };

  // Exit exam without saving
  const exitExam = () => {
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimerActive(false);
    setTimeLeft(15);
    setIsExamActive(false);
    setExamActive(false);
    endExam();
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    setTimeLeft(15);
    setTimerActive(true);
    setIsExamActive(false);
    setExamActive(false);
    endExam();
  };

  // Handle level select
  const handleLevelSelect = (levelId) => {
    // Allow selecting level when no exam is active
    // If exam is active, block changing level
    if (isExamActive && selectedLevel !== null) {
      toast.warning(
        "Please finish current exam or use Exit button to change difficulty",
      );
      return;
    }

    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    setTimeLeft(15);
    setTimerActive(true);
    startExam();
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleTechSelect = (techId) => {
    // Only block if exam is active AND a level is selected (exam actually running)
    if (isExamActive && selectedLevel !== null) {
      toast.warning(
        "Please finish current exam or use Exit button to change topic",
      );
      return;
    }

    event?.preventDefault();

    // Get current scroll position BEFORE any state change
    const currentScrollTop =
      document.querySelector(".sidebar-content")?.scrollTop || 0;

    // Store in localStorage to persist across renders
    localStorage.setItem("sidebarScrollPosition", currentScrollTop);

    if (selectedTech === techId) {
      setSelectedTech(null);
      setSelectedLevel(null);
    } else {
      setSelectedTech(techId);
      setSelectedLevel(null);
    }
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    setTimeLeft(15);
    setTimerActive(true);

    if (window.innerWidth < 768) setIsSidebarOpen(true);
  };

  // Force scroll to top on page refresh
  useEffect(() => {
    // Clear any saved scroll position on page load
    localStorage.removeItem("sidebarScrollPosition");
    sessionStorage.removeItem("sidebarScrollPosition");

    // Scroll sidebar content to top
    setTimeout(() => {
      const sidebarContent = document.querySelector(".sidebar-content");
      if (sidebarContent) {
        sidebarContent.scrollTop = 0;
      }
      // Also scroll main content to top
      window.scrollTo(0, 0);
    }, 50);
  }, []); // Empty array = runs only once when component mounts

  // Prevent any scroll restoration
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    // When on level selection page (technology selected, no level chosen)
    if (selectedTech && !selectedLevel && !showResults && !currentQ) {
      // Reset sidebar scroll to top to show Technologies header
      setTimeout(() => {
        const sidebarContent = document.querySelector(".sidebar-content");
        if (sidebarContent) {
          sidebarContent.scrollTop = 0;
        }
      }, 50);
    }
  }, [selectedTech, selectedLevel, showResults, currentQ]);

  useEffect(() => {
    // Check if we're on level selection page (technology selected but no level chosen)
    if (selectedTech && !selectedLevel && !showResults && !currentQ) {
      setIsLevelPage(true);
      setIsLevelSelectionPage(true);
      // Reset scroll to top when entering level selection page
      // setTimeout(() => {
      //   const sidebarContent = document.querySelector('.sidebar-content');
      //   if (sidebarContent) {
      //     sidebarContent.scrollTop = 0;
      //   }
      // }, 100);
    } else {
      setIsLevelPage(false);
      setIsLevelSelectionPage(false);
    }
  }, [selectedTech, selectedLevel, showResults, currentQ]);

  // Add this useEffect anywhere after your other useEffects
  useEffect(() => {
    // Restore scroll position after component updates
    const savedScrollPosition = localStorage.getItem("sidebarScrollPosition");
    if (savedScrollPosition) {
      setTimeout(() => {
        const sidebarContent = document.querySelector(".sidebar-content");
        if (sidebarContent) {
          sidebarContent.scrollTop = parseInt(savedScrollPosition);
          console.log("Restored scroll to:", savedScrollPosition);
        }
      }, 50);
    }
  }, [selectedTech, selectedLevel]); // Runs when tech or level changes

  useEffect(() => {
    // Prevent body scroll when sidebar is open on mobile
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // This runs only on actual page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isRefreshing", "true");
    };

    const handleLoad = () => {
      const isRefreshing = sessionStorage.getItem("isRefreshing");
      if (isRefreshing) {
        // This is a page refresh
        setTimeout(() => {
          const sidebarContent = document.querySelector(".sidebar-content");
          if (sidebarContent) {
            sidebarContent.scrollTop = 0;
          }
        }, 100);
        sessionStorage.removeItem("isRefreshing");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Add this useEffect after your existing useEffects
  useEffect(() => {
    // When a technology is selected, ensure the sidebar header is visible
    if (selectedTech) {
      setTimeout(() => {
        const sidebarHeader = document.querySelector(
          ".sidebarHeader, .sidebar-header",
        );
        if (sidebarHeader) {
          // Scroll the sidebar content to top to show header
          const sidebarContent = document.querySelector(".sidebar-content");
          if (sidebarContent) {
            sidebarContent.scrollTop = 0;
          }
        }
      }, 100);
    }
  }, [selectedTech]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (
      showResults === false &&
      currentQ &&
      timerActive &&
      !userAnswers[currentQuestion]
    ) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - auto move to next question
            clearInterval(timer);
            if (currentQuestion < questions.length - 1) {
              // Auto select nothing (treat as wrong answer)
              const newAnswers = { ...userAnswers, [currentQuestion]: null };
              setUserAnswers(newAnswers);
              setCurrentQuestion((prev) => prev + 1);
              setTimeLeft(15);
            } else {
              // Last question - finish quiz
              setShowResults(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    currentQuestion,
    currentQ,
    timerActive,
    userAnswers,
    showResults,
    questions.length,
  ]);

  // Reset timer when question changes
  useEffect(() => {
    if (!showResults && currentQ) {
      setTimeLeft(15);
      setTimerActive(true);
    }
  }, [currentQuestion, currentQ, showResults]);

  // Retake quiz event listener
  useEffect(() => {
    // Listen for retake quiz event
    const handleRetake = (event) => {
      const { technology, level } = event.detail;
      // Find and select the technology
      const techExists = technologies.find((t) => t.id === technology);
      if (techExists) {
        setSelectedTech(technology);
        setSelectedLevel(level);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        submittedRef.current = false;
        startExam();

        if (window.innerWidth < 768) setIsSidebarOpen(false);
      }
    };

    window.addEventListener("retakeQuiz", handleRetake);
    return () => {
      window.removeEventListener("retakeQuiz", handleRetake);
    };
  }, [technologies]);

  // If the inner width is greater than 768px then it will call this function
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If the sidebar is open and inner width is less than 768px then it will cillapse
  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isSidebarOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // This useEffect runs ONLY on page load/refresh, not when technology changes
  useEffect(() => {
    // Check if this is a page refresh (not a technology click)
    const isPageRefresh =
      performance.navigation?.type === 1 ||
      document.querySelector("[data-tech]") === null;

    if (isPageRefresh) {
      // Only reset scroll on actual page refresh
      setTimeout(() => {
        const sidebarContent = document.querySelector(".sidebar-content");
        if (sidebarContent) {
          sidebarContent.scrollTop = 0;
        }
      }, 100);
    }
  }, []);

  const getPerformanceStatus = () => {
    if (score.percentage >= 90)
      return {
        text: "Outstanding!",
        color: "bg-gradient-to-r from-amber-200 to-amber-300",
        icon: <Sparkles className="text-amber-800" />,
      };
    if (score.percentage >= 75)
      return {
        text: "Excellent!",
        color: "bg-gradient-to-r from-blue-200 to-indigo-200",
        icon: <Trophy className="text-blue-800" />,
      };
    if (score.percentage >= 60)
      return {
        text: "Good Job!",
        color: "bg-gradient-to-r from-green-200 to-teal-200",
        icon: <Award className="text-green-800" />,
      };
    return {
      text: "Keep Practicing",
      color: "bg-gradient-to-r from-gray-200 to-gray-300",
      icon: <BookOpen className="text-gray-800" />,
    };
  };

  const performance = getPerformanceStatus();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev); //Toggle sidebar for smaller screen

  const getAuthHeader = () => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleAnswerSelect = (answerIndex) => {
    // Prevent multiple answers for the same question
    if (userAnswers[currentQuestion] !== undefined) {
      console.log("Already answered this question");
      return;
    }

    console.log("Answer selected:", answerIndex);

    // Save the answer
    const newAnswers = {
      ...userAnswers,
      [currentQuestion]: answerIndex,
    };
    setUserAnswers(newAnswers);

    // Stop the timer
    setTimerActive(false);

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
        setTimerActive(true);
      } else {
        // Quiz completed
        setShowResults(true);
        endExam();
      }
    }, 500);
  };

  const submitResult = async () => {
    console.log("submitResult function called");
    console.log("submittedRef.current:", submittedRef.current);
    console.log("selectedTech:", selectedTech);
    console.log("selectedLevel:", selectedLevel);
    console.log("score:", score);

    if (submittedRef.current) {
      console.log("Already submitted, returning");
      return;
    }
    if (!selectedTech || !selectedLevel) {
      console.log("No tech or level selected");
      return;
    }

    const payload = {
      title: `${selectedTech.toUpperCase()} - ${
        selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)
      } Quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: score.total,
      correct: score.correct,
      wrong: score.total - score.correct,
    };

    console.log("Saving result payload:", payload);

    try {
      submittedRef.current = true;
      toast.info("Saving your result...");

      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      console.log(
        "Token:",
        token ? token.substring(0, 20) + "..." : "NO TOKEN",
      );

      if (!token) {
        toast.error("Please login to save results");
        submittedRef.current = false;
        return;
      }

      // const response = await axios.post(`${API_BASE}/api/results`, payload, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // console.log("Server response:", response.data);

      const response = await API.post("/api/results", payload);

      console.log("Server response:", response.data);

      if (response.data && response.data.success) {
        toast.success("Result saved successfully!");
      } else {
        toast.error("Failed to save result");
        submittedRef.current = false;
      }
    } catch (err) {
      submittedRef.current = false;
      console.error("Error saving result:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);

      if (err?.response?.status === 401) {
        toast.error("Please login again to save results");
      } else {
        toast.error(err?.response?.data?.message || "Could not save result");
      }
    }
  };

  useEffect(() => {
    if (showResults && score.total) {
      console.log("Calling submitResult");
      submitResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, score.total]);

  return (
    <div className={sidebarStyles.pageContainer}>
      {isSidebarOpen && (
        <div
          onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          className={sidebarStyles.mobileOverlay}
        ></div>
      )}

      <div className={sidebarStyles.mainContainer}>
        {/* <aside
          ref={asideRef}
          className={`${sidebarStyles.sidebar} ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${isLevelSelectionPage ? "level-selection-page" : ""}`}
        > */}
        <aside
          ref={asideRef}
          className={`${sidebarStyles.sidebar} ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            // overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className={sidebarStyles.sidebarHeader}
            style={{
              display: "block",
              visibility: "visible",
              position: "sticky",
              top: 0,
              zIndex: 100,
              paddingTop: "25px",
              paddingBottom: "15px",
              marginTop: "0",
              minHeight: "130px",
              backgroundColor: "inherit",
            }}
          >
            <div className={sidebarStyles.headerDecoration1}></div>
            <div className={sidebarStyles.headerDecoration2}></div>

            <div className={sidebarStyles.headerContent}>
              <div className={sidebarStyles.logoContainer}>
                <div className={sidebarStyles.logoIcon}>
                  <BookOpen size={28} className="text-indigo-700" />
                </div>
                <div>
                  <h1 className={sidebarStyles.logoTitle}>Tech Quiz Master</h1>
                  <p className={sidebarStyles.logoSubtitle}>
                    Test your knowledge and improve your skills
                  </p>
                </div>
              </div>
              <button
                onClick={toggleSidebar}
                className={sidebarStyles.closeButton}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div
            className={sidebarStyles.sidebarContent}
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              minHeight: 0,
              //maxHeight: "calc(100vh - 160px)",
            }}
          >
            <div className={sidebarStyles.technologiesHeader}>
              <h2 className={sidebarStyles.technologiesTitle}>Technologies</h2>
              <span className={sidebarStyles.technologiesCount}>
                {technologies.length} options
              </span>
            </div>

            {technologies.map((tech) => (
              <div
                key={tech.id}
                className={`${sidebarStyles.techItem} ${
                  isExamActive && selectedTech !== tech.id
                    ? "opacity-40 blur-[1px] pointer-events-none transition-all duration-300" // Removed blur-sm
                    : ""
                }`}
                data-tech={tech.id}
              >
                <button
                  onClick={() => handleTechSelect(tech.id)}
                  className={`${sidebarStyles.techButton} ${
                    selectedTech === tech.id
                      ? `${tech.color} ${sidebarStyles.techButtonSelected}`
                      : sidebarStyles.techButtonNormal
                  } ${isExamActive && selectedTech !== tech.id ? "cursor-not-allowed" : ""}`}
                >
                  <div className={sidebarStyles.techButtonContent}>
                    <span className={`${sidebarStyles.techIcon} ${tech.color}`}>
                      {tech.icon}
                    </span>
                    <span className={sidebarStyles.techName}>{tech.name}</span>
                  </div>

                  {selectedTech === tech.id ? (
                    <ChevronDown size={18} className="text-current" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </button>

                {selectedTech === tech.id && (
                  <div
                    className={`${sidebarStyles.levelsContainer} ${
                      isExamActive
                        ? "opacity-40 blur-[1px] pointer-events-none"
                        : "" // Removed blur
                    }`}
                  >
                    <h3 className={sidebarStyles.levelsTitle}>
                      <span>Select Difficulty</span>
                      <span className={sidebarStyles.techBadge}>
                        {technologies.find((t) => t.id === selectedTech).name}
                      </span>
                    </h3>

                    {levels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        className={`${sidebarStyles.levelButton} ${
                          selectedLevel === level.id
                            ? `${level.color} ${sidebarStyles.levelButtonSelected}`
                            : sidebarStyles.levelButtonNormal
                        } ${isExamActive ? "cursor-not-allowed" : ""}`}
                      >
                        <div className={sidebarStyles.levelButtonContent}>
                          <span
                            className={`${sidebarStyles.levelIcon} ${
                              selectedLevel === level.id
                                ? "bg-white/40"
                                : "bg-gray-100"
                            }`}
                          >
                            {level.icon}
                          </span>
                          <span>{level.name}</span>
                        </div>
                        <span className={sidebarStyles.levelQuestions}>
                          {level.questions} Qs
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={sidebarStyles.sidebarFooter}
            style={{
              flexShrink: 0,
              marginTop: "auto",
              // position: "sticky",
              // bottom: 0,
              // backgroundColor: "white",
              // zIndex: 10,
              // borderTop: "1px solid #e5e7eb",
            }}
          >
            <div className={sidebarStyles.footerContent}>
              <div className={sidebarStyles.footerContentCenter}>
                <p>Master your skills on Technology..</p>
                <p className={sidebarStyles.footerHighlight}>
                  Keep Learning, Keep Growing!
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* QUESTION AND ANSWER ALSO RESULT */}
        <main
          className={`${sidebarStyles.mainContent} main-content-fix`}
          style={{
            overflowY: "auto",
            height: "100vh",
            scrollbarWidth: "none",
          }}
        >
          <div
            className={
              isLevelSelectionPage ? "level-selection-content-wrapper" : ""
            }
            style={{
              minHeight: "calc(100vh - 100px)",
              paddingBottom: "0px",
            }}
          >
            <div className={sidebarStyles.mobileHeader}>
              <button
                onClick={toggleSidebar}
                className={sidebarStyles.menuButton}
              >
                <Menu size={20} />
              </button>

              {/* <div className={sidebarStyles.mobileTitle}> */}
              <div
                className={`${sidebarStyles.mobileTitle} ${isExamActive ? "opacity-40 pointer-events-none" : ""}`}
              >
                {selectedTech ? (
                  <div className={sidebarStyles.mobileTechInfo}>
                    <div
                      className={`${sidebarStyles.mobileTechIcon} ${
                        technologies.find((t) => t.id === selectedTech).color
                      }`}
                    >
                      {technologies.find((t) => t.id === selectedTech).icon}
                    </div>
                    <div className={sidebarStyles.mobileTechText}>
                      <div className={sidebarStyles.mobileTechName}>
                        {technologies.find((t) => t.id === selectedTech).name}
                      </div>
                      <div className={sidebarStyles.mobileTechLevel}>
                        {selectedLevel
                          ? `${
                              selectedLevel.charAt(0).toUpperCase() +
                              selectedLevel.slice(1)
                            } level`
                          : "Select level"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={sidebarStyles.mobilePlaceholder}>
                    Select a technology from the menu
                  </div>
                )}
              </div>
            </div>

            {selectedTech && !selectedLevel && (
              <div
                className={`${sidebarStyles.mobileLevels} ${isExamActive ? "opacity-40 blur-[1px] pointer-events-none" : ""}`}
              >
                <div className={sidebarStyles.mobileLevelsContainer}>
                  {levels.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => handleLevelSelect(l.id)}
                      className={sidebarStyles.mobileLevelButton}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!selectedTech ? (
              <div className={sidebarStyles.welcomeContainer}>
                <div className={sidebarStyles.welcomeContent}>
                  <div className={sidebarStyles.welcomeIcon}>
                    <Award size={64} className="text-indigo-700" />
                  </div>
                  <h2 className={sidebarStyles.welcomeTitle}>
                    Welcome to Tech Quiz Master
                  </h2>
                  <p className={sidebarStyles.welcomeDescription}>
                    Select a technology from the sidebar to start your quiz
                    journey. Test your knowledge at basic, intermediate, or
                    advanced levels.
                  </p>

                  <div className={sidebarStyles.featuresGrid}>
                    <div className={sidebarStyles.featureCard}>
                      <div className={sidebarStyles.featureIcon}>
                        <Star size={20} />
                      </div>
                      <h3 className={sidebarStyles.featureTitle}>
                        Multiple Technologies
                      </h3>
                      <p className={sidebarStyles.featureDescription}>
                        HTML, CSS, JavaScript, React, and more
                      </p>
                    </div>

                    <div className={sidebarStyles.featureCard}>
                      <div className={sidebarStyles.featureIcon}>
                        <Zap size={20} />
                      </div>
                      <h3 className={sidebarStyles.featureTitle}>
                        Three Difficulty Levels
                      </h3>
                      <p className={sidebarStyles.featureDescription}>
                        Basic, Intermediate, and Advanced challenges
                      </p>
                    </div>

                    <div className={sidebarStyles.featureCard}>
                      <div className={sidebarStyles.featureIcon}>
                        <Target size={20} />
                      </div>
                      <h3 className={sidebarStyles.featureTitle}>
                        Instant Feedback
                      </h3>
                      <p className={sidebarStyles.featureDescription}>
                        Get detailed results and performance analysis
                      </p>
                    </div>
                  </div>

                  <div className={sidebarStyles.welcomePrompt}>
                    <p className={sidebarStyles.welcomePromptText}>
                      <Sparkles size={16} className="mr-2" />
                      Select any technology to begin your learning adventure!
                    </p>
                  </div>
                </div>
              </div>
            ) : !selectedLevel ? (
              // <div className="flex items-start justify-center min-h-screen pt-40 pb-40 px-4">
              <div
                className="level-selection-wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "calc(100vh - 80px)",
                  padding: "40px 20px",
                  marginTop: "0px",
                }}
              >
                <div className={sidebarStyles.levelSelectionContent}>
                  <div
                    className={`${sidebarStyles.techSelectionIcon} ${
                      technologies.find((t) => t.id === selectedTech).color
                    }`}
                  >
                    {technologies.find((t) => t.id === selectedTech).icon}
                  </div>
                  <h2 className={sidebarStyles.techSelectionTitle}>
                    {technologies.find((t) => t.id === selectedTech).name} Quiz
                  </h2>
                  <p className={sidebarStyles.techSelectionDescription}>
                    Select a difficulty level to begin your challenge
                  </p>

                  <div className={sidebarStyles.techSelectionPrompt}>
                    <p className={sidebarStyles.techSelectionPromptText}>
                      Get ready to test your{" "}
                      {technologies.find((t) => t.id === selectedTech).name}{" "}
                      knowledge!
                    </p>
                  </div>
                </div>
              </div>
            ) : showResults ? (
              <div className={sidebarStyles.resultsContainer}>
                <div className={sidebarStyles.resultsContent}>
                  <div className={sidebarStyles.resultsHeader}>
                    <div
                      className={`${sidebarStyles.performanceIcon} ${performance.color}`}
                    >
                      {performance.icon}
                    </div>
                    <h2 className={sidebarStyles.resultsTitle}>
                      Quiz Completed!
                    </h2>
                    <p className={sidebarStyles.resultsSubtitle}>
                      You've completed the {selectedLevel} level
                    </p>
                    <div
                      className={`${sidebarStyles.performanceBadge} ${performance.color}`}
                    >
                      {performance.text}
                    </div>

                    <div className={sidebarStyles.scoreGrid}>
                      <div className={sidebarStyles.scoreCard}>
                        <div className={sidebarStyles.scoreIcon}>
                          <CheckCircle size={24} />
                        </div>
                        <p className={sidebarStyles.scoreNumber}>
                          {score.correct}
                        </p>
                        <p className={sidebarStyles.scoreLabel}>
                          Correct Answers
                        </p>
                      </div>

                      <div className={sidebarStyles.scoreCard}>
                        <div className={sidebarStyles.scoreIcon}>
                          <XCircle size={24} />
                        </div>
                        <p className={sidebarStyles.scoreNumber}>
                          {score.total - score.correct}
                        </p>
                        <p className={sidebarStyles.scoreLabel}>
                          Incorrect Answers
                        </p>
                      </div>
                    </div>

                    <div className={sidebarStyles.scoreProgress}>
                      <div className={sidebarStyles.scoreProgressHeader}>
                        <span className={sidebarStyles.scoreProgressTitle}>
                          Overall Score
                        </span>
                        <span className={sidebarStyles.scoreProgressPercentage}>
                          {score.percentage}%
                        </span>
                      </div>
                      <div className={sidebarStyles.scoreProgressBar}>
                        <div
                          className={`${sidebarStyles.scoreProgressFill} ${
                            score.percentage >= 80
                              ? "bg-green-400"
                              : score.percentage >= 60
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                          style={{ width: `${score.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                      <button
                        onClick={() => {
                          resetQuiz();
                          window.location.href = "/";
                        }}
                        className="px-6 py-2.5 bg-linear-to-r from-violet-400 to-purple-400 text-white text-sm rounded-xl hover:from-violet-500 hover:to-purple-500 transition font-medium cursor-pointer shadow-md flex items-center gap-2"
                      >
                        <Home size={18} />
                        Back to Home
                      </button>
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-2.5 bg-linear-to-r from-pink-400 to-rose-400 text-white text-sm rounded-xl hover:from-pink-500 hover:to-rose-500 transition font-medium cursor-pointer shadow-md flex items-center gap-2"
                      >
                        <RotateCcw size={18} />
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentQ ? (
              <div className={sidebarStyles.quizContainer}>
                {/* Timer on Left, Exit Button on Right - Same Row */}
                <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
                  {/* Circle Timer (Left side) */}
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#e5e7eb"
                        strokeWidth="5"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={
                          timeLeft <= 5
                            ? "#ef4444"
                            : timeLeft <= 10
                              ? "#f97316"
                              : "#22c55e"
                        }
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={`${(timeLeft / 15) * 175.9} 175.9`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className={`text-lg font-bold ${timeLeft <= 5 ? "text-red-500" : timeLeft <= 10 ? "text-orange-500" : "text-green-500"}`}
                      >
                        {timeLeft}
                      </span>
                      <span className="text-[8px] text-gray-400">sec</span>
                    </div>
                  </div>

                  {/* Exit Button - Creamy Butter Color with Lucide Icon (Right side) */}
                  <button
                    onClick={exitExam}
                    className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-amber-300 to-yellow-300 text-amber-900 text-sm rounded-xl hover:from-amber-400 hover:to-yellow-400 transition font-medium cursor-pointer shadow-md border border-amber-200"
                  >
                    <LogOut size={18} />
                    Exit Quiz
                  </button>
                </div>

                {/* Rest of your quiz content */}
                <div className={sidebarStyles.quizHeader}>
                  <div className={sidebarStyles.quizTitleContainer}>
                    <h1 className={sidebarStyles.quizTitle}>
                      {technologies.find((t) => t.id === selectedTech).name} -{" "}
                      {selectedLevel.charAt(0).toUpperCase() +
                        selectedLevel.slice(1)}{" "}
                      Level
                    </h1>
                    <span className={sidebarStyles.quizCounter}>
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>

                  <div className={sidebarStyles.progressBar}>
                    <div
                      className={sidebarStyles.progressFill}
                      style={{
                        width: `${((currentQuestion + 1) / (questions.length || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className={sidebarStyles.questionContainer}>
                  <div className={sidebarStyles.questionHeader}>
                    <div className={sidebarStyles.questionIcon}>
                      <Target size={20} />
                    </div>
                    <h2 className={sidebarStyles.questionText}>
                      {currentQ.question}
                    </h2>
                  </div>

                  <div className={sidebarStyles.optionsContainer}>
                    {currentQ.options.map((option, index) => {
                      const isSelected = userAnswers[currentQuestion] === index;
                      const isCorrect = index === currentQ.correctAnswer;
                      const showFeedback =
                        userAnswers[currentQuestion] !== undefined;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            // Only allow selection if no answer has been given for this question
                            if (userAnswers[currentQuestion] === undefined) {
                              handleAnswerSelect(index);
                            }
                          }}
                          className={`${sidebarStyles.optionButton} ${
                            showFeedback && isSelected && isCorrect
                              ? sidebarStyles.optionCorrect
                              : showFeedback && isSelected && !isCorrect
                                ? sidebarStyles.optionIncorrect
                                : showFeedback && isCorrect
                                  ? sidebarStyles.optionCorrect
                                  : sidebarStyles.optionNormal
                          }`}
                        >
                          <div className={sidebarStyles.optionContent}>
                            {showFeedback && (isSelected || isCorrect) ? (
                              isCorrect ? (
                                <CheckCircle
                                  size={20}
                                  className={sidebarStyles.optionIconCorrect}
                                />
                              ) : (
                                <XCircle
                                  size={20}
                                  className={sidebarStyles.optionIconIncorrect}
                                />
                              )
                            ) : (
                              <div className={sidebarStyles.optionIconEmpty} />
                            )}
                            <span className={sidebarStyles.optionText}>
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className={sidebarStyles.loadingContainer}>
                <div className={sidebarStyles.loadingContent}>
                  <div className={sidebarStyles.loadingSpinner} />
                  <h3 className={sidebarStyles.loadingTitle}>
                    Preparing Your Quiz
                  </h3>
                  <p className={sidebarStyles.loadingDescription}>
                    Loading questions...
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{sidebarStyles.customStyles}</style>
    </div>
  );
};

export default Sidebar;
