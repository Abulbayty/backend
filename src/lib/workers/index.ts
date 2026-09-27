import type { PrismaClient } from '@prisma/client';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';
import { registerScheduledJobs } from '../jobs/scheduler';
import { createAnalyticsWorker } from './analytics.worker';
import { createEmailWorker } from './email.worker';
import { createExportsWorker } from './exports.worker';
import { createImageProcessingWorker } from './image-processing.worker';
import { createStellarConfirmationWorker } from './stellar-confirmation.worker';
import { createWebhookDispatchWorker } from './webhook-dispatch.worker';

/**
 * Start the worker pool. `prisma` is forwarded to the workers that need database
 * access (media processing); workers that only touch Redis or Stellar ignore it.
 */
export async function startWorkers(prisma?: PrismaClient) {
  const workers = [
    createStellarConfirmationWorker(),
    createWebhookDispatchWorker(),
    createEmailWorker(),
    createImageProcessingWorker(prisma),
    createAnalyticsWorker(),
    createExportsWorker(),
  ];

  await registerScheduledJobs();
  logger.info(
    { concurrency: config.WORKER_CONCURRENCY, count: workers.length },
    'Background workers started',
  );

  return workers;
}

// Allow `pnpm worker` to run the pool as a standalone process.
const isDirectRun = process.argv[1]?.includes('workers/index');
if (isDirectRun) {
  startWorkers().catch((err) => {
    logger.error(err, 'Failed to start workers');
    process.exit(1);
  });
}
