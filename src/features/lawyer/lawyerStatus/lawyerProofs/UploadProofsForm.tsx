import { Box, Button, Input, Text } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { useLawyerAuth } from "../../useLawyerAuth"
import { lawyerProofsUploadApi } from "./lawyerProofsUploadApi"
import { useLawyerProofStore } from "./useLawyerProofStore"

interface IFormData {
	proofs: FileList
}

export const UploadProofsForm: FC = () => {
	const { token } = useLawyerAuth()
	const { proofs, fetchProofs } = useLawyerProofStore()

	const { register, handleSubmit } = useForm<IFormData>()
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit((data) => {
		setIsLoading(true)

		const formData = new FormData()
		try {
			for (const file of Object.values(data.proofs)) {
				formData.append("proofs", file)
			}
		} catch (err) {
			setErrorText(getErrorMessage(err))
		} finally {
			setIsLoading(false)
		}

		lawyerProofsUploadApi({ formData, token })
			.then(() => fetchProofs({ token }))
			.catch((err) => setErrorText(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	})

	return (
		<Box mt={2} maxW={"xl"}>
			{_.isEmpty(proofs) && (
				<Text maxW={"sm"}>
					Upload all the necessary proofs required for the review process in image or
					PDF format
				</Text>
			)}
			<form onSubmit={onSubmit}>
				<Input type={"file"} multiple {...register("proofs")} />
				<Button
					type={"submit"}
					mt={2}
					size="sm"
					colorScheme={_.isEmpty(proofs) ? "blue" : undefined}
					isLoading={isLoading}
					isDisabled={isLoading}
				>
					{_.isEmpty(proofs) ? "Upload Proofs" : "Upload More Proofs"}
				</Button>
				{errorText && <ErrorText text={errorText} />}
			</form>
		</Box>
	)
}
