import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

// Calculate directory path
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// Working hours middleware
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(503).sendFile(path.join(__dirName, "public", "closed.html"));
  }
});

// Routes
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirName, "public", "/home"))
);
app.get("/services", (req, res) =>
  res.sendFile(path.join(__dirName, "public", "/services"))
);
app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirName, "public", "/contact"))
);

// Static files
app.use(express.static(path.join(__dirName, "public")));

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirName, "public", "404.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
