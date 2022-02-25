import { Button, ButtonGroup, Icon } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface IProps extends ComponentProps<typeof ButtonGroup> {
	totalPages: number
	currentPage: number
	onPrevPage: () => void
	onNextPage: () => void
}

export const PaginationBox: FC<IProps> = ({
	currentPage,
	onPrevPage,
	onNextPage,
	totalPages,
	...rest
}) => {
	return (
		<ButtonGroup isAttached {...rest}>
			<Button isDisabled={currentPage <= 1} onClick={onPrevPage}>
				<Icon as={IoIosArrowBack} boxSize={4} />
			</Button>
			<Button _hover={{ cursor: "not-allowed" }} fontWeight="normal">
				<b>{currentPage}</b>&nbsp;/ {totalPages}
			</Button>
			<Button isDisabled={currentPage >= totalPages} onClick={onNextPage}>
				<Icon as={IoIosArrowForward} boxSize={4} />
			</Button>
		</ButtonGroup>
	)
}
