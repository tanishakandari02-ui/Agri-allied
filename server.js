const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory data
let crops = [
  { id: 1, name: "Wheat", season: "Rabi" },
  { id: 2, name: "Rice", season: "Kharif" }
];

// GET All Crops
app.get("/api/crops", (req, res) => {
  res.status(200).json(crops);
});

// GET Single Crop
app.get("/api/crops/:id", (req, res) => {
  const crop = crops.find(c => c.id == req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  res.status(200).json(crop);
});

// POST Crop
app.post("/api/crops", (req, res) => {
  const newCrop = {
    id: crops.length + 1,
    name: req.body.name,
    season: req.body.season
  };

  crops.push(newCrop);

  res.status(201).json(newCrop);
});

// PUT Crop
app.put("/api/crops/:id", (req, res) => {
  const crop = crops.find(c => c.id == req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  crop.name = req.body.name;
  crop.season = req.body.season;

  res.status(200).json(crop);
});

// DELETE Crop
app.delete("/api/crops/:id", (req, res) => {
  crops = crops.filter(c => c.id != req.params.id);

  res.status(204).send();
});

// SEARCH Crop
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const result = crops.filter(c =>
    c.name.toLowerCase().includes(q)
  );

  res.status(200).json(result);
});

app.get("/", (req, res) => {
  res.send("Agri-Allied Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});