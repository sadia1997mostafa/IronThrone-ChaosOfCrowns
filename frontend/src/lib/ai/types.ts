import type { RegionId } from '@/assets/mapPaths'
import type { HouseId, RegionInfo } from '@/data/regionData'

export type PlayableHouseId = Exclude<HouseId, 'neutral'>
export type DiplomacyState = 'allied' | 'neutral' | 'hostile'
export type AILinguisticLevel = 'Low' | 'Medium' | 'High'
export type AIActionType = 'attack' | 'defend' | 'hold' | 'reinforce'
export type FuzzyVariableName = 'ownStrength' | 'enemyStrength' | 'regionImportance' | 'resources' | 'aggression'
export type FuzzyCategory = 'low' | 'medium' | 'high'
export type RuleIntensity = 'medium' | 'mediumHigh' | 'high'

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

export type FuzzyInputValues = {
  ownStrength: number
  enemyStrength: number
  regionImportance: number
  resources: number
  aggression: number
}

export type HouseTraitProfile = {
  label: string
  aggression: number
}

export type FuzzyMembershipSet = Record<FuzzyCategory, number>

export type FuzzyMembershipMap = Record<FuzzyVariableName, FuzzyMembershipSet>

export type FuzzyRuleEvaluation = {
  id: string
  description: string
  action: AIActionType
  intensity: RuleIntensity
  strength: number
}

export type FuzzyRuleCondition = {
  variable: FuzzyVariableName
  category: FuzzyCategory
  label: string
  value: number
}

export type FuzzyRuleCalculation = FuzzyRuleEvaluation & {
  conditions: FuzzyRuleCondition[]
  contribution: number
}

export type FuzzyActionBreakdown = {
  action: AIActionType
  label: string
  total: number
  contributions: Array<{
    ruleId: string
    contribution: number
  }>
}

export type FuzzyStrategicOutput = {
  attackDesire: number
  defendDesire: number
  holdDesire: number
  reinforceDesire: number
  aggressionLevel: AILinguisticLevel
  pressureLevel: AILinguisticLevel
  readinessLevel: AILinguisticLevel
}

export type CandidateAction = {
  key: string
  action: AIActionType
  label: string
  score: number
}

export type FuzzyReferenceCase = {
  house: string
  inputs: FuzzyInputValues
  expectedAction: AIActionType
}

export type FuzzyReferenceResult = FuzzyReferenceCase & {
  actualAction: AIActionType
  scores: FuzzyStrategicOutput
}

export type AIDecisionTrace = {
  inputs: FuzzyInputValues
  memberships: FuzzyMembershipMap
  strategic: FuzzyStrategicOutput
  candidates: CandidateAction[]
  rules: FuzzyRuleEvaluation[]
  ruleCalculations: FuzzyRuleCalculation[]
  actionBreakdown: FuzzyActionBreakdown[]
  focusRegionId: RegionId | null
  focusRegionName: string | null
  attackSourceRegionId: RegionId | null
  attackSourceRegionName: string | null
  targetRegionId: RegionId | null
  targetRegionName: string | null
  finalDecisionLabel: string
}

export type AIDecision = {
  action: AIActionType
  regionId: RegionId | null
  targetId: RegionId | null
  reason: string
  trace: AIDecisionTrace
}
