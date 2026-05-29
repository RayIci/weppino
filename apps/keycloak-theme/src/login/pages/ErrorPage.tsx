import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>;

export default function ErrorPage({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { message, client, skipLink } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg("errorTitle")}
      displayMessage={false}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="size-7 text-destructive" />
        </div>

        <p
          className="text-sm text-foreground"
          dangerouslySetInnerHTML={{ __html: message.summary }}
        />

        {!skipLink && client?.baseUrl && (
          <Button variant="outline" className="w-full" render={<a href={client.baseUrl} />}>
            {msg("backToApplication")}
          </Button>
        )}
      </div>
    </Template>
  );
}
