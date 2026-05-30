import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "federatedIdentity.ftl" });

const meta = {
  title: "account/FederatedIdentity",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const providers = {
  google: { providerId: "google", displayName: "Google", userName: "", connected: false },
  github: { providerId: "github", displayName: "GitHub", userName: "", connected: false },
  twitter: { providerId: "twitter", displayName: "Twitter", userName: "", connected: false },
};

// No providers linked — all show "Add" button
export const AllDisconnected: Story = {
  args: {
    kcContext: {
      federatedIdentity: {
        identities: [providers.google, providers.github, providers.twitter],
        removeLinkPossible: true,
      },
    },
  },
};

// Google linked, others not
export const SomeConnected: Story = {
  args: {
    kcContext: {
      federatedIdentity: {
        identities: [
          { ...providers.google, userName: "alex@gmail.com", connected: true },
          providers.github,
          providers.twitter,
        ],
        removeLinkPossible: true,
      },
    },
  },
};

// All providers linked — shows "Remove" buttons
export const AllConnected: Story = {
  args: {
    kcContext: {
      federatedIdentity: {
        identities: [
          { ...providers.google, userName: "alex@gmail.com", connected: true },
          { ...providers.github, userName: "alex-valle", connected: true },
          { ...providers.twitter, userName: "@alex_valle", connected: true },
        ],
        removeLinkPossible: true,
      },
    },
  },
};

// Removal not possible (only one login method — removing would lock the user out)
export const CannotRemoveLink: Story = {
  args: {
    kcContext: {
      federatedIdentity: {
        identities: [
          { ...providers.google, userName: "alex@gmail.com", connected: true },
          providers.github,
        ],
        removeLinkPossible: false,
      },
    },
  },
};
