
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ReviewFindingsPage() {
  const navigate = useNavigate()

  // ==========================================
  // CURRENT REVIEW
  // ==========================================

  const currentReview =
    JSON.parse(localStorage.getItem('currentReview')) || null

  const selectedPolicies = currentReview?.policies || []
  const selectedGuidelines = currentReview?.guidelines || []
  const guidelineMode = currentReview?.guidelineMode || 'automatic'

  // Each review has its own read/unread records.
  const readStorageKey = `readFindings_${currentReview?.id ?? 'demo'}`

  const [readFindingIds, setReadFindingIds] = useState(() => {
    return JSON.parse(localStorage.getItem(readStorageKey)) || []
  })

  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Priority')

  // ==========================================
  // EXAMPLE FINDINGS
  // ==========================================

  // These remain demonstration findings.
  // Real document analysis would require a backend.

  const findings = [
    {
      id: 1,

      policy:
        selectedPolicies[0]?.fileName ||
        selectedPolicies[0]?.name ||
        'Cardiac_Coverage_Policy_v4.pdf',

      policyCriterion: 'Criterion 4.2.1',

      policyText:
        'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A and B, including documented ischemia...',

      guideline:
        selectedGuidelines[0]?.name ||
        (guidelineMode === 'automatic'
          ? 'Automatically Selected Guidelines'
          : '2026 Cardiac Coverage Guidelines'),

      guidelineCriterion: 'Criterion 4.2.1',

      guidelineText:
        'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A, B, and C, including documented ischemia or significant anatomical findings...',

      type: 'Change',
      priority: 'High',
    },

    {
      id: 2,

      policy:
        selectedPolicies[1]?.fileName ||
        selectedPolicies[1]?.name ||
        selectedPolicies[0]?.fileName ||
        selectedPolicies[0]?.name ||
        'Diabetes_Treatment_Policy_v3.pdf',

      policyCriterion: '',

      policyText:
        'Prior authorization is required for advanced diabetes therapies, including GLP-1 agonists, except in certain cases...',

      guideline:
        selectedGuidelines[1]?.name ||
        selectedGuidelines[0]?.name ||
        (guidelineMode === 'automatic'
          ? 'Automatically Selected Guidelines'
          : '2026 Diabetes Treatment Guidelines'),

      guidelineCriterion: 'Criterion 7.1.2',

      guidelineText:
        'Prior authorization is required for advanced diabetes therapies, including GLP-1 agonists, except in certain cases...',

      type: 'Change',
      priority: 'Medium',
    },

    {
      id: 3,

      policy:
        selectedPolicies[2]?.fileName ||
        selectedPolicies[2]?.name ||
        selectedPolicies[0]?.fileName ||
        selectedPolicies[0]?.name ||
        'Oncology_Policy_v2.pdf',

      policyCriterion: '',

      policyText:
        'Coverage for targeted therapies is recommended for patients with prior intolerance to first-line treatment, except in...',

      guideline:
        selectedGuidelines[2]?.name ||
        selectedGuidelines[0]?.name ||
        (guidelineMode === 'automatic'
          ? 'Automatically Selected Guidelines'
          : '2026 Oncology Coverage Guidelines'),

      guidelineCriterion: 'Criterion 11.4.3',

      guidelineText:
        'Coverage for targeted therapies is not recommended for patients with prior intolerance to first-line treatment, except in...',

      type: 'Add',
      priority: 'Low',
    },
  ]

  // ==========================================
  // FILTER COUNTS
  // ==========================================

  const filters = [
    {
      name: 'All',
      count: findings.length,
    },
    {
      name: 'Change',
      count: findings.filter(
        (finding) => finding.type === 'Change'
      ).length,
    },
    {
      name: 'Add',
      count: findings.filter(
        (finding) => finding.type === 'Add'
      ).length,
    },
    {
      name: 'Remove',
      count: findings.filter(
        (finding) => finding.type === 'Remove'
      ).length,
    },
    {
      name: 'High',
      count: findings.filter(
        (finding) => finding.priority === 'High'
      ).length,
    },
    {
      name: 'Medium',
      count: findings.filter(
        (finding) => finding.priority === 'Medium'
      ).length,
    },
    {
      name: 'Low',
      count: findings.filter(
        (finding) => finding.priority === 'Low'
      ).length,
    },
  ]

  // ==========================================
  // FILTER AND SORT
  // ==========================================

  const visibleFindings = findings
    .filter((finding) => {
      if (activeFilter === 'All') {
        return true
      }

      if (['Change', 'Add', 'Remove'].includes(activeFilter)) {
        return finding.type === activeFilter
      }

      return finding.priority === activeFilter
    })
    .sort((a, b) => {
      if (sortBy === 'Priority') {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        }

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        )
      }

      if (sortBy === 'Policy') {
        return a.policy.localeCompare(b.policy)
      }

      if (sortBy === 'Finding Type') {
        return a.type.localeCompare(b.type)
      }

      return 0
    })

  // ==========================================
  // OPEN FINDING AND MARK AS READ
  // ==========================================

  function openReport(finding) {
    const updatedReadIds = readFindingIds.includes(finding.id)
      ? readFindingIds
      : [...readFindingIds, finding.id]

    localStorage.setItem(
      readStorageKey,
      JSON.stringify(updatedReadIds)
    )

    setReadFindingIds(updatedReadIds)

    localStorage.setItem(
      'currentFinding',
      JSON.stringify({
        ...finding,
        unread: false,
      })
    )

    navigate(`/reviews/findings/${finding.id}/edit`)
  }

  // ==========================================
  // COMPLETE REVIEW
  // ==========================================

  function completeReview() {
    if (!currentReview) {
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to mark this review as completed?'
    )

    if (!confirmed) {
      return
    }

    const completedReview = {
      ...currentReview,
      status: 'Completed',
    }

    const savedReviews =
      JSON.parse(localStorage.getItem('createdReviews')) || []

    const updatedReviews = savedReviews.map((review) => {
      if (String(review.id) === String(currentReview.id)) {
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

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="app-page">

      {/* TOP BAR */}

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
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search policies, codes..."
            />
          </div>

          <span className="top-icon">?</span>
          <span className="top-icon">⚙</span>

          <div className="user-area">
            <div className="user-avatar">SC</div>
            <span>Sarah Chen</span>
          </div>
        </div>
      </header>

      <div className="app-body">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <Link to="/dashboard" className="nav-item">
            <span className="nav-icon">▦</span>
            Dashboard
          </Link>

          <Link to="/reviews" className="nav-item active">
            <span className="nav-icon">▣</span>
            Policy Reviews
          </Link>

          <Link to="/guidelines" className="nav-item">
            <span className="nav-icon">⊗</span>
            Guidelines
          </Link>

          <Link to="/policies" className="nav-item">
            <span className="nav-icon">⊗</span>
            Policies
          </Link>

        </aside>

        {/* MAIN CONTENT */}

        <main className="review-findings-content">

          <Link to="/reviews" className="back-link">
            ← Back to Policy Reviews
          </Link>

          {/* TITLE AND COMPLETE REVIEW */}

          <div className="findings-title-row">

            <div>
              <h1>
                {currentReview?.name || 'Review Findings'}
              </h1>

              <p className="review-findings-subtitle">
                Identified policy changes based on the comparison
                of uploaded policies with external guidelines.
              </p>
            </div>

            {currentReview &&
              currentReview.status !== 'Completed' && (

                <button
                  type="button"
                  className="complete-review-button"
                  onClick={completeReview}
                >
                  Complete Review
                </button>

              )}

          </div>

          {/* SELECTED DOCUMENTS */}

          <section className="findings-selection-summary">

            {/* GUIDELINES */}

            <div className="findings-summary-column">
              <h3>
                External Guidelines Selected
              </h3>

              {guidelineMode === 'automatic' ? (

                <p>
                  • Automatically identify relevant guidelines
                </p>

              ) : selectedGuidelines.length > 0 ? (

                selectedGuidelines.map((guideline) => (
                  <p key={guideline.id}>
                    • {guideline.name}
                  </p>
                ))

              ) : (

                <p>• No guidelines selected</p>

              )}
            </div>

            <div className="findings-summary-divider"></div>

            {/* POLICIES */}

            <div className="findings-summary-column">
              <h3>Policies Selected</h3>

              {selectedPolicies.length > 0 ? (

                selectedPolicies.map((policy) => (
                  <p key={policy.id}>
                    • {policy.name || policy.fileName}
                  </p>
                ))

              ) : (

                <p>• No policies selected</p>

              )}
            </div>

          </section>

          {/* FILTER BAR */}

          <section className="findings-filter-bar">

            <div className="findings-filter-left">

              <span className="filter-label">
                Filter
              </span>

              {filters.map((filter) => (

                <button
                  key={filter.name}
                  type="button"
                  className={
                    activeFilter === filter.name
                      ? 'finding-filter-button active'
                      : 'finding-filter-button'
                  }
                  onClick={() =>
                    setActiveFilter(filter.name)
                  }
                >
                  {filter.name} ({filter.count})
                </button>

              ))}

            </div>

            <div className="findings-sort">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >
                <option value="Priority">
                  Priority
                </option>

                <option value="Policy">
                  Policy
                </option>

                <option value="Finding Type">
                  Finding Type
                </option>
              </select>
            </div>

          </section>

          {/* FINDINGS TABLE */}

          <section className="findings-table">

            <div className="findings-table-header">
              <div>POLICY</div>
              <div>GUIDELINES REFERENCED</div>
              <div></div>
            </div>

            <div className="findings-scroll-area">

              {visibleFindings.map((finding) => {

                const isUnread =
                  !readFindingIds.includes(finding.id)

                return (

                  <div
                    className="finding-row"
                    key={finding.id}
                  >

                    {/* POLICY */}

                    <div className="finding-policy-column">

                      <strong>
                        {finding.policy}
                      </strong>

                      {finding.policyCriterion && (
                        <span className="finding-criterion">
                          {finding.policyCriterion}
                        </span>
                      )}

                      <p>
                        {finding.policyText}
                      </p>

                    </div>

                    {/* GUIDELINE */}

                    <div className="finding-guideline-column">

                      <strong>
                        {finding.guideline}
                      </strong>

                      <span className="finding-criterion">
                        {finding.guidelineCriterion}
                      </span>

                      <p>
                        {finding.guidelineText}
                      </p>

                    </div>

                    {/* ACTION */}

                    <div className="finding-action-column">

                      {isUnread && (
                        <span className="finding-unread">
                          ● Unread
                        </span>
                      )}

                      <button
                        type="button"
                        className="view-edit-report-button"
                        onClick={() =>
                          openReport(finding)
                        }
                      >
                        View and edit report
                      </button>

                    </div>

                  </div>

                )
              })}

              {visibleFindings.length === 0 && (
                <div
                  style={{
                    padding: '30px',
                    textAlign: 'center',
                  }}
                >
                  No findings match this filter.
                </div>
              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  )
}

export default ReviewFindingsPage
