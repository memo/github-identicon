import { createCanvas } from "canvas";
import { createHash } from "node:crypto";

const map = (val, inMin, inMax, outMin, outMax) =>
    ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    if (!s) return [l, l, l].map(v => Math.round(v * 255));
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    const f = t => {
        t = (t + 1) % 1;
        return t < 1/6 ? p + (q - p) * 6 * t :
            t < 0.5 ? q :
            t < 2/3 ? p + (q - p) * (2/3 - t) * 6 : p;
    };
    return [f(h + 1/3), f(h), f(h - 1/3)].map(v => Math.round(v * 255));
};

const identicon = (value, size = 420) => {
    const hashedValue = createHash("md5").update(value.toString()).digest();

    const hue = map(((hashedValue[12] & 0xf) << 8) | hashedValue[13], 0, 4095, 0, 360);
    const saturation = 65 - map(hashedValue[14], 0, 255, 0, 20);
    const lightness = 75 - map(hashedValue[15], 0, 255, 0, 20);
    const colour = hslToRgb(hue, saturation, lightness);

    const pixels = Array(25).fill(false);
    let nibbleIndex = 0;

    for (let x = 2; x >= 0; x--) {
        for (let y = 0; y < 5; y++) {
            const byte = hashedValue[Math.floor(nibbleIndex / 2)];
            const nibble = nibbleIndex % 2 === 0 ? byte >> 4 : byte & 0xf;
            const paint = nibble % 2 === 0;
            const index = x + y * 5;
            pixels[index] = pixels[4 - x + y * 5] = paint;
            nibbleIndex++;
        }
    }
    
    const pixelSize = size / 6;
    const margin = pixelSize / 2;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = `rgb(${colour.join(",")})`;

    pixels.forEach((on, index) => {
        if (!on) return;
        const x = (index % 5) * pixelSize + margin;
        const y = Math.floor(index / 5) * pixelSize + margin;
        ctx.fillRect(x, y, pixelSize, pixelSize);
    });

    return canvas.toBuffer();
}

export default identicon;