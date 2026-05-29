import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>;

export default function LoginVerifyEmail({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, user } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("emailVerifyTitle")}
      displayMessage={false}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
          <MailCheck className="size-7 text-primary" />
        </div>

        <p className="text-sm text-foreground">
          {msg("emailVerifyInstruction1", user?.email ?? "")}
        </p>

        <div className="w-full h-px bg-border" />

        <p className="text-sm text-muted-foreground">
          {msg("emailVerifyInstruction2")}{" "}
          <Button
            variant="link"
            className="h-auto p-0 text-sm"
            render={<a href={url.loginAction} />}
          >
            {msg("doClickHere")}
          </Button>{" "}
          {msg("emailVerifyInstruction3")}
        </p>
      </div>
    </Template>
  );
}
