declare module "github-identicon" {
    /**
     * generate identicon
     * @param value input to hash
     * @param size image size (default: 420)
     * @returns png buffer
    */
    export function identicon(value: string | number, size?: number): Buffer;

    export default identicon;
}