import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { WeppinoLogo } from "@/components/WeppinoLogo";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  User,
  Lock,
  ShieldCheck,
  Link2,
  Monitor,
  AppWindow,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = TemplateProps<KcContext, I18n>;

const NAV_ITEMS = [
  { id: "account", labelKey: "editAccountHtmlTitle", icon: User, urlKey: "accountUrl" },
  {
    id: "password",
    labelKey: "changePasswordHtmlTitle",
    icon: Lock,
    urlKey: "passwordUrl",
    feature: "passwordUpdateSupported" as const,
  },
  { id: "totp", labelKey: "authenticatorTitle", icon: ShieldCheck, urlKey: "totpUrl" },
  {
    id: "federatedIdentity",
    labelKey: "federatedIdentitiesHtmlTitle",
    icon: Link2,
    urlKey: "socialUrl",
    feature: "identityFederation" as const,
  },
  { id: "sessions", labelKey: "sessionsHtmlTitle", icon: Monitor, urlKey: "sessionsUrl" },
  {
    id: "applications",
    labelKey: "applicationsHtmlTitle",
    icon: AppWindow,
    urlKey: "applicationsUrl",
    feature: "authorization" as const,
  },
  {
    id: "log",
    labelKey: "accountLogHtmlTitle",
    icon: ScrollText,
    urlKey: "logUrl",
    feature: "log" as const,
  },
] as const;

export default function Template(props: Props) {
  const { kcContext, i18n, doUseDefaultCss, children, active } = props;

  const { msg, msgStr } = i18n;
  const { url, features, message } = kcContext;

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  useEffect(() => {
    document.title = msgStr("editAccountHtmlTitle");
  }, []);

  if (!isReadyToRender) return null;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-border">
          <WeppinoLogo className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={url.logoutUrl}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {msg("doSignOut")}
            </a>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <nav className="w-56 shrink-0 border-r border-border flex flex-col gap-1 p-3 bg-card">
            {NAV_ITEMS.map((item) => {
              if ("feature" in item && !features[item.feature as keyof typeof features])
                return null;
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={url[item.urlKey as keyof typeof url] as string}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {msg(item.labelKey)}
                </a>
              );
            })}
          </nav>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
            <div className="w-full flex flex-col gap-6">
              {message !== undefined && (
                <AlertBanner type={message.type} summary={message.summary} />
              )}
              {children}
            </div>
          </main>
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
