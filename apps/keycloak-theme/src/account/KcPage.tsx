import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import Template from "./Template";

const AccountPage = lazy(() => import("./pages/Account"));
const PasswordPage = lazy(() => import("./pages/Password"));
const SessionsPage = lazy(() => import("./pages/Sessions"));
const TotpPage = lazy(() => import("./pages/Totp"));
const LogPage = lazy(() => import("./pages/Log"));
const ApplicationsPage = lazy(() => import("./pages/Applications"));
const FederatedPage = lazy(() => import("./pages/FederatedIdentity"));

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const pageProps = { kcContext, i18n, Template, doUseDefaultCss: false, classes };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "account.ftl":
            return <AccountPage {...pageProps} kcContext={kcContext} />;
          case "password.ftl":
            return <PasswordPage {...pageProps} kcContext={kcContext} />;
          case "sessions.ftl":
            return <SessionsPage {...pageProps} kcContext={kcContext} />;
          case "totp.ftl":
            return <TotpPage {...pageProps} kcContext={kcContext} />;
          case "log.ftl":
            return <LogPage {...pageProps} kcContext={kcContext} />;
          case "applications.ftl":
            return <ApplicationsPage {...pageProps} kcContext={kcContext} />;
          case "federatedIdentity.ftl":
            return <FederatedPage {...pageProps} kcContext={kcContext} />;
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
        }
      })()}
    </Suspense>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
