import React, { useState, useEffect, useCallback, useMemo } from "react";
import { resultStyles } from "../assets/dummyStyles";
import axios from "axios";
import { toast } from "react-toastify";
import { RotateCcw, Trash2 } from "lucide-react";

const Badge = ({ percent }) => {
  if (percent >= 85)
    return <span className={resultStyles.badgeExcellent}>Excellent</span>;
  if (percent >= 65)
    return <span className={resultStyles.badgeGood}>Good</span>;
  if (percent >= 45)
    return <span className={resultStyles.badgeAverage}>Average</span>;
  return <span className={resultStyles.badgeNeedsWork}>Needs Work</span>;
};

// Custom Dialog Component
const CustomDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl z-101">
        <div className="text-center mb-4">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-linear-to-r from-red-400 to-rose-400 text-white rounded-xl hover:from-red-500 hover:to-rose-500 transition font-medium cursor-pointer shadow-sm"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const StripCard = ({ item, onRemove, onRetake }) => {
  // Calculate percentage - handle both score and correct/totalQuestions
  let percent = 0;
  if (item.score) {
    percent = item.score;
  } else if (item.totalQuestions) {
    percent = Math.round(
      (Number(item.correct) / Number(item.totalQuestions)) * 100,
    );
  }

  const getLevel = (it) => {
    const level = (it.level || "").toString().toLowerCase();
    const title = (it.title || "").toString().toLowerCase();
    if (level === "basic" || title.includes("basic"))
      return { letter: "B", style: resultStyles.levelBasic };
    if (level === "intermediate" || title.includes("intermediate"))
      return { letter: "I", style: resultStyles.levelIntermediate };
    return { letter: "A", style: resultStyles.levelAdvanced };
  };

  const level = getLevel(item);

  return (
    <article className={resultStyles.card}>
      <div className={resultStyles.cardAccent}></div>
      <div className={resultStyles.cardContent}>
        <div className={resultStyles.cardHeader}>
          <div className={resultStyles.cardInfo}>
            <div className={`${resultStyles.levelAvatar} ${level.style}`}>
              {level.letter}
            </div>
            <div className={resultStyles.cardText}>
              <h3 className={resultStyles.cardTitle}>{item.title || "Quiz"}</h3>
              <div className={resultStyles.cardMeta}>
                {item.totalQuestions} Qs
                {item.createdAt &&
                  ` • ${new Date(item.createdAt).toLocaleDateString()}`}
              </div>
            </div>
          </div>
          <div className={resultStyles.cardPerformance}>
            <div className={resultStyles.badgeContainer}>
              <Badge percent={percent} />
            </div>
          </div>
        </div>

        <div className={resultStyles.cardStats}>
          <div className={resultStyles.statItem}>
            Correct:{" "}
            <span className={resultStyles.statNumber}>{item.correct}</span>
          </div>
          <div className={resultStyles.statItem}>
            Wrong: <span className={resultStyles.statNumber}>{item.wrong}</span>
          </div>
          <div className={resultStyles.statItem}>
            Score: <span className={resultStyles.statNumber}>{percent}%</span>
          </div>
        </div>

        {/* Buttons - Moved higher, removed mt-3, added negative margin top */}
        <div className="flex gap-2 justify-end -mt-10 pt-2">
          <button
            onClick={() => onRetake(item.technology, item.level)}
            className="px-3 py-1.5 bg-amber-300 text-amber-900 text-xs rounded-md hover:bg-amber-400 transition font-medium cursor-pointer flex items-center gap-1"
          >
            <RotateCcw size={12} />
            Retake
          </button>
          <button
            onClick={() => onRemove(item._id)}
            className="px-3 py-1.5 bg-red-400 text-white text-xs rounded-md hover:bg-red-500 transition font-medium cursor-pointer flex items-center gap-1"
          >
            <Trash2 size={12} />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

const MyResult = ({ apiBase = "http://localhost:9999" }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [technologies, setTechnologies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultToRemove, setResultToRemove] = useState(null);

  const getAuthHeader = useCallback(() => {
    const token =
      localStorage.getItem("authToken") || localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  useEffect(() => {
    // Hide scrollbar on body when results page loads
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scrollbar when leaving results page
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${apiBase}/api/results`;
      if (selectedTechnology !== "all") {
        url = `${apiBase}/api/results?technology=${selectedTechnology}`;
      }

      console.log("Fetching results from:", url);

      const res = await axios.get(url, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });

      console.log("Results response:", res.data);

      if (res.data && res.data.success) {
        const resultsData = res.data.results || [];
        console.log("Number of results:", resultsData.length);
        setResults(resultsData);

        // Extract unique technologies for filter
        const techSet = new Set();
        const allResultsRes = await axios.get(`${apiBase}/api/results`, {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
        });

        if (allResultsRes.data && allResultsRes.data.success) {
          (allResultsRes.data.results || []).forEach((r) => {
            if (r.technology) techSet.add(r.technology.toUpperCase());
          });
        }
        setTechnologies(Array.from(techSet));
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load results");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [apiBase, selectedTechnology, getAuthHeader]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const openRemoveDialog = (resultId) => {
    setResultToRemove(resultId);
    setDialogOpen(true);
  };

  const confirmRemove = async () => {
    if (!resultToRemove) return;

    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      const res = await axios.delete(
        `${apiBase}/api/results/${resultToRemove}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data && res.data.success) {
        setResults((prevResults) =>
          prevResults.filter((r) => r._id !== resultToRemove),
        );
        toast.success("Result removed successfully!");
        fetchResults();
      } else {
        toast.error("Failed to remove result");
      }
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Failed to remove result");
    } finally {
      setDialogOpen(false);
      setResultToRemove(null);
    }
  };

  const cancelRemove = () => {
    setDialogOpen(false);
    setResultToRemove(null);
  };

  const retakeQuiz = (technology, level) => {
    localStorage.setItem("retakeTechnology", technology);
    localStorage.setItem("retakeLevel", level);
    window.location.href = "/";
  };

  // Group results by technology
  const grouped = useMemo(() => {
    const map = {};
    results.forEach((r) => {
      const track = (r.technology || "General").toUpperCase();
      if (!map[track]) map[track] = [];
      map[track].push(r);
    });
    return map;
  }, [results]);

  if (loading) {
    return (
      <div className={resultStyles.pageContainer}>
        <div className={resultStyles.container}>
          <div className={resultStyles.loadingContainer}>
            Loading results...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-purple-50">
      {/* Scrollable container with smooth scrolling */}
      <div
        className="h-screen overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
          scrollBehavior: "smooth",
        }}
      >
        {/* Sticky Header Section - No border line */}
        <div className="sticky top-0 z-20 bg-linear-to-br from-indigo-50 via-sky-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
            <h1 className="text-2xl md:text-3xl font-semibold">Quiz Results</h1>
          </div>
          {/* REMOVED: border-b border-gray-200 */}
        </div>

        {/* Sticky Filter Section - No border line */}
        <div className="sticky top-15 z-10 bg-linear-to-br from-indigo-50 via-sky-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">
                Filter by tech:
              </span>

              <button
                onClick={() => {
                  setSelectedTechnology("all");
                  setTimeout(() => fetchResults(), 0);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm transition-all cursor-pointer ${
                  selectedTechnology === "all"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                All
              </button>

              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    setSelectedTechnology(tech);
                    setTimeout(() => fetchResults(), 0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm transition-all cursor-pointer ${
                    selectedTechnology === tech
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {selectedTechnology === "all"
                ? "Showing all technologies"
                : `Filtering: ${selectedTechnology}`}
            </div>
          </div>
          {/* REMOVED: border-b border-gray-200 */}
        </div>

        {/* Scrollable Content */}
        <div className="max-w-6xl mx-auto px-4 pb-32 pt-2">
          {error && (
            <div className="text-center py-12 text-gray-600">{error}</div>
          )}

          {Object.keys(grouped).length === 0 && !error ? (
            <div className="text-center py-12 text-gray-600 bg-white/50 rounded-2xl">
              No results yet. Take a quiz to see results here.
            </div>
          ) : (
            Object.entries(grouped).map(([track, items]) => (
              <section key={track} className="mb-8">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                  {track} Track
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((item) => (
                    <StripCard
                      key={item._id}
                      item={item}
                      onRemove={openRemoveDialog}
                      onRetake={retakeQuiz}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {/* Scrollbar styling */}
      <style>{`
      .overflow-y-auto {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f5f9;
      }
      .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
      }
      .overflow-y-auto::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 10px;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 10px;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      .scroll-smooth {
        scroll-behavior: smooth;
      }
    `}</style>

      <CustomDialog
        isOpen={dialogOpen}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        title="Remove Result"
        message="Are you sure you want to remove this result?"
      />
    </div>
  );
};

export default MyResult;
