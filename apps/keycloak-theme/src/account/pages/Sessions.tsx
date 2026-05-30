import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Monitor } from "lucide-react";

type Props = PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>;

export default function Sessions({ kcContext, i18n, doUseDefaultCss, Template, classes }: Props) {
  const { url, sessions, stateChecker } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      active="sessions"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-normal">{msg("sessionsHtmlTitle")}</h1>
        <form action={url.sessionsUrl} method="post">
          <input type="hidden" name="stateChecker" value={stateChecker} />
          <input type="hidden" name="submitAction" value="LogoutAllSessions" />
          <Button type="submit" variant="destructive" size="sm">
            {msgStr("doLogOutAllSessions")}
          </Button>
        </form>
      </div>

      {sessions.sessions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <Monitor className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            {msg("noActiveSessions" as Parameters<typeof msg>[0])}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{msg("ip")}</TableHead>
              <TableHead>{msg("started")}</TableHead>
              <TableHead>{msg("lastAccess")}</TableHead>
              <TableHead>{msg("expires")}</TableHead>
              <TableHead>{msg("clients")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.sessions.map((session, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-sm">{session.ipAddress}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{session.started}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {session.lastAccess}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{session.expires}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {session.clients.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Template>
  );
}
