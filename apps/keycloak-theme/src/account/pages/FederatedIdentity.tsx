import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, Link2Off } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, I18n>;

export default function FederatedIdentity({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, federatedIdentity, stateChecker } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="federatedIdentity"
    >
      <div className="max-w-lg flex flex-col gap-4">
        <h1 className="font-serif text-2xl font-normal">{msg("federatedIdentitiesHtmlTitle")}</h1>

        <div className="flex flex-col gap-3">
          {federatedIdentity.identities.map((identity) => (
            <div
              key={identity.providerId}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-8 rounded-full flex items-center justify-center ${identity.connected ? "bg-primary/10" : "bg-muted"}`}
                >
                  {identity.connected ? (
                    <Link2 className="size-4 text-primary" />
                  ) : (
                    <Link2Off className="size-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {identity.displayName || identity.providerId}
                  </span>
                  {identity.connected && identity.userName && (
                    <span className="text-xs text-muted-foreground">{identity.userName}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={identity.connected ? "secondary" : "outline"} className="text-xs">
                  {identity.connected ? msg("connected") : msg("disconnected")}
                </Badge>
                {identity.connected && federatedIdentity.removeLinkPossible && (
                  <form action={url.socialUrl} method="post">
                    <input type="hidden" name="stateChecker" value={stateChecker} />
                    <input type="hidden" name="action" value="remove" />
                    <input type="hidden" name="providerId" value={identity.providerId} />
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
                {!identity.connected && (
                  <Button
                    size="sm"
                    render={
                      <a href={`${url.socialUrl}?action=add&providerId=${identity.providerId}`} />
                    }
                  >
                    {msgStr("doAdd")}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Template>
  );
}
