import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "login.ftl",
        overrides: {}
    });
}
*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {!window.kcContext ? (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground font-serif text-lg">No Keycloak Context</p>
        </div>
      ) : (
        <KcPage kcContext={window.kcContext} />
      )}
    </ThemeProvider>
  </StrictMode>
);
