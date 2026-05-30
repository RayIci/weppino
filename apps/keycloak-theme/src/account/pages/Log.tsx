import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollText } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "log.ftl" }>, I18n>;

export default function Log({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { log } = kcContext;
  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="log"
    >
      <h1 className="font-serif text-2xl font-normal">{msg("accountLogHtmlTitle")}</h1>

      {log.events.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <ScrollText className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {msg("noEvents" as Parameters<typeof msg>[0])}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{msg("date")}</TableHead>
              <TableHead>{msg("event")}</TableHead>
              <TableHead>{msg("ip")}</TableHead>
              <TableHead>{msg("client")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {log.events.map((event, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(event.date).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {event.event}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">{event.ipAddress}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{event.client}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Template>
  );
}
