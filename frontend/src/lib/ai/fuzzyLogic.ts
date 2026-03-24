import type {
  AIActionType,
  AILinguisticLevel,
  CandidateAction,
  FuzzyActionBreakdown,
  FuzzyCategory,
  FuzzyInputValues,
  FuzzyRuleCalculation,
  FuzzyMembershipMap,
  FuzzyMembershipSet,
  FuzzyReferenceCase,
  FuzzyReferenceResult,
  FuzzyRuleEvaluation,
  FuzzyStrategicOutput,
  RuleIntensity,
} from './types'

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value))

const triangular = (value: number, left: number, peak: number, right: number) => {
  if (value <= left || value >= right) return 0
  if (value === peak) return 1
  if (value < peak) return (value - left) / (peak - left)
  return (right - value) / (right - peak)
}

const leftShoulder = (value: number, start: number, end: number) => {
  if (value <= start) return 1
  if (value >= end) return 0
  return (end - value) / (end - start)
}

const rightShoulder = (value: number, start: number, end: number) => {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / (end - start)
}

const toLevel = (value: number): AILinguisticLevel => {
  if (value >= 67) return 'High'
  if (value >= 34) return 'Medium'
  return 'Low'
}

const intensityWeight: Record<RuleIntensity, number> = {
  medium: 55,
  mediumHigh: 72,
  high: 90,
}

const variableLabel: Record<keyof FuzzyMembershipMap, string> = {
  ownStrength: 'Own Strength',
  enemyStrength: 'Enemy Strength',
  regionImportance: 'Region Importance',
  resources: 'Gold',
  aggression: 'Aggression',
}

const categoryLabel: Record<FuzzyCategory, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const variableMembership = (value: number): FuzzyMembershipSet => ({
  low: clamp(leftShoulder(value, 20, 50), 0, 1),
  medium: clamp(triangular(value, 25, 55, 85), 0, 1),
  high: clamp(rightShoulder(value, 45, 75), 0, 1),
})

const membershipOf = (membership: FuzzyMembershipMap, variable: keyof FuzzyMembershipMap, category: FuzzyCategory) =>
  membership[variable][category]

function minStrength(...values: number[]) {
  return values.reduce((lowest, current) => Math.min(lowest, current), 1)
}

function scoreFromRules(action: AIActionType, rules: FuzzyRuleEvaluation[]) {
  const total = rules
    .filter((rule) => rule.action === action)
    .reduce((sum, rule) => sum + rule.strength * intensityWeight[rule.intensity], 0)

  return Math.round(clamp(total) * 100) / 100
}

function condition(
  memberships: FuzzyMembershipMap,
  variable: keyof FuzzyMembershipMap,
  category: FuzzyCategory
) {
  return {
    variable,
    category,
    label: `${variableLabel[variable]} is ${categoryLabel[category]}`,
    value: membershipOf(memberships, variable, category),
  }
}

function buildRuleCalculation(
  id: string,
  description: string,
  action: AIActionType,
  intensity: RuleIntensity,
  conditions: FuzzyRuleCalculation['conditions']
): FuzzyRuleCalculation {
  const strength = minStrength(...conditions.map((entry) => entry.value))
  const contribution = Math.round(clamp(strength * intensityWeight[intensity]) * 100) / 100

  return {
    id,
    description,
    action,
    intensity,
    conditions,
    strength,
    contribution,
  }
}

function buildActionBreakdown(action: AIActionType, label: string, rules: FuzzyRuleCalculation[]): FuzzyActionBreakdown {
  const contributions = rules
    .filter((rule) => rule.action === action && rule.contribution > 0)
    .map((rule) => ({
      ruleId: rule.id,
      contribution: rule.contribution,
    }))

  return {
    action,
    label,
    total: Math.round(clamp(contributions.reduce((sum, entry) => sum + entry.contribution, 0)) * 100) / 100,
    contributions,
  }
}

export function buildFuzzyMemberships(inputs: FuzzyInputValues): FuzzyMembershipMap {
  return {
    ownStrength: variableMembership(inputs.ownStrength),
    enemyStrength: variableMembership(inputs.enemyStrength),
    regionImportance: variableMembership(inputs.regionImportance),
    resources: variableMembership(inputs.resources),
    aggression: variableMembership(inputs.aggression),
  }
}

