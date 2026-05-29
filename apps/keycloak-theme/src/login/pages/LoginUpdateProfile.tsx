import { useState, lazy, Suspense } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

const UserProfileFormFields = lazy(() => import("keycloakify/login/UserProfileFormFields"));

const doMakeUserConfirmPassword = false;

type Props = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n>;

export default function LoginUpdateProfile({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, isAppInitiatedAction } = kcContext;
  const { msg, msgStr } = i18n;
  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("loginProfileTitle")}
    >
      <form action={url.loginAction} method="post" className="flex flex-col gap-4">
        <Suspense>
          <UserProfileFormFields
            kcContext={kcContext}
            i18n={i18n}
            kcClsx={kcClsx}
            onIsFormSubmittableValueChange={setIsFormSubmittable}
            doMakeUserConfirmPassword={doMakeUserConfirmPassword}
          />
        </Suspense>

        <div className="flex flex-col gap-2 pt-2">
          <Button type="submit" className="w-full" disabled={!isFormSubmittable}>
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
