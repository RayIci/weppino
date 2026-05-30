import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>;

export default function Account({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { url, realm, account, messagesPerField, stateChecker } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="account"
    >
      <div className="max-w-lg flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-serif text-2xl font-normal">{msg("editAccountHtmlTitle")}</h1>
          <p className="text-sm text-muted-foreground">{msg("personalInfoHtmlTitle")}</p>
        </div>

        <form action={url.accountUrl} method="post" className="flex flex-col gap-4">
          <input type="hidden" name="stateChecker" value={stateChecker} />

          {!realm.registrationEmailAsUsername && (
            <Field
              label={msg("username")}
              htmlFor="username"
              error={messagesPerField.get("username")}
              hasError={messagesPerField.existsError("username")}
            >
              <Input
                id="username"
                name="username"
                defaultValue={account.username ?? ""}
                disabled={!realm.editUsernameAllowed}
                aria-invalid={messagesPerField.existsError("username")}
                className={cn(!realm.editUsernameAllowed && "opacity-60 cursor-not-allowed")}
              />
            </Field>
          )}

          <Field
            label={msg("email")}
            htmlFor="email"
            error={messagesPerField.get("email")}
            hasError={messagesPerField.existsError("email")}
          >
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={account.email ?? ""}
              aria-invalid={messagesPerField.existsError("email")}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label={msg("firstName")}
              htmlFor="firstName"
              error={messagesPerField.get("firstName")}
              hasError={messagesPerField.existsError("firstName")}
            >
              <Input
                id="firstName"
                name="firstName"
                defaultValue={account.firstName ?? ""}
                aria-invalid={messagesPerField.existsError("firstName")}
              />
            </Field>
            <Field
              label={msg("lastName")}
              htmlFor="lastName"
              error={messagesPerField.get("lastName")}
              hasError={messagesPerField.existsError("lastName")}
            >
              <Input
                id="lastName"
                name="lastName"
                defaultValue={account.lastName ?? ""}
                aria-invalid={messagesPerField.existsError("lastName")}
              />
            </Field>
          </div>

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

function Field({
  label,
  htmlFor,
  error,
  hasError,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  error?: string;
  hasError: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hasError && error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
