import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "password.ftl" });

const meta = {
  title: "account/Password",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Password already set — shows "current password" field
export const PasswordSet: Story = {
  args: {
    kcContext: { password: { passwordSet: true } },
  },
};

// First time setting a password — no "current password" field
export const NoPasswordYet: Story = {
  args: {
    kcContext: { password: { passwordSet: false } },
  },
};

// Validation errors — wrong current password, new passwords don't match
export const WithValidationErrors: Story = {
  args: {
    kcContext: {
      password: { passwordSet: true },
      messagesPerField: {
        existsError: (field: string) => ["password", "password-confirm"].includes(field),
        get: (field: string) =>
          field === "password"
            ? "Invalid current password."
            : field === "password-confirm"
              ? "Passwords do not match."
              : "",
        exists: (field: string) => ["password", "password-confirm"].includes(field),
        printIfExists: <T extends string>(field: string, text: T) =>
          ["password", "password-confirm"].includes(field) ? text : undefined,
      },
    },
  },
};
