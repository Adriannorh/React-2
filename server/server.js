const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { handleUsers } = require("./pass");
const PORT = 3006;
const app = express();
const API_GA = "http://localhost/ga";

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Login Route
app.post("/api/login", handleUsers);

// Medlem
app.get("/ga/members", async (req, res) => {
  try {
    const response = await axios.get(`${API_GA}/members`);
    /* console.log(response); */
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/ga/members/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_GA}/members/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/ga/members/", async (req, res) => {
  try {
    const response = await axios.post(
      `${API_GA}/members/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/ga/members/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${API_GA}/members/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/ga/members/:memberNumber", async (req, res) => {
  const memberNumber = req.params.memberNumber;

  console.log("Attempting to delete member with Member Number:", memberNumber);

  if (!memberNumber || memberNumber === "undefined") {
    return res.status(400).send("Invalid member Number provided");
  }

  try {
    const response = await axios.delete(`${API_GA}/members/${memberNumber}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).send(error.message);
  }
});

// Race
app.get("/ga/races", async (req, res) => {
  try {
    const res = await axios.get(`${API_GA}/races`);
    console.log(res);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/ga/races/:id", async (req, res) => {
  try {
    const res = await axios.get(`${API_GA}/races/${req.params.id}`);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/ga/races/:id", async (req, res) => {
  try {
    const res = await axios.post(`${API_GA}/races/${req.params.id}`, req.body);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/ga/races/:id", async (req, res) => {
  try {
    const res = await axios.put(`${API_GA}/races/${req.params.id}`, req.body);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/ga/races/:id", async (req, res) => {
  try {
    const res = await axios.delete(`${API_GA}/races/${req.params.id}`);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Resultat
app.get("/ga/results", async (req, res) => {
  try {
    const res = await axios.get(`${API_GA}/results`);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

<<<<<<< HEAD
app.get('/ga/members/:id/results', async (req, res) => {
    try {
        const axiosResponse = await axios.get(`${API_GA}/members/${req.params.id}/results`);  // endret variabelnavnet til axiosResponse
        res.json(axiosResponse.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/ga/results/:distance', async (req, res) => {
    try {
        const response = await axios.get(`${API_GA}/results/${req.params.distance}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
=======
app.get("/ga/members/:id/results", async (req, res) => {
  try {
    const res = await axios.get(`${API_GA}/members/${req.params.id}/results`);
    res.json(res.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/ga/results/:distance", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_GA}/results/${req.params.distance}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
>>>>>>> a1daf781159e79398f11103a049f43f891cba6a3
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
