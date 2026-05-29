import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>;

export default function Login({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext;
  const { msg, msgStr } = i18n;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasFieldError = messagesPerField.existsError("username", "password");

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!hasFieldError}
      headerNode={msg("loginAccountTitle")}
      socialProvidersNode={
        realm.password && social?.providers && social.providers.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-3 text-xs text-muted-foreground">
                {msg("identity-provider-login-label")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {social.providers.map((p) => (
                <Button
                  key={p.alias}
                  variant="outline"
                  className="w-full"
                  render={<a href={p.loginUrl} />}
                >
                  {p.iconClasses && <i className={p.iconClasses} aria-hidden="true" />}
                  <span dangerouslySetInnerHTML={{ __html: p.displayName }} />
                </Button>
              ))}
            </div>
          </div>
        ) : null
      }
      infoNode={
        realm.password && realm.registrationAllowed && !registrationDisabled ? (
          <>
            {msg("noAccount")}{" "}
            <a href={url.registrationUrl} className="text-primary font-medium hover:underline">
              {msg("doRegister")}
            </a>
          </>
        ) : null
      }
    >
      {realm.password && (
        <form
          action={url.loginAction}
          method="post"
          onSubmit={() => setIsSubmitting(true)}
          className="flex flex-col gap-4"
        >
          {/* Username / Email */}
          {!usernameHidden && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">
                {!realm.loginWithEmailAllowed
                  ? msg("username")
                  : !realm.registrationEmailAsUsername
                    ? msg("usernameOrEmail")
                    : msg("email")}
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoFocus
                autoComplete="username"
                defaultValue={login.username ?? ""}
                aria-invalid={hasFieldError}
                className={cn(hasFieldError && "border-destructive")}
              />
              {messagesPerField.existsError("username") && (
                <p className="text-sm text-destructive" aria-live="polite">
                  {messagesPerField.get("username")}
                </p>
              )}
            </div>
          )}

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{msg("password")}</Label>
              {realm.resetPasswordAllowed && (
                <a
                  href={url.loginResetCredentialsUrl}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {msg("doForgotPassword")}
                </a>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-invalid={hasFieldError}
                className={cn("pr-10", hasFieldError && "border-destructive")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={msgStr(showPassword ? "hidePassword" : "showPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {messagesPerField.existsError("password") && (
              <p className="text-sm text-destructive" aria-live="polite">
                {messagesPerField.get("password")}
              </p>
            )}
          </div>

          {/* Remember me */}
          {realm.rememberMe && !usernameHidden && (
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                defaultChecked={!!login.rememberMe}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="rememberMe" className="font-normal cursor-pointer">
                {msg("rememberMe")}
              </Label>
            </div>
          )}

          <input type="hidden" name="credentialId" value={auth.selectedCredential} />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {msgStr("doLogIn")}
              </span>
            ) : (
              msgStr("doLogIn")
            )}
          </Button>
        </form>
      )}
    </Template>
  );
}
