import { useState, lazy, Suspense } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

const UserProfileFormFields = lazy(() => import("keycloakify/login/UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

type Props = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>;

export default function Register({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey } = kcContext;
  const { msg, msgStr } = i18n;
  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("registerTitle")}
      displayMessage={messagesPerField.exists("global")}
    >
      <form action={url.registrationAction} method="post" className="flex flex-col gap-4">
        <Suspense>
          <UserProfileFormFields
            kcContext={kcContext}
            i18n={i18n}
            kcClsx={kcClsx}
            onIsFormSubmittableValueChange={setIsFormSubmittable}
            doMakeUserConfirmPassword={doMakeUserConfirmPassword}
          />
        </Suspense>

        {recaptchaRequired && recaptchaSiteKey && (
          <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} />
        )}

        <div className="flex flex-col gap-2 pt-2">
          <Button type="submit" className="w-full" disabled={!isFormSubmittable}>
            {msgStr("doRegister")}
          </Button>
          <Button variant="ghost" className="w-full" render={<a href={url.loginUrl} />}>
            {msg("backToLogin")}
          </Button>
        </div>
      </form>
    </Template>
  );
}
