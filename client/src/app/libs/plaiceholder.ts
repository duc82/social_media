"use server";

import { getPlaiceholder } from "plaiceholder";

const getImageBase64 = async (src: string) => {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (err) {
    throw err;
  }
};

export { getImageBase64 };
