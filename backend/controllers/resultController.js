export async function createResult(req, res) {
  try {
    console.log("=== CREATE RESULT CALLED ===");
    console.log("Headers:", req.headers);
    console.log("User ID from middleware:", req.userId);
    console.log("Request body:", req.body);

    if (!req.userId) {
      console.log("No userId found!");
      return res.status(401).json({
        success: false,
        message: "Not authorized - no user ID",
      });
    }

    const { title, technology, level, totalQuestions, correct, wrong } =
      req.body;

    if (
      !technology ||
      !level ||
      totalQuestions === undefined ||
      correct === undefined
    ) {
      console.log("Missing fields:", {
        technology,
        level,
        totalQuestions,
        correct,
      });
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const total = Number(totalQuestions);
    const correctNum = Number(correct);
    const wrongNum =
      wrong !== undefined ? Number(wrong) : Math.max(0, total - correctNum);
    const score = total ? Math.round((correctNum / total) * 100) : 0;

    let performance = "Needs Work";
    if (score >= 85) performance = "Excellent";
    else if (score >= 65) performance = "Good";
    else if (score >= 45) performance = "Average";

    const resultData = {
      user: req.userId,
      title: String(title).trim(),
      technology: technology.toLowerCase(),
      level: level.toLowerCase(),
      totalQuestions: total,
      correct: correctNum,
      wrong: wrongNum,
      score: score,
      performance: performance,
    };

    console.log("Creating result with data:", resultData);

    const created = await Result.create(resultData);

    console.log("Result saved successfully:", created._id);

    return res.status(201).json({
      success: true,
      message: "Result Created",
      result: created,
    });
  } catch (err) {
    console.error("CreateResult Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
}

export async function listResults(req, res) {
  try {
    console.log("listResults called");
    console.log("req.userId:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { technology } = req.query;
    const query = { user: req.userId };

    if (technology && technology.toLowerCase() !== "all") {
      query.technology = technology.toLowerCase();
    }

    console.log("Query:", query);

    const items = await Result.find(query).sort({ createdAt: -1 });

    console.log(`Found ${items.length} results`);

    return res.json({
      success: true,
      results: items,
    });
  } catch (err) {
    console.error("ListResult Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
}

export async function deleteResult(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const resultId = req.params.id;
    console.log("Deleting result:", resultId);
    console.log("User ID:", req.userId);

    const result = await Result.findOne({ _id: resultId, user: req.userId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    await Result.deleteOne({ _id: resultId });

    console.log("Result deleted successfully");

    return res.json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (err) {
    console.error("DeleteResult Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
}
