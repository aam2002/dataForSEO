import express from "express";
import axios from "axios";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";

//config env
dotenv.config();

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(cors());

//routes
app.post("/data", (req, res) => {
  const { url } = req.body;
  const post_array = [];
  post_array.push({
    target: `${url}`,
    max_crawl_pages: 10,
    load_resources: true,
    enable_javascript: true,
    enable_browser_rendering: true,
    tag: "some-str",
    pingback_url: "https://www.youtube.com/",
  });
  axios({
    method: "post",
    url: "https://api.dataforseo.com/v3/on_page/task_post",
    auth: {
      username: `${process.env.LOGIN}`,
      password: `${process.env.PASSWORD}`,
    },
    data: post_array,
    headers: {
      "content-type": "application/json",
    },
  })
    .then(function(response) {
      var result = response["data"]["tasks"];
      // Result data
      res.status(200).send({
        sucess: "true",
        message: "pending",
        result: result[0].id,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});
app.get("/data", (req, res) => {
  const { id } = req.body;
  const post_array = [];
  post_array.push({
    id: `${id}`,
    limit: 10,
  });
  axios({
    method: "post",
    url: "https://api.dataforseo.com/v3/on_page/pages",
    auth: {
      username: `${process.env.LOGIN}`,
      password: `${process.env.PASSWORD}`,
    },
    data: post_array,
    headers: {
      "content-type": "application/json",
    },
  })
    .then(function(response) {
      var result = response["data"]["tasks"];
      console.log(result);
      res.status(201).send(result[0].result[0].items[0]);
    })
    .catch(function(error) {
      console.log(error);
    });
});

//host
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`.blue);
});
