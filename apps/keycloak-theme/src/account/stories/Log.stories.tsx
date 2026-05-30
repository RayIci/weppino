import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "log.ftl" });

const meta = {
  title: "account/Log",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// No activity recorded yet
export const Empty: Story = {
  args: { kcContext: { log: { events: [] } } },
};

// Typical activity: login, password change, TOTP change
export const WithEvents: Story = {
  args: {
    kcContext: {
      log: {
        events: [
          {
            date: "30 May 2026, 09:50",
            event: "LOGIN",
            ipAddress: "192.168.1.10",
            client: "store-website",
            details: [],
          },
          {
            date: "30 May 2026, 09:45",
            event: "LOGIN",
            ipAddress: "192.168.1.10",
            client: "store-website",
            details: [],
          },
          {
            date: "29 May 2026, 18:30",
            event: "UPDATE_PASSWORD",
            ipAddress: "10.0.0.5",
            client: "account-console",
            details: [],
          },
          {
            date: "28 May 2026, 14:05",
            event: "LOGIN_ERROR",
            ipAddress: "185.12.45.200",
            client: "store-website",
            details: [{ key: "error", value: "invalid_user_credentials" }],
          },
          {
            date: "27 May 2026, 11:00",
            event: "UPDATE_TOTP",
            ipAddress: "192.168.1.10",
            client: "account-console",
            details: [],
          },
          {
            date: "26 May 2026, 08:00",
            event: "REGISTER",
            ipAddress: "192.168.1.10",
            client: "store-website",
            details: [],
          },
        ],
      },
    },
  },
};
