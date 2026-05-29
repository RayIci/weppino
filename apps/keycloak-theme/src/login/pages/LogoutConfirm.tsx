import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>;

export default function LogoutConfirm({
  kcContext,
  i18n,
  doUseDefaultCss,
  Template,
  classes,
}: Props) {
  const { url, client, logoutConfirm } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("logoutConfirmTitle")}
      displayMessage={false}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="size-14 rounded-full bg-muted flex items-center justify-center">
            <LogOut className="size-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">{msg("logoutConfirmHeader")}</p>
        </div>

        <form action={url.logoutConfirmAction} method="POST" className="flex flex-col gap-2">
          <input type="hidden" name="session_code" value={logoutConfirm.code} />
          <Button type="submit" name="confirmLogout" className="w-full">
            {msgStr("doLogout")}
          </Button>
        </form>

        {!logoutConfirm.skipLink && client.baseUrl && (
          <Button variant="ghost" className="w-full" render={<a href={client.baseUrl} />}>
            {msg("backToApplication")}
          </Button>
        )}
      </div>
    </Template>
  );
}