export function evaluateFuzzyStrategic(inputs: FuzzyInputValues) {
  const memberships = buildFuzzyMemberships(inputs)

  const ruleCalculations = [
    buildRuleCalculation(
      'R1',
      'High own strength, low enemy strength, and high region importance push toward attack.',
      'attack',
      'high',
      [
        condition(memberships, 'ownStrength', 'high'),
        condition(memberships, 'enemyStrength', 'low'),
        condition(memberships, 'regionImportance', 'high'),
      ]
    ),
    buildRuleCalculation(
      'R2',
      'Low own strength against a high enemy threat pushes toward defend.',
      'defend',
      'mediumHigh',
      [condition(memberships, 'ownStrength', 'low'), condition(memberships, 'enemyStrength', 'high')]
    ),
    buildRuleCalculation(
      'R3',
      'Balanced conditions favor holding position.',
      'hold',
      'medium',
      [
        condition(memberships, 'ownStrength', 'medium'),
        condition(memberships, 'enemyStrength', 'medium'),
        condition(memberships, 'regionImportance', 'medium'),
      ]
    ),
    buildRuleCalculation(
      'R4',
      'High gold, high aggression, and high own strength support attack.',
      'attack',
      'mediumHigh',
      [
        condition(memberships, 'resources', 'high'),
        condition(memberships, 'aggression', 'high'),
        condition(memberships, 'ownStrength', 'high'),
      ]
    ),
    buildRuleCalculation(
      'R5',
      'High enemy pressure on an important region makes cautious houses defend.',
      'defend',
      'high',
      [
        condition(memberships, 'aggression', 'low'),
        condition(memberships, 'regionImportance', 'high'),
        condition(memberships, 'enemyStrength', 'high'),
      ]
    ),
    buildRuleCalculation(
      'R6',
      'Low strength and low gold call for reinforcement.',
      'reinforce',
      'high',
      [condition(memberships, 'ownStrength', 'low'), condition(memberships, 'resources', 'low')]
    ),
    buildRuleCalculation(
      'R7',
      'Strong but not overly aggressive houses hold under heavy pressure.',
      'hold',
      'mediumHigh',
      [
        condition(memberships, 'ownStrength', 'high'),
        condition(memberships, 'enemyStrength', 'high'),
        condition(memberships, 'aggression', 'medium'),
      ]
    ),
    buildRuleCalculation(
      'R8',
      'Aggressive houses exploit weak enemies.',
      'attack',
      'high',
      [condition(memberships, 'aggression', 'high'), condition(memberships, 'enemyStrength', 'low')]
    ),
  ] satisfies FuzzyRuleCalculation[]

  const activeRules: FuzzyRuleEvaluation[] = ruleCalculations
    .filter((rule) => rule.strength > 0.02)
    .map(({ id, description, action, intensity, strength }) => ({
      id,
      description,
      action,
      intensity,
      strength,
    }))

  const actionBreakdown = [
    buildActionBreakdown('attack', 'Attack', ruleCalculations),
    buildActionBreakdown('defend', 'Defend', ruleCalculations),
    buildActionBreakdown('hold', 'Hold', ruleCalculations),
    buildActionBreakdown('reinforce', 'Reinforce', ruleCalculations),
  ]

  const attackDesire = scoreFromRules('attack', ruleCalculations)
  const defendDesire = scoreFromRules('defend', ruleCalculations)
  const holdDesire = scoreFromRules('hold', ruleCalculations)
  const reinforceDesire = scoreFromRules('reinforce', ruleCalculations)

  const strategic: FuzzyStrategicOutput = {
    attackDesire,
    defendDesire,
    holdDesire,
    reinforceDesire,
    aggressionLevel: toLevel(inputs.aggression),
    pressureLevel: toLevel((inputs.enemyStrength * 0.6 + inputs.regionImportance * 0.4) / 1),
    readinessLevel: toLevel((inputs.ownStrength * 0.55 + inputs.resources * 0.45) / 1),
  }

  const candidates = [
    { key: 'attack', action: 'attack', label: 'Attack', score: strategic.attackDesire },
    { key: 'defend', action: 'defend', label: 'Defend', score: strategic.defendDesire },
    { key: 'hold', action: 'hold', label: 'Hold', score: strategic.holdDesire },
    { key: 'reinforce', action: 'reinforce', label: 'Reinforce', score: strategic.reinforceDesire },
  ] satisfies CandidateAction[]

  return {
    memberships,
    strategic,
    candidates: [...candidates].sort((a, b) => b.score - a.score),
    rules: [...activeRules].sort((a, b) => b.strength - a.strength),
    ruleCalculations,
    actionBreakdown,
  }
}

export const FUZZY_REFERENCE_CASES: FuzzyReferenceCase[] = [
  {
    house: 'Stark',
    expectedAction: 'defend',
    inputs: {
      ownStrength: 55,
      enemyStrength: 72,
      regionImportance: 88,
      resources: 50,
      aggression: 40,
    },
  },
  {
    house: 'Lannister',
    expectedAction: 'attack',
    inputs: {
      ownStrength: 82,
      enemyStrength: 58,
      regionImportance: 62,
      resources: 84,
      aggression: 76,
    },
  },
  {
    house: 'Tyrell',
    expectedAction: 'reinforce',
    inputs: {
      ownStrength: 40,
      enemyStrength: 56,
      regionImportance: 52,
      resources: 34,
      aggression: 50,
    },
  },
  {
    house: 'Targaryen',
    expectedAction: 'attack',
    inputs: {
      ownStrength: 88,
      enemyStrength: 38,
      regionImportance: 92,
      resources: 72,
      aggression: 92,
    },
  },
]

export function runFuzzyReferenceCases(): FuzzyReferenceResult[] {
  return FUZZY_REFERENCE_CASES.map((testCase) => {
    const result = evaluateFuzzyStrategic(testCase.inputs)

    return {
      ...testCase,
      actualAction: result.candidates[0]?.action || 'hold',
      scores: result.strategic,
    }
  })
}
