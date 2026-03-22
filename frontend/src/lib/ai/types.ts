import type { RegionId } from '@/assets/mapPaths'
import type { HouseId, RegionInfo } from '@/data/regionData'

export type PlayableHouseId = Exclude<HouseId, 'neutral'>
export type DiplomacyState = 'allied' | 'neutral' | 'hostile'
export type RiskLevel = 'Low' | 'Medium' | 'High'
export type AILinguisticLevel = 'Low' | 'Medium' | 'High'

export type AIActionType = 'attack' | 'fortify' | 'recruit' | 'gather'

export type AIInputState = {
  house: PlayableHouseId
  regions: Record<RegionId, RegionInfo>
  availableRegionIds: RegionId[]
  diplomacy: Record<PlayableHouseId, Record<PlayableHouseId, DiplomacyState>>
  resources: {
    gold: number
    food: number
    influence: number
  }
}

export type StrategicMetrics = {
  ownArmyPower: number
  enemyWeakness: number
  goldPressure: number
  borderThreat: number
  neutralOpportunity: number
  targetValue: number
  dragonStamina: number
}

export type FuzzyStrategicOutput = {
  attackDesire: number
  fortifyDesire: number
  recruitDesire: number
  gatherDesire: number
  dragonDeployDesire: number
  aggressionLevel: AILinguisticLevel
  threatLevel: AILinguisticLevel
  desperationLevel: AILinguisticLevel
  economyPressure: AILinguisticLevel
  borderDanger: AILinguisticLevel
}

export type CandidateAction = {
  key: string
  action: AIActionType
  label: string
  regionId?: RegionId
  sourceId?: RegionId
  targetId?: RegionId
  score?: number
  metadata?: {
    attackPower?: number
    defensePower?: number
  }
}

export type BattlePrediction = {
  targetId: RegionId
  targetName: string
  winChance: number
  expectedAttackerLoss: number
  expectedDefenderLoss: number
  risk: RiskLevel
}

export type AIDecisionTrace = {
  strategic: FuzzyStrategicOutput
  candidates: CandidateAction[]
  scoredCandidates: CandidateAction[]
  battlePrediction: BattlePrediction | null
  finalDecisionLabel: string
}

export type AIDecision =
  | { action: 'gather'; regionId: RegionId; reason: string; trace: AIDecisionTrace }
  | { action: 'recruit'; regionId: RegionId; reason: string; trace: AIDecisionTrace }
  | { action: 'fortify'; regionId: RegionId; reason: string; trace: AIDecisionTrace }
  | { action: 'attack'; sourceId: RegionId; targetId: RegionId; reason: string; trace: AIDecisionTrace }
