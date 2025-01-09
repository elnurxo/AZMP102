function extractPublicId(arr, id) {
  return arr
    .find((x) => x.id === id)
    ?.image.split("/")
    .reverse()[0]
    .split(".")[0];
}

module.exports = extractPublicId;
