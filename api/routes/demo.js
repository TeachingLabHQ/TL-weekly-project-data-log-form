const express = require("express");
const router = express.Router();
const db = require("./firebase");
var fetch = require("node-fetch");

const { getDocs, collection } = require("firebase/firestore");

//firebase-not currently using
router.get("/info", async (req, res, next) => {
  const allDocData = [];
  console.log(req.query.myParam);
  const docs = await getDocs(collection(db, req.query.myParam));
  docs.forEach((doc) => allDocData.push(doc.data()));
  res.json({ result: allDocData });
});

//get data from Monday
router.post("/getMonday", async (req, res, next) => {
  fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
      "API-Version": "2023-10",
    },
    body: JSON.stringify({
      query: req.body.query,
      // 'variables' : JSON.stringify(req.body.vars)
    }),
  })
    .then((res) => res.json())
    .then((result) => res.status(200).send(result));
  // .then(res => console.log(JSON.stringify(res, null, 2)));
});

//upload data to Monday
router.post("/boardUpdate", async (req, res, next) => {
  fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
      "API-Version": "2025-07",
    },
    body: JSON.stringify({
      query: req.body.query,
      variables: req.body.vars,
    }),
  })
    .then((res) => res.json())
    .then((result) => res.status(200).send(result));
  // .then(res => console.log(JSON.stringify(res, null, 2)));
});

module.exports = router;
