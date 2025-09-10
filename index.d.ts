declare module "github-identicon" {
    /**
     * generate identicon
     * @param value input to hash
     * @param size image size in pixels (default: 420)
     * @returns png data
    */
    export function identicon(value: string | number, size?: number): Buffer;

    export default identicon;
}