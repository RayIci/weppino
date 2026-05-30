import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "sessions.ftl" });

const meta = {
  title: "account/Sessions",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// No active sessions
export const Empty: Story = {
  args: { kcContext: { sessions: { sessions: [] } } },
};

// One active session (current device)
export const SingleSession: Story = {
  args: {
    kcContext: {
      sessions: {
        sessions: [
          {
            id: "abc-123",
            ipAddress: "192.168.1.10",
            started: "30 May 2026, 09:00",
            lastAccess: "30 May 2026, 09:45",
            expires: "30 May 2026, 17:00",
            clients: ["Store Website"],
          },
        ],
      },
    },
  },
};

// Multiple sessions from different devices and locations
export const MultipleSessions: Story = {
  args: {
    kcContext: {
      sessions: {
        sessions: [
          {
            id: "abc-111",
            ipAddress: "192.168.1.10",
            started: "30 May 2026, 09:00",
            lastAccess: "30 May 2026, 09:50",
            expires: "30 May 2026, 17:00",
            clients: ["Store Website", "Mobile App"],
          },
          {
            id: "abc-222",
            ipAddress: "10.0.0.5",
            started: "29 May 2026, 18:30",
            lastAccess: "29 May 2026, 21:00",
            expires: "30 May 2026, 02:30",
            clients: ["Store Website"],
          },
          {
            id: "abc-333",
            ipAddress: "185.12.45.200",
            started: "28 May 2026, 14:00",
            lastAccess: "28 May 2026, 14:05",
            expires: "28 May 2026, 22:00",
            clients: ["Admin Console"],
          },
        ],
      },
    },
  },
};
