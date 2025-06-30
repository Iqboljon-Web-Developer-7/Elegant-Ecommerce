export const isNew = (createdAt: string) => {
    const CreatedAt = new Date(createdAt!);
    const now = new Date();
    const diffInMonths =
        (now.getFullYear() - CreatedAt.getFullYear()) * 12 +
        now.getMonth() -
        CreatedAt.getMonth();
    return diffInMonths < 6;
};
export const discount = (price: number, salePrice: number) =>
    Math.round(
        ((price - salePrice) /
            price) *
        100
    )

/**
* Reason: Sanity image URLs can include a `rect` parameter that defines a manual crop area.
* When generating image previews or manipulating URLs, we sometimes need to override this `rect`
* — but only if it already exists in the URL.
*
* This function ensures:
* - The `rect` parameter is only updated, never added if missing (to avoid unintended cropping).
* - The crop dimensions do not exceed the actual image size, which is extracted from the URL itself.
*
* Why? Sanity stores image dimensions in the URL (e.g. -453x1080), and using a `rect` larger than 
* the image causes broken or distorted results. This function guarantees safe cropping behavior
* without accidentally affecting full-size images that shouldn't be cropped.
*/
export function updateSanityRect(url: string, { left, top, width, height }: { left: number; top: number; width: number; height: number }) {
    const u = new URL(url);
    const params = u.searchParams;

    if (!params.has("rect")) {
        return url; // leave untouched
    }

    const match = u.pathname.match(/-(\d+)x(\d+)\.\w+$/);
    const originalWidth = match ? parseInt(match[1], 10) : null;
    const originalHeight = match ? parseInt(match[2], 10) : null;

    const finalWidth = originalWidth && width > originalWidth ? originalWidth : width;
    const finalHeight = originalHeight && height > originalHeight ? originalHeight : height;

    params.set("rect", `${left},${top},${finalWidth},${finalHeight}`);

    return u.toString();
}