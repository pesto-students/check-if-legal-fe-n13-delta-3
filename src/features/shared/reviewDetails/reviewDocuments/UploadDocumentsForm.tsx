import { Box, Button, Input, Text } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { ErrorText } from "../../components/ui/ErrorText"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { reviewDocumentsUploadApi } from "./reviewDocumentsUploadApi"

interface IFormData {
	documents: FileList
}

export const UploadDocumentsForm: FC = () => {
	const { token } = useUserAuth()
	const { review, fetchReview, documents } = useReviewDetailsStore()
	const { register, handleSubmit } = useForm<IFormData>()
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState<string>()

	if (!review) return null

	const onSubmit = handleSubmit((data) => {
		setIsLoading(true)

		const formData = new FormData()
		try {
			for (const file of Object.values(data.documents)) {
				formData.append("documents", file)
			}
		} catch (err) {
			setErrorText(getErrorMessage(err))
		} finally {
			setIsLoading(false)
		}

		reviewDocumentsUploadApi({ id: review.id, formData, token })
			.then(() => fetchReview({ id: review.id, token }))
			.catch((err) => setErrorText(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	})

	return (
		<Box mt={2} maxW={"xl"}>
			{_.isEmpty(documents) && (
				<Text maxW={"sm"}>
					Upload all the necessary documents required for the review process in image
					or PDF format
				</Text>
			)}
			<form onSubmit={onSubmit}>
				<Input type={"file"} multiple {...register("documents")} />
				<Button
					type={"submit"}
					mt={2}
					size="sm"
					colorScheme={_.isEmpty(documents) ? "blue" : undefined}
					isLoading={isLoading}
					isDisabled={isLoading}
				>
					{_.isEmpty(documents) ? "Upload Documents" : "Upload More Documents"}
				</Button>
				{errorText && <ErrorText text={errorText} />}
			</form>
		</Box>
	)
}
