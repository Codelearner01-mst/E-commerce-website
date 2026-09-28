export function escapeHtml(value = "") {
  return String(value).replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

export function resolveProductImage(image, basePath = "/static/images/") {
  if (!image) return `${basePath}segal-jewelry-NsH-CvU0deg-unsplash.jpg`;
  if (/^(https?:)?\/\//i.test(image) || image.startsWith("/")) return image;
  const filename = image.replace(/^(\.\.\/|\.\/)?(src\/images\/|images\/)/, "");
  return `${basePath}${encodeURIComponent(filename).replace(/%2F/gi, "/")}`;
}
