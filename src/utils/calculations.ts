// src/utils/calculations.ts

// Calculate ventilated flow in L/min including bias and FiO₂
export function ventedFlow(minVent: number, bias: number, fiO2: number): number {
  return minVent + bias * fiO2;
}

// Calculate total usage in liters given flow (L/min) and hours
export function usageLiters(flowLpm: number, hours: number): number {
  return flowLpm * 60 * hours;
}

// Calculate tank liters using a default conversion factor and reserve
export function tankLiters(
  psi: number,
  factor = 1.57,
  reserve = 200
): number {
  return Math.max(0, psi * factor - reserve);
}

// Alias for HomeScreen: tank liters with explicit factor
export function tankLitersWithFactor(
  psi: number,
  factor: number,
  reserve = 200
): number {
  return tankLiters(psi, factor, reserve);
}

// Calculate remaining fraction given consumed and supply
export function remainingFraction(consumed: number, supply: number): number {
  return supply > 0 ? Math.max(0, 1 - consumed / supply) : 0;
}

// Determine status message based on remaining fraction
export function statusMessage(fraction: number): 'OK' | 'CAUTION' | 'STOP' {
  if (fraction <= 0) return 'STOP';
  if (fraction < 0.25) return 'CAUTION';
  return 'OK';
}