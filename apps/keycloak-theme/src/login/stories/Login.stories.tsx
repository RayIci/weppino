import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
  title: "login/Login",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSocialProviders: Story = {
  args: {
    kcContext: {
      social: {
        displayInfo: true,
        providers: [
          {
            alias: "google",
            providerId: "google",
            displayName: "Google",
            loginUrl: "#",
            iconClasses: "fa fa-google",
          },
        ],
      },
    },
  },
};

export const WithError: Story = {
  args: {
    kcContext: {
      message: {
        type: "error",
        summary: "Invalid username or password.",
      },
    },
  },
};

export const WithRememberMe: Story = {
  args: {
    kcContext: {
      realm: {
        rememberMe: true,
      },
    },
  },
};
