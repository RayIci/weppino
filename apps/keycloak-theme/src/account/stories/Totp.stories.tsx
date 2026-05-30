import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "totp.ftl" });

// Real base64 PNG from keycloakify's own mock — use this for every QR story
const MOCK_QR =
  "iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2AQAAAADNaUdlAAACM0lEQVR4Xu3OIZJgOQwDUDFd2UxiurLAVnnbHw4YGDKtSiWOn4Gxf81//7r/+q8b4HfLGBZDK9d85NmNR+sB42sXvOYrN5P1DcgYYFTGfOlbzE8gzwy3euweGizw7cfdl34/GRhlkxjKNV+5AebPXPORX1JuB9x8ZfbyyD2y1krWAKsbMq1HnqQDaLfa77p4+MqvzEGSqvSAD/2IHW2yHaigR9tX3m8dDIYGcNf3f+gDpVBZbZU77zyJ6Rlcy+qoTMG887KAPD9hsh6a1Sv3gJUHGHUAxSMzj7zqDDe7Phmt2eG+8UsMxjRGm816MAO+8VMl1R1jGHOrZB/5Zo/WXAPgxixm9Mo96vDGrM1eOto8c4Ax4wF437mifOXlpiPzCnN7Y9l95NnEMxgMY9AAGA8fucH14Y1aVb6N/cqrmyh0BVht7k1e+bU8LK0Cg5vmVq9c5vHIjOfqxDIfeTraNVTwewa4wVe+SW5N+uP1qACeudUZbqGOfA6VZV750Noq2Xx3kpveV44ZelSV1V7KFHzkWyVrrlUwG0Pl9pWnoy3vsQoME6vKI69i5osVgwWzHT7zjmJtMcNUSVn1oYMd7ZodbgowZl45VG0uVuLPUr1yc79uaQBag/mqR34xhlWyHm1prplHboCWdZ4TeZjsK8+dI+jbz1C5hl65mcpgB5dhcj8+dGO+0Ko68+lD37JDD83dpDLzzK+TrQyaVwGj6pUboGV+7+AyN8An/pf84/7rv/4/1l4OCc/1BYMAAAAASUVORK5CYII=";

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
        totpSecretQrCode: MOCK_QR,
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
        totpSecretQrCode: MOCK_QR,
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
        totpSecretQrCode: MOCK_QR,
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
        totpSecretQrCode: MOCK_QR,
        manualUrl: "#",
        supportedApplications: ["Google Authenticator"],
      },
    },
  },
};
