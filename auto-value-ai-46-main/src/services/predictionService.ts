// Simulated AI prediction service
export interface VehicleInput {
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  kmsDriven: number;
  fuelType: string;
  transmission: string;
  owners: number;
  conditionRating: number;
  image?: File;
}

export interface PredictionResult {
  predictedPrice: number;
  negotiationRange: { low: number; high: number };
  conditionScore: number;
  pros: string[];
  cons: string[];
  recommendation: "Good Deal" | "Negotiate" | "Avoid";
}

// Base prices by vehicle type (simulated)
const basePrices: Record<string, number> = {
  cycle: 500,
  "electric-cycle": 2000,
  bike: 3000,
  scooter: 2500,
  car: 15000,
  suv: 25000,
  van: 20000,
  truck: 35000,
  "heavy-vehicle": 60000,
};

export function simulatePrediction(input: VehicleInput): PredictionResult {
  const base = basePrices[input.vehicleType] || 15000;

  // Depreciation by age
  const currentYear = new Date().getFullYear();
  const age = currentYear - input.year;
  const ageFactor = Math.max(0.2, 1 - age * 0.08);

  // Mileage factor
  const kmFactor = Math.max(0.3, 1 - (input.kmsDriven / 200000) * 0.5);

  // Owner factor
  const ownerFactor = Math.max(0.7, 1 - (input.owners - 1) * 0.1);

  // Condition factor
  const conditionFactor = input.conditionRating / 10;

  const predicted = Math.round(base * ageFactor * kmFactor * ownerFactor * conditionFactor);
  const conditionScore = Math.round(input.conditionRating * 10 * conditionFactor * kmFactor);

  const pros: string[] = [];
  const cons: string[] = [];

  if (age < 3) pros.push("Relatively new vehicle");
  if (age > 8) cons.push("High depreciation due to age");
  if (input.kmsDriven < 30000) pros.push("Low mileage");
  if (input.kmsDriven > 100000) cons.push("High mileage may need maintenance");
  if (input.owners === 1) pros.push("Single owner history");
  if (input.owners > 3) cons.push("Multiple previous owners");
  if (input.conditionRating >= 8) pros.push("Excellent physical condition");
  if (input.conditionRating <= 4) cons.push("Below average condition");
  if (input.fuelType === "electric") pros.push("Electric — lower running costs");
  if (input.transmission === "automatic") pros.push("Automatic transmission");

  if (pros.length === 0) pros.push("Standard vehicle specifications");
  if (cons.length === 0) cons.push("No major concerns identified");

  let recommendation: PredictionResult["recommendation"] = "Good Deal";
  if (conditionScore < 40) recommendation = "Avoid";
  else if (conditionScore < 65) recommendation = "Negotiate";

  return {
    predictedPrice: predicted,
    negotiationRange: {
      low: Math.round(predicted * 0.9),
      high: Math.round(predicted * 1.1),
    },
    conditionScore: Math.min(100, conditionScore),
    pros,
    cons,
    recommendation,
  };
}
