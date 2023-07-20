if (typeof window !== "undefined") {
  window.global = window;
  global.Buffer = global.Buffer || require("buffer").Buffer;
  global.process = require("process");
}
