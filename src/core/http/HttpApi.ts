import axios, { AxiosError, AxiosRequestHeaders } from "axios"
import { HttpStatusCode } from "."
import { API_URL } from "../../configs"
import { storage } from "../../utils/storage"
import { HttpMethod } from "./enums"

export class HttpApi<ResponseShape = any> {
	readonly endpoint: string
	readonly method: HttpMethod

	constructor(method: HttpMethod, endpoint: string) {
		this.endpoint = endpoint
		this.method = method
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
		const headers: AxiosRequestHeaders = token
			? { Authorization: `Bearer ${token}` }
			: {}

		try {
			const response = await axios.request({
				method: this.method,
				url,
				headers,
				data: body,
				params: query,
			})
			return response.data as ResponseShape
		} catch (err) {
			if (axios.isAxiosError(err)) {
				throw this.httpError(err)
			}
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
