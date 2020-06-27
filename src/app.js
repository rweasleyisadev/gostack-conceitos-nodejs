const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.get("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(400).send();

  return response.json(repo);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(400).send();

  repo.title = request.body.title;
  repo.url = request.body.url;
  repo.techs = request.body.techs;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(400).send();

  const index = repositories.indexOf(repo);
  if (index > -1) {
    repositories.splice(index, 1);
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(400).send();

  repo.likes += 1;

  return response.json(repo);
});

module.exports = app;
