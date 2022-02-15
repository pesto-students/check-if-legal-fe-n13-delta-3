import { Box, Text } from "@chakra-ui/react"
import _ from "lodash"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { UploadDocuments } from "./UploadDocuments"

export const ReviewDocuments: FC = () => {
	const { documents } = useReviewDetailsStore()
	if (_.isUndefined(documents)) return null

	if (_.isEmpty(documents)) return <UploadDocuments />

	return (
		<Text>
			{documents.length}
			{documents.map((el) => (
				<Box>{el}</Box>
			))}
		</Text>
	)
}
