import { Status, WorkerStatus } from "../controllers/site"
import { GlobalStatus } from "./ipc-types"

/* eslint-disable @typescript-eslint/naming-convention */
export enum SiteDisplayStatus {
  Stopped = `STOPPED`,
  Starting = `STARTING`,
  Running = `RUNNING`,
  Errored = `ERRORED`,
}
/* eslint-enable @typescript-eslint/naming-convention */

export function getSiteDisplayStatus(status: Status): SiteDisplayStatus {
  switch (status) {
    case GlobalStatus.InProgress:
      return SiteDisplayStatus.Starting
    case GlobalStatus.Success:
    case WorkerStatus.RunningInBackground:
      return SiteDisplayStatus.Running
    case GlobalStatus.Failed:
    case GlobalStatus.Interrupted:
      return SiteDisplayStatus.Errored
    default:
      return SiteDisplayStatus.Stopped
  }
}

export const siteDisplayStatusLabels: Record<SiteDisplayStatus, string> = {
  [SiteDisplayStatus.Stopped]: `Stopped`,
  [SiteDisplayStatus.Starting]: `Starting`,
  [SiteDisplayStatus.Running]: `Running`,
  [SiteDisplayStatus.Errored]: `Errored`,
}

export function isErrored(status: Status): boolean {
  return status === GlobalStatus.Failed || status === GlobalStatus.Interrupted
}

export function isRunning(status: Status): boolean {
  return (
    status === GlobalStatus.Success ||
    status === WorkerStatus.RunningInBackground
  )
}

export function isStarting(status: Status): boolean {
  return status === GlobalStatus.InProgress
}
