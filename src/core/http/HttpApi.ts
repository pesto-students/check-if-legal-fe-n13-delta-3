import axios, { AxiosError, AxiosRequestHeaders } from "axios"
import { HttpStatusCode } from "."
import { API_URL } from "../../configs"
import { storage } from "../../utils/storage"
import { HttpMethod } from "./enums"

export class HttpApi<ResponseShape = any> {
	readonly endpoint: string
	readonly method: HttpMethod
	readonly isFormData: boolean

	constructor(method: HttpMethod, endpoint: string, options?: { isFormData?: boolean }) {
		this.endpoint = endpoint
		this.method = method
		this.isFormData = options?.isFormData ?? false
	}

	async send({
		token,
		body = null,
		query,
	}: {
		body?: any
		query?: any
		token?: string
	} = {}): Promise<ResponseShape> {
		const url = `${API_URL}${this.endpoint}`

		const headers: AxiosRequestHeaders = {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(this.isFormData ? { "Content-Type": `multipart/form-data;` } : {}),
			// ? { "Content-Type": `multipart/form-data; boundary=${body._boundary}` }
		}
		console.log("---url",url)
		console.log("----base",API_URL)

		try {
			const response = await axios({
				method: this.method,
				url,
				headers,
				data: body,
				params: query,
			})
			return response.data as ResponseShape
		} catch (err) {
			if (axios.isAxiosError(err)) throw this.httpError(err)
			console.log(err)
			throw err
		}
	}

	private httpError(err: AxiosError) {
		if (err.response) {
			const { status, data } = err.response
			if (status === HttpStatusCode.UNAUTHORIZED) {
				storage.clearAuth()
				window.location.reload()
			}

			const message = data.message || "Error"
			throw new Error(message)
		}

		console.log(err)
		throw err
	}
}
