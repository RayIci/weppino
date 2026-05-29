import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>;

export default function LoginPageExpired({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("pageExpiredTitle")}
      displayMessage={false}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="size-14 rounded-full bg-muted flex items-center justify-center">
          <Clock className="size-7 text-muted-foreground" />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm text-muted-foreground">{msg("pageExpiredMsg1")}</p>
          <Button
            variant="default"
            className="w-full"
            render={<a href={url.loginRestartFlowUrl} />}
          >
            {msg("doClickHere")}
          </Button>
        </div>

        <div className="w-full h-px bg-border" />

        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm text-muted-foreground">{msg("pageExpiredMsg2")}</p>
          <Button variant="outline" className="w-full" render={<a href={url.loginAction} />}>
            {msg("doClickHere")}
          </Button>
        </div>
      </div>
    </Template>
  );
}
