import { render } from "@jsonresume/jsonresume-theme-professional";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
async function renderJson() {
  const componentsOrder = [
    "Hero",
    "Summary",
    "Work",
    "Education",
    "Certificates",
    "Skills",
    "Languages",
    "Volunteer",
    "Publications",
    "Awards",
    "Interests",
    "References",
  ];
  const jsonText = await Bun.file("./resume.json").text();
  const resumeJson = await JSON.parse(jsonText);
  return render(resumeJson, componentsOrder);
}
const app = new Hono();
app.get("/", async (c) => {
  const html = await renderJson();
  return c.html(html);
});

app.use("*", serveStatic({ root: "./public" }));
app.use("/*", serveStatic({ root: "./public", path: "index.html" }));

export default app;
