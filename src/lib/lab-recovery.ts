import {currentRecovery,missionFieldProblem,type MissionState} from './mission-engine';

/** Preserved historical runs remain readable, but do not establish this field mission. */
export function completedRecoverySupportsLab(run:MissionState|undefined):boolean {
  return Boolean(run&&run.kind==='recovery'&&run.status==='complete'&&currentRecovery(run)&&missionFieldProblem(run)===null);
}
