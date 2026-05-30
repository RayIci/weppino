import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppWindow, ExternalLink } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>;

export default function Applications({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, applications, stateChecker } = kcContext;
  const { msg, msgStr } = i18n;
  const apps = applications?.applications ?? [];

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="applications"
    >
      <h1 className="font-serif text-2xl font-normal">{msg("applicationsHtmlTitle")}</h1>

      {apps.length === 0 ? (
        // Empty state: full width, centred
        <div className="flex flex-col items-center gap-3 py-16 text-center w-full">
          <AppWindow className="size-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{msg("noApplications")}</p>
        </div>
      ) : (
        // App list: constrained width
        <div className="max-w-lg flex flex-col gap-3">
          {apps.map((app, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-4 rounded-xl border border-border bg-card gap-4"
            >
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">
                    {app.client?.name || app.client?.clientId || "—"}
                  </span>
                  {app.effectiveUrl && (
                    <a
                      href={app.effectiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary shrink-0"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
                {(app.clientScopesGranted ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">
                      {msg("grantedPermissions")}:
                    </span>
                    {(app.clientScopesGranted ?? []).map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
                {(app.additionalGrants ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">
                      {msg("additionalGrants")}:
                    </span>
                    {(app.additionalGrants ?? []).map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {app.client?.consentRequired && (
                <form action={url.applicationsUrl} method="post" className="shrink-0">
                  <input type="hidden" name="stateChecker" value={stateChecker} />
                  <input type="hidden" name="clientId" value={app.client?.clientId} />
                  <input type="hidden" name="submitAction" value="revoke" />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    {msgStr("doRemove")}
                  </Button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </Template>
  );
}
