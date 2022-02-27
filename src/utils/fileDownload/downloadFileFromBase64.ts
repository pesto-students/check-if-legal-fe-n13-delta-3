import base64ToBlob from "b64-to-blob"
import { mimeType } from "./mimeTypes"
import fileSaver from "file-saver"

export function downloadFileFromBase64(base64: string, fileName: string) {
	const ext = fileName.split(".").pop()?.toLowerCase()
	if (!ext) throw new Error("File name is invalid")

	const contentType = (mimeType as any)[ext]
	if (!contentType) throw new Error("File extension is invalid")

	const blob = base64ToBlob(base64, contentType)
	const file = new File([blob], fileName)
	fileSaver.saveAs(file)
}
