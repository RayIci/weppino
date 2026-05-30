/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/account";
import type { ThemeName } from "../kc.gen";

const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      doSave: "Save changes",
      doCancel: "Cancel",
      doLogOutAllSessions: "Sign out all sessions",
      doRemove: "Remove",
      doAdd: "Add",
      doSignOut: "Sign out",
      editAccountHtmlTitle: "Profile",
      personalInfoHtmlTitle: "Personal info",
      changePasswordHtmlTitle: "Change password",
      deviceActivityHtmlTitle: "Sessions",
      sessionsHtmlTitle: "Active sessions",
      authenticatorTitle: "Authenticator",
      applicationsHtmlTitle: "Applications",
      linkedAccountsHtmlTitle: "Linked accounts",
      accountLogHtmlTitle: "Activity log",
      federatedIdentitiesHtmlTitle: "Linked accounts",
      currentPassword: "Current password",
      passwordNew: "New password",
      passwordConfirm: "Confirm password",
      connected: "Connected",
      disconnected: "Not connected",
      noApplications: "No applications connected yet.",
      noActiveSessions: "No active sessions.",
      noEvents: "No activity recorded yet.",
    },
    it: {
      doSave: "Salva modifiche",
      doCancel: "Annulla",
      doLogOutAllSessions: "Disconnetti tutte le sessioni",
      doRemove: "Rimuovi",
      doAdd: "Aggiungi",
      doSignOut: "Esci",
      editAccountHtmlTitle: "Profilo",
      personalInfoHtmlTitle: "Informazioni personali",
      changePasswordHtmlTitle: "Cambia password",
      deviceActivityHtmlTitle: "Sessioni",
      sessionsHtmlTitle: "Sessioni attive",
      authenticatorTitle: "Autenticatore",
      applicationsHtmlTitle: "Applicazioni",
      linkedAccountsHtmlTitle: "Account collegati",
      accountLogHtmlTitle: "Registro attività",
      federatedIdentitiesHtmlTitle: "Account collegati",
      currentPassword: "Password attuale",
      passwordNew: "Nuova password",
      passwordConfirm: "Conferma password",
      connected: "Collegato",
      disconnected: "Non collegato",
      noApplications: "Nessuna applicazione collegata.",
      noActiveSessions: "Nessuna sessione attiva.",
      noEvents: "Nessuna attività registrata.",
    },
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
