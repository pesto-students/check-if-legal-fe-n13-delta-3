import { useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { OfferingSearchForm } from "../shared/offering/OfferingSearchForm"
import { FeatureSection } from "./components/FeatureSection"
import { Footer } from "./components/Footer"
import { ForLawyerSection } from "./components/ForLawyerSection"
import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"

export const Landing: FC = () => {
	const offeringSearchForm = useDisclosure()

	return (
		<>
			<Header {...offeringSearchForm} />
			<HeroSection {...offeringSearchForm} />
			<FeatureSection />
			<ForLawyerSection />
			<Footer />
			<OfferingSearchForm {...offeringSearchForm} />
		</>
	)
}
