import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>;

export default function LoginResetPassword({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, realm, auth, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  const hasUsernameError = messagesPerField.existsError("username");
  const usernameLabel = realm.loginWithEmailAllowed
    ? realm.duplicateEmailsAllowed
      ? msg("username")
      : msg("email")
    : msg("username");

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("emailForgotTitle")}
      displayMessage={!hasUsernameError}
      infoNode={
        <a href={url.loginUrl} className="text-primary hover:underline">
          {msg("backToLogin")}
        </a>
      }
    >
      <form action={url.loginResetCredentialsUrl} method="post" className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{msg("emailInstruction")}</p>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">{usernameLabel}</Label>
          <Input
            id="username"
            name="username"
            type={realm.loginWithEmailAllowed && !realm.duplicateEmailsAllowed ? "email" : "text"}
            autoFocus
            autoComplete={realm.loginWithEmailAllowed ? "email" : "username"}
            defaultValue={auth.attemptedUsername ?? ""}
            aria-invalid={hasUsernameError}
            className={cn(hasUsernameError && "border-destructive")}
          />
          {hasUsernameError && (
            <p className="text-sm text-destructive" aria-live="polite">
              {messagesPerField.get("username")}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          {msgStr("doSubmit")}
        </Button>
      </form>
    </Template>
  );
}
