import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { WeppinoLogo } from "@/components/WeppinoLogo";

type Props = TemplateProps<KcContext, I18n>;

export default function Template(props: Props) {
  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    children,
    displayMessage = true,
    headerNode,
    socialProvidersNode,
    infoNode,
    documentTitle,
  } = props;

  const { msg, currentLanguage, enabledLanguages } = i18n;
  const { realm } = kcContext;

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  useEffect(() => {
    document.title = documentTitle ?? String(msg("loginTitle", realm.displayName));
  }, []);

  if (!isReadyToRender) {
    return null;
  }

  const showLanguageSwitcher = realm.internationalizationEnabled && enabledLanguages.length > 1;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top bar — always reserves space so the card never slides under it */}
        <div className="flex items-center justify-between px-4 h-14 shrink-0">
          {showLanguageSwitcher ? (
            <select
              className="text-sm bg-transparent text-muted-foreground border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
              value={currentLanguage.languageTag}
              onChange={(e) => {
                const lang = enabledLanguages.find((l) => l.languageTag === e.target.value);
                if (lang) window.location.href = lang.href;
              }}
            >
              {enabledLanguages.map((lang) => (
                <option key={lang.languageTag} value={lang.languageTag}>
                  {lang.label}
                </option>
              ))}
            </select>
          ) : (
            <span />
          )}
          <ThemeToggle />
        </div>

        {/* Content — centres the card in the remaining viewport height */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-8 flex flex-col gap-6">
            <div className="flex justify-center">
              <WeppinoLogo className="h-16 w-auto select-none" />
            </div>

            {headerNode && (
              <h1 className="font-serif text-2xl font-normal text-foreground text-center -mt-2">
                {headerNode}
              </h1>
            )}

            {displayMessage && kcContext.message !== undefined && (
              <AlertBanner type={kcContext.message.type} summary={kcContext.message.summary} />
            )}

            <div className="flex flex-col gap-4">{children}</div>

            {socialProvidersNode}

            {infoNode && <p className="text-center text-sm text-muted-foreground">{infoNode}</p>}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

function AlertBanner({
  type,
  summary,
}: {
  type: "success" | "warning" | "error" | "info";
  summary: string;
}) {
  const variantMap = {
    error: "destructive",
    warning: "default",
    success: "default",
    info: "default",
  } as const;

  const Icon = { error: AlertCircle, warning: AlertTriangle, success: CheckCircle, info: Info }[
    type
  ];

  return (
    <Alert variant={variantMap[type]}>
      <Icon className="size-4" />
      <AlertDescription dangerouslySetInnerHTML={{ __html: summary }} />
    </Alert>
  );
}
