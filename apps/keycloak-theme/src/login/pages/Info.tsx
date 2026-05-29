import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>;

export default function Info({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { message, messageHeader, requiredActions, skipLink, pageRedirectUri, actionUri, client } =
    kcContext;
  const { msg, advancedMsgStr } = i18n;

  const headerContent = messageHeader ? advancedMsgStr(messageHeader) : message.summary;

  const bodyHtml = (() => {
    let html = message.summary?.trim() ?? "";
    if (requiredActions) {
      html += " <b>";
      html += requiredActions.map((a) => advancedMsgStr(`requiredAction.${a}`)).join(", ");
      html += "</b>";
    }
    return html;
  })();

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={<span dangerouslySetInnerHTML={{ __html: headerContent }} />}
      displayMessage={false}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="size-7 text-primary" />
        </div>

        <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        {!skipLink && (
          <>
            {pageRedirectUri && (
              <Button variant="outline" className="w-full" render={<a href={pageRedirectUri} />}>
                {msg("backToApplication")}
              </Button>
            )}
            {!pageRedirectUri && actionUri && (
              <Button className="w-full" render={<a href={actionUri} />}>
                {msg("proceedWithAction")}
              </Button>
            )}
            {!pageRedirectUri && !actionUri && client.baseUrl && (
              <Button variant="outline" className="w-full" render={<a href={client.baseUrl} />}>
                {msg("backToApplication")}
              </Button>
            )}
          </>
        )}
      </div>
    </Template>
  );
}
