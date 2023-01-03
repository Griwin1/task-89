import "./scss/app.scss";
import Application from "./js/Application";

window.addEventListener ("DOMContentLoaded",  async () => {
  // This block will be executed once the page is loaded and ready
  const app = new Application();
  await app.load();
  // Used to access the app instance by the automated tests
  window.__JS_APP = app;
});
