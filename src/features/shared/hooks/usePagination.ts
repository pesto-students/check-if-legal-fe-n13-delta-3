import { useCallback, useMemo, useState } from "react"

export function usePagination(limit: number) {
	const [currentPage, setCurrentPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)

	const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit])

	const onNextPage = useCallback(() => setCurrentPage((currPage) => currPage + 1), [])
	const onPrevPage = useCallback(() => setCurrentPage((currPage) => currPage - 1), [])

	return { currentPage, totalItems, setTotalItems, totalPages, onNextPage, onPrevPage }
}
