import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "totp.ftl" });

const policy = {
  algorithm: "HmacSHA1" as const,
  digits: 6,
  lookAheadWindow: 1,
  type: "totp" as const,
  period: 30,
  getAlgorithmKey: () => "SHA1",
};

const meta = {
  title: "account/Totp",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// First-time setup, QR code mode, no existing credentials
export const SetupQR: Story = {
  args: {
    kcContext: {
      mode: "qr",
      isAppInitiatedAction: false,
      totp: {
        enabled: false,
        otpCredentials: [],
        policy,
        totpSecret: "G4nsI8lQagRMUchH8jEG",
        totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
        qrUrl: "#",
        totpSecretQrCode:
          "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAeklEQVQ4je2SMQqAMAxFX8UDiIO3cPAIHsHBo3gKwUE8hYOgiKMgiKPQoYMQSGn6oZCl8JLHSwIhhBBCCCGEEEJISVXrOc8561prBQBEBAAkJIC2bdv2Pw8AkqSUUiullFJKKe+9934opZRSSuecE+ccOefIOQ9jzA8Z3hYiqHnrBwAAAABJRU5ErkJggg==",
        manualUrl: "#",
        supportedApplications: ["Google Authenticator", "Microsoft Authenticator", "FreeOTP"],
      },
    },
  },
};

// Manual key entry mode
export const SetupManual: Story = {
  args: {
    kcContext: {
      mode: "manual",
      isAppInitiatedAction: false,
      totp: {
        enabled: false,
        otpCredentials: [],
        policy,
        totpSecret: "G4nsI8lQagRMUchH8jEG",
        totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
        qrUrl: "#",
        totpSecretQrCode: "",
        manualUrl:
          "otpauth://totp/weppino%3Aalex%40weppino.com?secret=G4nsI8lQagRMUchH8jEG&issuer=weppino",
        supportedApplications: ["Google Authenticator", "Microsoft Authenticator", "FreeOTP"],
      },
    },
  },
};

// Already has one credential, adding another
export const WithExistingCredential: Story = {
  args: {
    kcContext: {
      mode: "qr",
      isAppInitiatedAction: false,
      totp: {
        enabled: true,
        policy,
        totpSecret: "G4nsI8lQagRMUchH8jEG",
        totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
        qrUrl: "#",
        totpSecretQrCode: "",
        manualUrl: "#",
        supportedApplications: ["Google Authenticator", "Microsoft Authenticator"],
        otpCredentials: [{ id: "cred-1", userLabel: "My iPhone" }],
      },
    },
  },
};

// Triggered from an app action — shows the Cancel button
export const AppInitiatedAction: Story = {
  args: {
    kcContext: {
      mode: "qr",
      isAppInitiatedAction: true,
      totp: {
        enabled: false,
        otpCredentials: [],
        policy,
        totpSecret: "G4nsI8lQagRMUchH8jEG",
        totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
        qrUrl: "#",
        totpSecretQrCode: "",
        manualUrl: "#",
        supportedApplications: ["Google Authenticator"],
      },
    },
  },
};
