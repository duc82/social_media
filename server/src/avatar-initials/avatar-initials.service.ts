import { Injectable } from "@nestjs/common";
import { createCanvas } from "canvas";

interface AvatarInitialsOptions {
  width: number;
  height: number;
  font: string;
  fontColor: string;
  background: string;
}

@Injectable()
export class AvatarInitialsService {
  generateHsl() {
    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const hRange = [0, 360];
    const sRange = [50, 75];
    const lRange = [25, 60];

    const h = randomInt(hRange[0], hRange[1]);
    const s = randomInt(sRange[0], sRange[1]);
    const l = randomInt(lRange[0], lRange[1]);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  generateAvatarInitials(
    name: string,
    options?: Partial<AvatarInitialsOptions> | undefined,
  ) {
    const initials = name[0].toUpperCase();

    const canvas = createCanvas(options?.width ?? 200, options?.height ?? 200);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.fillStyle = options?.background ?? `${this.generateHsl()}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.fillStyle = options?.fontColor ?? "white";
    ctx.font = options?.font ?? "bold 100px Arial";

    const textWidth = ctx.measureText(initials).width;
    const textHeight = ctx.measureText(initials).actualBoundingBoxAscent;

    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + textHeight) / 2;

    ctx.fillText(initials, x, y);

    const buffer = canvas.toBuffer("image/png");
    return buffer;
  }
}
