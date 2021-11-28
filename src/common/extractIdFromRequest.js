function extractIdFromRequest(req) {
  const url = decodeURIComponent(req.url);
  const indexSecondSlash = url.indexOf('/', 1);

  return indexSecondSlash === -1 ? undefined : url.slice(indexSecondSlash + 1);
}

export { extractIdFromRequest };
