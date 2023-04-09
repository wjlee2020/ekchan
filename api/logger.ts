import { EKCHAN_LOGGER } from "../config";

type LogBody = {
  embeds: [
    {
      title: string;
      description: string;
      color: 15258703,
      fields: [
        {
          name: string;
          value: string;
          inline: false
        }
      ],
    }
  ]
};

export async function ekchanLog(body: LogBody) {
  await fetch(EKCHAN_LOGGER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
