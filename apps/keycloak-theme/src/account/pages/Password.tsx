import { useState } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>;

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
      {hasError && errorText && <p className="text-sm text-destructive">{errorText}</p>}
    </div>
  );
}

export default function Password({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { url, stateChecker, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="password"
    >
      <div className="max-w-lg flex flex-col gap-4">
        <h1 className="font-serif text-2xl font-normal">{msg("changePasswordHtmlTitle")}</h1>

        <form action={url.passwordUrl} method="post" className="flex flex-col gap-4">
          <input type="hidden" name="stateChecker" value={stateChecker} />
          <input type="hidden" name="submitAction" value="Save" />
          {/* Hidden for password managers */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="sr-only"
            readOnly
            tabIndex={-1}
          />

          <PasswordField
            id="password"
            name="password"
            label={msg("currentPassword")}
            autoComplete="current-password"
            hasError={messagesPerField.existsError("password")}
            errorText={messagesPerField.get("password")}
          />
          <PasswordField
            id="password-new"
            name="password-new"
            label={msg("passwordNew")}
            autoComplete="new-password"
            hasError={messagesPerField.existsError("password-new")}
            errorText={messagesPerField.get("password-new")}
          />
          <PasswordField
            id="password-confirm"
            name="password-confirm"
            label={msg("passwordConfirm")}
            autoComplete="new-password"
            hasError={messagesPerField.existsError("password-confirm")}
            errorText={messagesPerField.get("password-confirm")}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit">{msgStr("doSave")}</Button>
            <Button type="submit" name="cancel" variant="ghost">
              {msgStr("doCancel")}
            </Button>
          </div>
        </form>
      </div>
    </Template>
  );
}
