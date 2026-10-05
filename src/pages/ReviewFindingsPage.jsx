import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ReviewFindingsPage() {
  const navigate = useNavigate()

  // ==========================================
  // CURRENT REVIEW SESSION
  // ==========================================

  const currentReview =
    JSON.parse(
      localStorage.getItem('currentReview')
    ) || null

  const selectedPolicies =
    currentReview?.selectedPolicies ||
    JSON.parse(
      localStorage.getItem('selectedPolicies')
    ) ||
    []

  const selectedGuidelines =
    currentReview?.selectedGuidelines ||
    JSON.parse(
      localStorage.getItem('selectedGuidelines')
    ) ||
    []

  const reviewName =
    currentReview?.name ||
    localStorage.getItem('newReviewName') ||
    'Policy Review Session'

  // ==========================================
  // FILTER
  // ==========================================

  const [activeFilter, setActiveFilter] =
    useState('All')

  // ==========================================
  // SAVED REVIEWER DECISIONS
  // ==========================================

  const recommendationDecisions =
    JSON.parse(
      localStorage.getItem(
        'recommendationDecisions'
      )
    ) || []

  function getDecision(result) {
    return recommendationDecisions.find(
      (decision) =>
        String(decision.reviewId) ===
          String(currentReview?.id || null) &&
        String(decision.findingId) ===
          String(result.id)
    )
  }

  // ==========================================
  // DEMONSTRATION SCREENING RESULTS
  // ==========================================

  const policyOne =
    selectedPolicies[0]?.name ||
    selectedPolicies[0]?.fileName ||
    'Cardiac Coverage Policy'

  const policyTwo =
    selectedPolicies[1]?.name ||
    selectedPolicies[1]?.fileName ||
    selectedPolicies[0]?.name ||
    selectedPolicies[0]?.fileName ||
    'Diabetes Treatment Policy'

  const policyThree =
    selectedPolicies[2]?.name ||
    selectedPolicies[2]?.fileName ||
    selectedPolicies[0]?.name ||
    selectedPolicies[0]?.fileName ||
    'Oncology Coverage Policy'

  const guidelineOne =
    selectedGuidelines[0]?.name ||
    '2026 Cardiac Coverage Guideline'

  const guidelineTwo =
    selectedGuidelines[1]?.name ||
    selectedGuidelines[0]?.name ||
    '2026 Diabetes Treatment Guideline'

  const guidelineThree =
    selectedGuidelines[2]?.name ||
    selectedGuidelines[0]?.name ||
    '2026 Oncology Coverage Guideline'

  const results = [
    {
      id: 1,

      policy: policyOne,

      guideline: guidelineOne,

      status: 'Suggested Change',

      priority: 'High',

      category: 'Coverage Criteria',

      policyCriterion: 'Criterion 4.2.1',

      guidelineCriterion: 'Criterion 4.2.1',

      summary:
        'Current policy criteria may be narrower than the selected reference guideline.',

      rationale:
        'The reference guideline includes an additional qualifying clinical pathway that is not clearly represented in the current policy language.',

      policyText:
        'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A and B, including documented ischemia.',

      guidelineText:
        'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A, B, and C, including documented ischemia or significant anatomical findings.',

      suggestedText:
        'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A, B, or C, including documented ischemia or significant anatomical findings.',
    },

    {
      id: 2,

      policy: policyTwo,

      guideline: guidelineTwo,

      status: 'Suggested Change',

      priority: 'Low',

      category: 'Prior Authorization',

      policyCriterion: 'Prior Authorization',

      guidelineCriterion: 'Criterion 7.1.2',

      summary:
        'Prior authorization wording should be clarified to better match the selected guideline.',

      rationale:
        'The policy and guideline are generally aligned, but the guideline provides clearer language regarding exceptions to prior authorization requirements.',

      policyText:
        'Prior authorization is required for advanced diabetes therapies, including GLP-1 agonists, except in certain cases.',

      guidelineText:
        'Prior authorization is required for advanced diabetes therapies, including GLP-1 agonists, with exceptions for patients meeting established continuation-of-therapy criteria.',

      suggestedText:
        'Prior authorization is required for advanced diabetes therapies, including GLP-1 agonists, except for patients who meet established continuation-of-therapy criteria.',
    },

    {
      id: 3,

      policy: policyThree,

      guideline: guidelineThree,

      status: 'No Change Needed',

      priority: 'None',

      category: 'Clinical Eligibility',

      policyCriterion: 'Eligibility Criteria',

      guidelineCriterion: 'Clinical Eligibility',

      summary:
        'The reviewed policy language is consistent with the selected reference guideline.',

      rationale:
        'The screening did not identify a meaningful difference between the current policy criteria and the selected reference guideline.',

      policyText:
        'Coverage is available when clinical eligibility requirements and documented treatment criteria are satisfied.',

      guidelineText:
        'Coverage is appropriate when established clinical eligibility and treatment criteria are satisfied.',

      suggestedText: '',
    },
  ]

  // ==========================================
  // COUNTS
  // ==========================================

  const highPriorityCount =
    results.filter(
      (result) =>
        result.status ===
          'Suggested Change' &&
        result.priority === 'High'
    ).length

  const lowPriorityCount =
    results.filter(
      (result) =>
        result.status ===
          'Suggested Change' &&
        result.priority === 'Low'
    ).length

  const noChangeCount =
    results.filter(
      (result) =>
        result.status ===
        'No Change Needed'
    ).length

  const actionCount =
    results.filter(
      (result) =>
        result.status ===
          'Suggested Change' &&
        !getDecision(result)
    ).length

  const decidedCount =
    results.filter(
      (result) =>
        result.status ===
          'Suggested Change' &&
        getDecision(result)
    ).length

  // ==========================================
  // FILTER RESULTS
  // ==========================================

  const visibleResults =
    results.filter((result) => {
      if (activeFilter === 'All') {
        return true
      }

      if (
        activeFilter ===
        'Needs Attention'
      ) {
        return (
          result.status ===
            'Suggested Change' &&
          !getDecision(result)
        )
      }

      if (activeFilter === 'Decided') {
        return Boolean(
          getDecision(result)
        )
      }

      if (
        activeFilter ===
        'High Priority'
      ) {
        return (
          result.status ===
            'Suggested Change' &&
          result.priority === 'High'
        )
      }

      if (
        activeFilter ===
        'Low Priority'
      ) {
        return (
          result.status ===
            'Suggested Change' &&
          result.priority === 'Low'
        )
      }

      if (
        activeFilter ===
        'No Change Needed'
      ) {
        return (
          result.status ===
          'No Change Needed'
        )
      }

      return true
    })

  // ==========================================
  // OPEN RECOMMENDATION
  // ==========================================

  function openRecommendation(result) {
    localStorage.setItem(
      'currentFinding',
      JSON.stringify(result)
    )

    navigate(
      `/reviews/findings/${result.id}/edit`
    )
  }

  // ==========================================
  // COMPLETE REVIEW
  // ==========================================

  function completeReview() {
    if (!currentReview) {
      navigate('/reviews')
      return
    }

    if (actionCount > 0) {
      const continueAnyway =
        window.confirm(
          `${actionCount} ${
            actionCount === 1
              ? 'recommendation still requires'
              : 'recommendations still require'
          } a reviewer decision. Complete this review session anyway?`
        )

      if (!continueAnyway) {
        return
      }
    } else {
      const confirmed =
        window.confirm(
          'All recommendations have been reviewed. Mark this review session as completed?'
        )

      if (!confirmed) {
        return
      }
    }

    const completedReview = {
      ...currentReview,
      status: 'Completed',
    }

    const savedReviews =
      JSON.parse(
        localStorage.getItem(
          'createdReviews'
        )
      ) || []

    const updatedReviews =
      savedReviews.map((review) => {
        if (
          String(review.id) ===
          String(currentReview.id)
        ) {
          return {
            ...review,
            status: 'Completed',
          }
        }

        return review
      })

    localStorage.setItem(
      'createdReviews',
      JSON.stringify(updatedReviews)
    )

    localStorage.setItem(
      'currentReview',
      JSON.stringify(completedReview)
    )

    navigate('/reviews')
  }

  return (
    <div className="app-page">
      {/* ======================================
          TOP BAR
      ====================================== */}

      <header className="top-bar">
        <div className="brand-area">
          <span className="brand-name">
            Policy Review
          </span>

          <span className="brand-divider"></span>

          <span className="workspace-name">
            Policy Review Workspace
          </span>
        </div>

        <div className="top-right">
          <div className="search-box">
            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search policies, guidelines..."
            />
          </div>

          <span className="top-icon">
            ?
          </span>

          <span className="top-icon">
            ⚙
          </span>

          <div className="user-area">
            <div className="user-avatar">
              SC
            </div>

            <span>
              Sarah Chen
            </span>
          </div>
        </div>
      </header>

      <div className="app-body">
        {/* ==================================
            SIDEBAR
        ================================== */}

        <aside className="sidebar">
          <Link
            to="/dashboard"
            className="nav-item"
          >
            <span className="nav-icon">
              ▦
            </span>

            Dashboard
          </Link>

          <Link
            to="/reviews"
            className="nav-item active"
          >
            <span className="nav-icon">
              ▣
            </span>

            Review Sessions
          </Link>

          <Link
            to="/policies"
            className="nav-item"
          >
            <span className="nav-icon">
              ⊗
            </span>

            Policy Database
          </Link>

          <Link
            to="/guidelines"
            className="nav-item"
          >
            <span className="nav-icon">
              ⊗
            </span>

            Guideline Database
          </Link>
        </aside>

        {/* ==================================
            MAIN CONTENT
        ================================== */}

        <main className="review-findings-content">
          <Link
            to="/reviews"
            className="back-link"
          >
            ← Back to Review Sessions
          </Link>

          {/* ==================================
              TITLE
          ================================== */}

          <div className="findings-title-row">
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#0078bf',
                  marginBottom: '6px',
                }}
              >
                REVIEW RESULTS
              </div>

              <h1>
                {reviewName}
              </h1>

              <p className="review-findings-subtitle">
                Automated screening is complete.
                Review the recommendations below
                and take action on suggested policy
                changes.
              </p>
            </div>

            {currentReview?.status !==
              'Completed' && (
              <button
                type="button"
                className="complete-review-button"
                onClick={completeReview}
              >
                Complete Review Session
              </button>
            )}
          </div>

          {/* ==================================
              REVIEW SUMMARY
          ================================== */}

          <section
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(4, 1fr)',
              gap: '14px',
              margin: '24px 0',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border:
                  '1px solid #dddddd',
                borderRadius: '6px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#777',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                POLICIES REVIEWED
              </div>

              <div
                style={{
                  fontSize: '27px',
                  fontWeight: '700',
                }}
              >
                {selectedPolicies.length}
              </div>
            </div>

            <div
              style={{
                background: '#fff7f7',
                border:
                  '1px solid #e6b7b7',
                borderRadius: '6px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#8c2d2d',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                HIGH PRIORITY
              </div>

              <div
                style={{
                  fontSize: '27px',
                  fontWeight: '700',
                  color: '#9f2424',
                }}
              >
                {highPriorityCount}
              </div>
            </div>

            <div
              style={{
                background: '#fffaf0',
                border:
                  '1px solid #e5d2a6',
                borderRadius: '6px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#8a6418',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                LOW PRIORITY
              </div>

              <div
                style={{
                  fontSize: '27px',
                  fontWeight: '700',
                  color: '#8a6418',
                }}
              >
                {lowPriorityCount}
              </div>
            </div>

            <div
              style={{
                background: '#f4faf5',
                border:
                  '1px solid #b9d7bd',
                borderRadius: '6px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#387644',
                  fontWeight: '700',
                  marginBottom: '8px',
                }}
              >
                NO CHANGE NEEDED
              </div>

              <div
                style={{
                  fontSize: '27px',
                  fontWeight: '700',
                  color: '#387644',
                }}
              >
                {noChangeCount}
              </div>
            </div>
          </section>

          {/* ==================================
              REVIEW STATUS BANNER
          ================================== */}

          {actionCount > 0 ? (
            <section
              style={{
                padding: '14px 18px',
                marginBottom: '20px',
                background: '#fff8e7',
                border:
                  '1px solid #e5cf93',
                borderLeft:
                  '4px solid #c38b13',
                borderRadius: '4px',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div>
                <strong>
                  {actionCount}{' '}
                  {actionCount === 1
                    ? 'recommendation requires'
                    : 'recommendations require'}{' '}
                  reviewer attention.
                </strong>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#666',
                    marginTop: '3px',
                  }}
                >
                  Review each suggested change
                  before completing this session.
                </div>
              </div>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#8a6418',
                  whiteSpace: 'nowrap',
                }}
              >
                ACTION REQUIRED
              </span>
            </section>
          ) : (
            <section
              style={{
                padding: '14px 18px',
                marginBottom: '20px',
                background: '#f4faf5',
                border:
                  '1px solid #b9d7bd',
                borderLeft:
                  '4px solid #4e8b59',
                borderRadius: '4px',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div>
                <strong>
                  All recommendations have been
                  reviewed.
                </strong>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#666',
                    marginTop: '3px',
                  }}
                >
                  This review session is ready to
                  be completed.
                </div>
              </div>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#387644',
                  whiteSpace: 'nowrap',
                }}
              >
                REVIEW COMPLETE
              </span>
            </section>
          )}

          {/* ==================================
              SESSION REFERENCES
          ================================== */}

          <section className="findings-selection-summary">
            <div className="findings-summary-column">
              <h3>
                Policies Reviewed
              </h3>

              {selectedPolicies.length >
              0 ? (
                selectedPolicies.map(
                  (policy) => (
                    <p key={policy.id}>
                      •{' '}
                      {policy.name ||
                        policy.fileName}
                    </p>
                  )
                )
              ) : (
                <p>
                  • No policies selected
                </p>
              )}
            </div>

            <div className="findings-summary-divider"></div>

            <div className="findings-summary-column">
              <h3>
                Reference Guidelines
              </h3>

              {selectedGuidelines.length >
              0 ? (
                selectedGuidelines.map(
                  (guideline) => (
                    <p key={guideline.id}>
                      • {guideline.name}
                    </p>
                  )
                )
              ) : (
                <p>
                  • No guidelines selected
                </p>
              )}
            </div>
          </section>

          {/* ==================================
              FILTERS
          ================================== */}

          <section
            style={{
              marginTop: '24px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: '700',
                marginRight: '4px',
              }}
            >
              Show:
            </span>

            {[
              {
                name: 'All',
                count: results.length,
              },
              {
                name: 'Needs Attention',
                count: actionCount,
              },
              {
                name: 'Decided',
                count: decidedCount,
              },
              {
                name: 'High Priority',
                count:
                  highPriorityCount,
              },
              {
                name: 'Low Priority',
                count:
                  lowPriorityCount,
              },
              {
                name:
                  'No Change Needed',
                count:
                  noChangeCount,
              },
            ].map((filter) => (
              <button
                key={filter.name}
                type="button"
                className={
                  activeFilter ===
                  filter.name
                    ? 'finding-filter-button active'
                    : 'finding-filter-button'
                }
                onClick={() =>
                  setActiveFilter(
                    filter.name
                  )
                }
              >
                {filter.name} (
                {filter.count})
              </button>
            ))}
          </section>

          {/* ==================================
              RESULTS
          ================================== */}

          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              paddingBottom: '30px',
            }}
          >
            {visibleResults.map(
              (result) => {
                const highPriority =
                  result.priority ===
                  'High'

                const noChange =
                  result.status ===
                  'No Change Needed'

                const decision =
                  getDecision(result)

                const isAccepted =
                  decision?.decision ===
                    'Accepted' ||
                  decision?.decision ===
                    'Accepted with Edits'

                const isRejected =
                  decision?.decision ===
                  'Rejected'

                return (
                  <div
                    key={result.id}
                    style={{
                      background: '#ffffff',

                      border: decision
                        ? isAccepted
                          ? '1px solid #b9d7bd'
                          : '1px solid #d4d4d4'
                        : noChange
                        ? '1px solid #b9d7bd'
                        : highPriority
                        ? '1px solid #dfb0b0'
                        : '1px solid #e2d0a6',

                      borderLeft: decision
                        ? isAccepted
                          ? '5px solid #4e8b59'
                          : '5px solid #777777'
                        : noChange
                        ? '5px solid #4e8b59'
                        : highPriority
                        ? '5px solid #b53939'
                        : '5px solid #c18a20',

                      borderRadius: '5px',
                      padding: '18px 20px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'flex-start',
                        gap: '24px',
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        {/* STATUS */}

                        <div
                          style={{
                            display: 'flex',
                            alignItems:
                              'center',
                            gap: '8px',
                            flexWrap:
                              'wrap',
                            marginBottom:
                              '9px',
                          }}
                        >
                          <span
                            style={{
                              display:
                                'inline-block',
                              padding:
                                '4px 9px',
                              borderRadius:
                                '12px',
                              fontSize:
                                '11px',
                              fontWeight:
                                '700',
                              background:
                                noChange
                                  ? '#eaf5ec'
                                  : highPriority
                                  ? '#f9e5e5'
                                  : '#fff2d5',
                              color:
                                noChange
                                  ? '#387644'
                                  : highPriority
                                  ? '#9f2424'
                                  : '#8a6418',
                            }}
                          >
                            {result.status}
                          </span>

                          {!noChange && (
                            <span
                              style={{
                                fontSize:
                                  '11px',
                                fontWeight:
                                  '700',
                                color:
                                  highPriority
                                    ? '#9f2424'
                                    : '#8a6418',
                              }}
                            >
                              {result.priority.toUpperCase()}{' '}
                              PRIORITY
                            </span>
                          )}

                          {decision && (
                            <span
                              style={{
                                display:
                                  'inline-block',
                                padding:
                                  '4px 9px',
                                borderRadius:
                                  '12px',
                                fontSize:
                                  '11px',
                                fontWeight:
                                  '700',
                                background:
                                  isAccepted
                                    ? '#eaf5ec'
                                    : '#eeeeee',
                                color:
                                  isAccepted
                                    ? '#387644'
                                    : '#555555',
                              }}
                            >
                              {isAccepted
                                ? '✓ '
                                : isRejected
                                ? '✕ '
                                : ''}
                              {decision.decision}
                            </span>
                          )}
                        </div>

                        {/* POLICY */}

                        <h2
                          style={{
                            fontSize:
                              '17px',
                            margin:
                              '0 0 5px',
                          }}
                        >
                          {result.policy}
                        </h2>

                        <div
                          style={{
                            fontSize:
                              '12px',
                            color:
                              '#777',
                            marginBottom:
                              '12px',
                          }}
                        >
                          {result.category}
                          {'  •  '}
                          Reference:{' '}
                          {result.guideline}
                        </div>

                        {/* SUMMARY */}

                        <p
                          style={{
                            margin:
                              '0 0 12px',
                            lineHeight:
                              '1.5',
                            color:
                              '#444',
                          }}
                        >
                          {result.summary}
                        </p>

                        <div
                          style={{
                            fontSize:
                              '12px',
                            color:
                              '#777',
                          }}
                        >
                          Policy section:{' '}
                          <strong>
                            {
                              result.policyCriterion
                            }
                          </strong>
                          {'  •  '}
                          Guideline section:{' '}
                          <strong>
                            {
                              result.guidelineCriterion
                            }
                          </strong>
                        </div>
                      </div>

                      {/* ACTION */}

                      <div
                        style={{
                          minWidth:
                            '190px',
                          textAlign:
                            'right',
                        }}
                      >
                        {noChange ? (
                          <div
                            style={{
                              color:
                                '#387644',
                              fontSize:
                                '13px',
                              fontWeight:
                                '700',
                              paddingTop:
                                '8px',
                            }}
                          >
                            ✓ No action required
                          </div>
                        ) : decision ? (
                          <div>
                            <div
                              style={{
                                fontSize:
                                  '13px',
                                fontWeight:
                                  '700',
                                color:
                                  isAccepted
                                    ? '#387644'
                                    : '#555555',
                                marginBottom:
                                  '9px',
                              }}
                            >
                              {isAccepted
                                ? '✓ Decision recorded'
                                : '✕ Decision recorded'}
                            </div>

                            <button
                              type="button"
                              className="view-edit-report-button"
                              onClick={() =>
                                openRecommendation(
                                  result
                                )
                              }
                            >
                              View Recommendation
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="view-edit-report-button"
                            onClick={() =>
                              openRecommendation(
                                result
                              )
                            }
                          >
                            Review Recommendation
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }
            )}

            {visibleResults.length ===
              0 && (
              <div
                style={{
                  padding: '35px',
                  textAlign: 'center',
                  background:
                    '#ffffff',
                  border:
                    '1px solid #dddddd',
                }}
              >
                No results match this
                filter.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default ReviewFindingsPage