export function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>\"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

export const PRODUCT_IMAGE_MODE = "development";

const PRODUCT_IMAGE_BASE_PATHS = {
  development: "/static/images/",
  production: "/static/images/Products/",
};

const PRODUCT_IMAGE_FALLBACKS = {
  development: "segal-jewelry-NsH-CvU0deg-unsplash.jpg",
  production: "Golden_Elegance_Set.png",
};

export function resolveProductImage(image, mode = PRODUCT_IMAGE_MODE) {
  const selectedMode = Object.hasOwn(PRODUCT_IMAGE_BASE_PATHS, mode)
    ? mode
    : "development";
  const basePath = PRODUCT_IMAGE_BASE_PATHS[selectedMode];
  if (typeof image !== "string" || !image.trim()) {
    const fallback = PRODUCT_IMAGE_FALLBACKS[selectedMode];
    return `${basePath}${fallback}`;
  }

  const normalizedImage = image.trim().replace(/\\/g, "/");
  if (/^(https?:)?\/\//i.test(normalizedImage)) return normalizedImage;

  const withoutRelativePrefix = normalizedImage.replace(
    /^(?:\.\.\/|\.\/)+/,
    "",
  );
  const withoutStaticPrefix = withoutRelativePrefix.replace(
    /^\/?(?:static\/)?(?:src\/)?images\//i,
    "",
  );
  if (
    withoutStaticPrefix === withoutRelativePrefix &&
    normalizedImage.startsWith("/")
  ) {
    return normalizedImage;
  }

  const hasProductFolder = /^products\//i.test(withoutStaticPrefix);
  const filename = hasProductFolder
    ? withoutStaticPrefix.replace(/^products\//i, "")
    : withoutStaticPrefix;
  const imageBasePath = hasProductFolder
    ? PRODUCT_IMAGE_BASE_PATHS.production
    : basePath;
  return `${imageBasePath}${encodeURIComponent(filename).replace(/%2F/gi, "/")}`;
}
