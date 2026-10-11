
/*
  Shared policy-to-guideline mappings.

  These are demonstration associations for the
  five original policies and guidelines.

  Future guidelines can define their own policyIds
  when supplied by the system.
*/

// ==========================================
// ORIGINAL GUIDELINE MAPPINGS
// ==========================================

export const defaultGuidelineMappings = [
  {
    guidelineId: 1,
    policyIds: [1],
  },
  {
    guidelineId: 2,
    policyIds: [2],
  },
  {
    guidelineId: 3,
    policyIds: [3],
  },
  {
    guidelineId: 4,
    policyIds: [4],
  },
  {
    guidelineId: 5,
    policyIds: [5],
  },
]

// ==========================================
// GET POLICIES ASSOCIATED WITH A GUIDELINE
// ==========================================

export function getGuidelinePolicyIds(guideline) {
  if (Array.isArray(guideline.policyIds)) {
    return guideline.policyIds
  }

  const defaultMapping = defaultGuidelineMappings.find(
    (mapping) =>
      String(mapping.guidelineId) === String(guideline.id)
  )

  return defaultMapping?.policyIds || []
}

// ==========================================
// GET GUIDELINES FOR ONE POLICY
// ==========================================

export function getGuidelinesForPolicy(
  policy,
  guidelines
) {
  return guidelines.filter((guideline) =>
    getGuidelinePolicyIds(guideline).some(
      (id) => String(id) === String(policy.id)
    )
  )
}

// ==========================================
// GET GUIDELINES FOR MULTIPLE POLICIES
// ==========================================

export function getGuidelinesForPolicies(
  policies,
  guidelines
) {
  const selectedPolicyIds = new Set(
    policies.map((policy) => String(policy.id))
  )

  const matchingGuidelines = guidelines.filter(
    (guideline) =>
      getGuidelinePolicyIds(guideline).some((id) =>
        selectedPolicyIds.has(String(id))
      )
  )

  // Prevent duplicate guidelines.
  return matchingGuidelines.filter(
    (guideline, index, array) =>
      array.findIndex(
        (item) =>
          String(item.id) === String(guideline.id)
      ) === index
  )
}

// ==========================================
// GET POLICIES FOR ONE GUIDELINE
// ==========================================

export function getPoliciesForGuideline(
  guideline,
  policies
) {
  const mappedIds = getGuidelinePolicyIds(guideline)

  return policies.filter((policy) =>
    mappedIds.some(
      (id) => String(id) === String(policy.id)
    )
  )
}
