import { EKCHAN_LOGGER } from "../config";

export type Logger = {
  embeds: [
    {
      title: string;
      description: string;
      color: number | string,
      fields: [
        {
          name: string;
          value: string | unknown;
          inline: boolean;
        }
      ],
    }
  ]
};

export async function ekchanLog(body: Logger) {
  await fetch(`${EKCHAN_LOGGER}/logger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
