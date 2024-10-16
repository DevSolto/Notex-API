import { Router } from "express";
import { getMetricsService } from "../services/metrics";

export const metricsRouter = Router();

metricsRouter.get('/metrics', async (req, res) => {
  try {
    const metrics = await getMetricsService();
    res.send(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching metrics' });
  }
});