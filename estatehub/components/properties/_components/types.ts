export interface MortgageCalculations {
  downAmount: number
  loanAmount: number
  principalAndInterest: number
  propertyTaxMonthly: number
  insuranceAndHoa: number
  totalMonthly: number
}

export type FloorLevel = "level1" | "level2" | "level3"

export type TourType = "inperson" | "video"

export interface PhotoLabel {
  title: string
  sub: string
}

export const photoLabels: PhotoLabel[] = [
  { title: "Primary Architectural Facade", sub: "Horizon panoramas & zero-edge pool" },
  { title: "Chef's Show Kitchen", sub: "Gaggenau suites & Calacatta marble" },
  { title: "Primary Master Suite", sub: "Cantilevered terrace & fireplace" },
  { title: "Spa Wellness Bath", sub: "Sculptural tub & bamboo garden view" },
  { title: "Wine Gallery & Lounge", sub: "600-bottle climate glass display" },
]
