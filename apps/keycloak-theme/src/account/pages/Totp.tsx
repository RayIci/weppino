import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, QrCode, Hash, Trash2 } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>;

export default function Totp({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { url, totp, mode, stateChecker, isAppInitiatedAction, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="totp"
    >
      <div className="max-w-lg flex flex-col gap-4">
        <h1 className="font-serif text-2xl font-normal">{msg("authenticatorTitle")}</h1>

        {/* Existing credentials */}
        {totp.otpCredentials.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {msg("configureAuthenticators")}
            </p>
            {totp.otpCredentials.map((cred) => (
              <div
                key={cred.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <span className="text-sm">{cred.userLabel || cred.id}</span>
                </div>
                <form action={url.totpUrl} method="post">
                  <input type="hidden" name="stateChecker" value={stateChecker} />
                  <input type="hidden" name="submitAction" value="Delete" />
                  <input type="hidden" name="credentialId" value={cred.id} />
                  <Button type="submit" variant="ghost" size="icon-sm">
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </form>
              </div>
            ))}
          </div>
        )}

        {/* Setup new authenticator */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium">{msg("totpStep1")}</p>
          <div className="flex flex-wrap gap-2">
            {totp.supportedApplications.map((app) => (
              <Badge key={app} variant="secondary">
                {app}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue={mode ?? "qr"} className="w-full">
            <TabsList>
              <TabsTrigger value="qr">
                <QrCode className="size-4" data-icon="inline-start" />
                {msg("totpStep2")}
              </TabsTrigger>
              <TabsTrigger value="manual">
                <Hash className="size-4" data-icon="inline-start" />
                {msg("totpManualStep2")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="qr" className="mt-4">
              <div className="flex justify-center p-4 bg-white rounded-lg border border-border w-fit">
                {/* totpSecretQrCode is a base64-encoded PNG — qrUrl is a navigation link, not an image */}
                <img
                  src={`data:image/png;base64,${totp.totpSecretQrCode}`}
                  alt="QR Code"
                  className="size-40"
                />
              </div>
            </TabsContent>
            <TabsContent value="manual" className="mt-4 flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">{msg("totpManualStep3")}</p>
              <code className="px-3 py-2 rounded-md bg-muted font-mono text-sm break-all">
                {totp.totpSecretEncoded}
              </code>
              <a href={totp.manualUrl} className="text-sm text-primary hover:underline">
                {msg("totpStep3")}
              </a>
            </TabsContent>
          </Tabs>

          <form action={url.totpUrl} method="post" className="flex flex-col gap-4">
            <input type="hidden" name="stateChecker" value={stateChecker} />
            <input type="hidden" name="totpSecret" value={totp.totpSecret} />
            <input type="hidden" name="userLabel" value="" />

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="totp">{msg("authenticatorCode")}</Label>
              <Input
                id="totp"
                name="totp"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={8}
                className="w-40 font-mono text-lg tracking-widest text-center"
                aria-invalid={messagesPerField.existsError("totp")}
              />
              {messagesPerField.existsError("totp") && (
                <p className="text-sm text-destructive">{messagesPerField.get("totp")}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button type="submit" name="submitAction" value="Save">
                {msgStr("doSave")}
              </Button>
              {isAppInitiatedAction && (
                <Button type="submit" name="submitAction" value="Cancel" variant="ghost">
                  {msgStr("doCancel")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
