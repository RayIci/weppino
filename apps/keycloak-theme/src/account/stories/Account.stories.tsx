import type { Meta, StoryObj } from "../../kc.gen";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "account.ftl" });

const meta = {
  title: "account/Account",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Email is the username — username field hidden (most common setup)
export const EmailAsUsername: Story = {
  args: {
    kcContext: {
      realm: { registrationEmailAsUsername: true, editUsernameAllowed: false },
    },
  },
};

// Username field visible and editable
export const WithEditableUsername: Story = {
  args: {
    kcContext: {
      realm: { registrationEmailAsUsername: false, editUsernameAllowed: true },
      account: {
        username: "alex.valle",
        email: "alex@weppino.com",
        firstName: "Alex",
        lastName: "Valle",
      },
    },
  },
};

// Username field visible but locked (read-only)
export const WithLockedUsername: Story = {
  args: {
    kcContext: {
      realm: { registrationEmailAsUsername: false, editUsernameAllowed: false },
      account: {
        username: "alex.valle",
        email: "alex@weppino.com",
        firstName: "Alex",
        lastName: "Valle",
      },
    },
  },
};

// Validation errors on email and first name
export const WithValidationErrors: Story = {
  args: {
    kcContext: {
      realm: { registrationEmailAsUsername: false, editUsernameAllowed: true },
      messagesPerField: {
        existsError: (field: string) => ["email", "firstName"].includes(field),
        get: (field: string) =>
          field === "email"
            ? "Invalid email address."
            : field === "firstName"
              ? "First name is required."
              : "",
        exists: (field: string) => ["email", "firstName"].includes(field),
        printIfExists: <T extends string>(field: string, text: T) =>
          ["email", "firstName"].includes(field) ? text : undefined,
      },
    },
  },
};
