import { FC } from "react"
import { FeatureSection } from "./FeatureSection"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"

export const Landing: FC = () => {
	return (
		<>
			<Header />
			<HeroSection />
			<FeatureSection />
			<Footer />
		</>
	)
}
