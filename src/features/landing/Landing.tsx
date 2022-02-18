import { FC } from "react"
import { FeatureSection } from "./components/FeatureSection"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"

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
