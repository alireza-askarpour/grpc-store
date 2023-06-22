export const listOfImagesFromRequest = (files = []) => {
  return files.filter((file: any) => Boolean(file && file.path)).map((file: any) => file.path.replace(/\\/g, "/"))
}
