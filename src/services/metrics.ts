import { getMetricsModel } from "../models/metrics";

export async function getMetricsService() {
  return await getMetricsModel()
}