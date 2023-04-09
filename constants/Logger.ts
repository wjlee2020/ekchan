import { Logger } from "../api/logger";

type logBody = {
  name: string;
  value?: string | unknown;
  type: string;
  email?: string;
};

const loggerTypes = (type: string) => {
  switch (type) {
    case "LOGIN":
    default: return { title: "Auth Error", description: "User failed to login", color: 15872729 };
  }
};

export default function createLoggerObject(logBody: logBody): Logger {
  const { title, description, color } = loggerTypes(logBody.type);

  return {
    embeds: [
      {
        title,
        description,
        color,
        fields: [
          {
            name: logBody.name,
            value: "",
            inline: false
          }
        ],
      }
    ]
  }
};
