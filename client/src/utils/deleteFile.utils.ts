import fs from "fs"
import path from "path"

export const deleteFile = async (fileAddress: any) => {
  const pathFiles = Array.isArray(fileAddress)
    ? fileAddress.map((address) => path.join(__dirname, address))
    : [path.join(__dirname, "..", "..", fileAddress)]

  const deletePromises = pathFiles.map(
    (pathFile) =>
      new Promise((resolve: any) => {
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, (err) => {})
        }
        resolve()
      })
  )

  await Promise.all(deletePromises)
}
