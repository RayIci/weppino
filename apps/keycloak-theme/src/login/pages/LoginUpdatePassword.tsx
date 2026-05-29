import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>;

function PasswordField({
  id,
  name,
  label,
  autoComplete,
  hasError,
  errorText,
}: {
  id: string;
  name: string;
  label: React.ReactNode;
  autoComplete: string;
  hasError: boolean;
  errorText?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          className={cn("pr-10", hasError && "border-destructive")}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {hasError && errorText && (
        <p className="text-sm text-destructive" aria-live="polite">
          {errorText}
        </p>
      )}
    </div>
  );
}

export default function LoginUpdatePassword({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, messagesPerField, isAppInitiatedAction } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("updatePasswordTitle")}
      displayMessage={!messagesPerField.existsError("password", "password-confirm")}
    >
      <form action={url.loginAction} method="post" className="flex flex-col gap-4">
        {/* Hidden for password managers */}
        <input type="text" name="username" autoComplete="username" className="sr-only" readOnly />

        <PasswordField
          id="password-new"
          name="password-new"
          label={msg("passwordNew")}
          autoComplete="new-password"
          hasError={messagesPerField.existsError("password")}
          errorText={messagesPerField.get("password")}
        />
        <PasswordField
          id="password-confirm"
          name="password-confirm"
          label={msg("passwordConfirm")}
          autoComplete="new-password"
          hasError={messagesPerField.existsError("password-confirm")}
          errorText={messagesPerField.get("password-confirm")}
        />

        <div className="flex items-center gap-2">
          <input
            id="logout-sessions"
            name="logout-sessions"
            type="checkbox"
            value="on"
            defaultChecked
            className="size-4 rounded border-border accent-primary"
          />
          <Label htmlFor="logout-sessions" className="font-normal cursor-pointer">
            {msg("logoutOtherSessions")}
          </Label>
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            {msgStr("doSubmit")}
          </Button>
          {isAppInitiatedAction && (
            <Button variant="ghost" className="w-full" type="submit" name="cancel-aia" value="true">
              {msg("doCancel")}
            </Button>
          )}
        </div>
      </form>
    </Template>
  );
}
