import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
const UserProfileFormFields = lazy(() => import("keycloakify/login/UserProfileFormFields"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Info = lazy(() => import("./pages/Info"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const pageProps = { kcContext, i18n, Template, doUseDefaultCss: false, classes };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return <Login {...pageProps} kcContext={kcContext} />;
          case "register.ftl":
            return <Register {...pageProps} kcContext={kcContext} />;
          case "login-reset-password.ftl":
            return <LoginResetPassword {...pageProps} kcContext={kcContext} />;
          case "login-verify-email.ftl":
            return <LoginVerifyEmail {...pageProps} kcContext={kcContext} />;
          case "login-update-password.ftl":
            return <LoginUpdatePassword {...pageProps} kcContext={kcContext} />;
          case "login-update-profile.ftl":
            return <LoginUpdateProfile {...pageProps} kcContext={kcContext} />;
          case "login-page-expired.ftl":
            return <LoginPageExpired {...pageProps} kcContext={kcContext} />;
          case "error.ftl":
            return <ErrorPage {...pageProps} kcContext={kcContext} />;
          case "info.ftl":
            return <Info {...pageProps} kcContext={kcContext} />;
          case "logout-confirm.ftl":
            return <LogoutConfirm {...pageProps} kcContext={kcContext} />;
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}

// These classes are applied by keycloakify's UserProfileFormFields (Register, UpdateProfile).
// They must mirror our shadcn Input and Label Tailwind strings so unstyled HTML elements
// rendered by keycloakify match our design system when doUseDefaultCss=false.
const classes = {
  kcFormGroupClass: "flex flex-col gap-1.5",
  // flex on the wrapper keeps the label text and the required " *" sibling on one line.
  // Do NOT put flex on kcLabelClass itself — flex makes <label> block-level, pushing * below.
  kcLabelWrapperClass: "flex items-center gap-1",
  kcLabelClass: "text-sm leading-none font-medium select-none",
  kcInputWrapperClass: "",
  kcInputClass:
    "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm",
  kcInputErrorMessageClass: "text-sm text-destructive",
  kcFormClass: "flex flex-col gap-4",
  kcCheckInputClass: "size-4 rounded border-border accent-primary",
  kcCheckLabelClass: "text-sm font-normal cursor-pointer",
} satisfies { [key in ClassKey]?: string };
