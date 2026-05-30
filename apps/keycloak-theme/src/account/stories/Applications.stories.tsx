/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "applications.ftl" });

const meta = {
  title: "account/Applications",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// No apps connected yet — shows the empty state at full width
export const Empty: Story = {
  args: {
    kcContext: {
      applications: { applications: [] },
    },
  },
};

// One app, no consent required (no revoke button)
export const SingleApp: Story = {
  args: {
    kcContext: {
      applications: {
        applications: [
          {
            client: {
              clientId: "store-website",
              name: "Store Website",
              consentRequired: false,
              baseUrl: "http://store.127.0.0.1.nip.io",
            } as any,
            clientScopesGranted: ["openid", "profile", "email"],
            additionalGrants: [],
            realmRolesAvailable: [],
            resourceRolesAvailable: {},
            effectiveUrl: "http://store.127.0.0.1.nip.io",
          },
        ],
      },
    },
  },
};

// Multiple apps — one requires consent (shows revoke button), one without name
export const MultipleApps: Story = {
  args: {
    kcContext: {
      applications: {
        applications: [
          {
            client: {
              clientId: "store-website",
              name: "Store Website",
              consentRequired: false,
              baseUrl: "http://store.127.0.0.1.nip.io",
            } as any,
            clientScopesGranted: ["openid", "profile", "email"],
            additionalGrants: [],
            realmRolesAvailable: [],
            resourceRolesAvailable: {},
            effectiveUrl: "http://store.127.0.0.1.nip.io",
          },
          {
            client: {
              clientId: "third-party-analytics",
              name: "Analytics Dashboard",
              consentRequired: true,
              baseUrl: "https://analytics.example.com",
            } as any,
            clientScopesGranted: ["openid", "profile"],
            additionalGrants: ["offline_access"],
            realmRolesAvailable: [],
            resourceRolesAvailable: {},
            effectiveUrl: "https://analytics.example.com",
          },
          {
            client: {
              clientId: "mobile-app",
              name: "Weppino Mobile",
              consentRequired: false,
            } as any,
            clientScopesGranted: ["openid", "profile", "email", "offline_access"],
            additionalGrants: [],
            realmRolesAvailable: [],
            resourceRolesAvailable: {},
          },
        ],
      },
    },
  },
};

// App with no display name — falls back to showing the raw clientId
export const AppWithNoName: Story = {
  args: {
    kcContext: {
      applications: {
        applications: [
          {
            client: {
              clientId: "raw-client-id-no-name",
              name: "",
              consentRequired: true,
            } as any,
            clientScopesGranted: ["openid"],
            additionalGrants: [],
            realmRolesAvailable: [],
            resourceRolesAvailable: {},
          },
        ],
      },
    },
  },
};
