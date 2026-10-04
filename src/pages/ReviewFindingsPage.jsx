import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ReviewFindingsPage() {
  const navigate = useNavigate()

  const [activeFilter, setActiveFilter] = useState('All')


  // ==========================================
  // CURRENT REVIEW
  // ==========================================

  const currentReview =
    JSON.parse(
      localStorage.getItem('currentReview')
    ) || null


  // Get policies from the review
  const selectedPolicies =
    currentReview?.policies || []


  // Get guidelines from the review
  const selectedGuidelines =
    currentReview?.guidelines || []


  // Get guideline mode
  const guidelineMode =
    currentReview?.guidelineMode ||
    'automatic'


  // ==========================================
  // EXAMPLE FINDINGS
  // ==========================================

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

      unread: true,
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

      unread: false,
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

      unread: false,
    },
  ]


  // ==========================================
  // FILTERS
  // ==========================================

  const filters = [
    { name: 'All', count: 14 },
    { name: 'Change', count: 9 },
    { name: 'Add', count: 3 },
    { name: 'Remove', count: 2 },
    { name: 'High', count: 6 },
    { name: 'Medium', count: 5 },
    { name: 'Low', count: 3 },
  ]


  // ==========================================
  // FILTER FINDINGS
  // ==========================================

  const visibleFindings =
    findings.filter((finding) => {

      if (activeFilter === 'All') {
        return true
      }

      if (
        activeFilter === 'Change' ||
        activeFilter === 'Add' ||
        activeFilter === 'Remove'
      ) {
        return finding.type === activeFilter
      }

      return finding.priority === activeFilter
    })


  // ==========================================
  // OPEN REPORT
  // ==========================================

  function openReport(finding) {

    localStorage.setItem(
      'currentFinding',
      JSON.stringify(finding)
    )

    navigate(
      `/reviews/findings/${finding.id}/edit`
    )
  }


  return (
    <div className="app-page">


      {/* ======================================
          TOP HEADER
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
              placeholder="Search policies, codes..."
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



      {/* ======================================
          BODY
      ====================================== */}

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

            Policy Reviews

          </Link>


          <Link
            to="/guidelines"
            className="nav-item"
          >

            <span className="nav-icon">
              ⊗
            </span>

            Guidelines

          </Link>


          <Link
            to="/policies"
            className="nav-item"
          >

            <span className="nav-icon">
              ⊗
            </span>

            Policies

          </Link>


        </aside>



        {/* ==================================
            MAIN CONTENT
        ================================== */}

        <main className="review-findings-content">


          {/* BACK LINK */}

          <Link
            to="/reviews"
            className="back-link"
          >
            ← Back to Policy Reviews
          </Link>



          {/* TITLE */}

          <h1>
            {currentReview?.name ||
              'Review Findings'}
          </h1>


          <p className="review-findings-subtitle">
            Identified policy changes based on the comparison of uploaded policies with external guidelines.
          </p>



          {/* ==================================
              SELECTED DOCUMENTS
          ================================== */}

          <section className="findings-selection-summary">


            {/* GUIDELINES */}

            <div className="findings-summary-column">

              <h3>
                External Guidelines Selected
              </h3>


              {guidelineMode ===
              'automatic' ? (

                <p>
                  • Automatically identify relevant guidelines
                </p>

              ) : selectedGuidelines.length >
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



            {/* DIVIDER */}

            <div className="findings-summary-divider"></div>



            {/* POLICIES */}

            <div className="findings-summary-column">

              <h3>
                Policies Selected
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


          </section>



          {/* ==================================
              FILTER BAR
          ================================== */}

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
                  {filter.name} ({filter.count})
                </button>

              ))}


            </div>



            <div className="findings-sort">

              <span>
                Sort by
              </span>


              <select defaultValue="Priority">

                <option>
                  Priority
                </option>

                <option>
                  Policy
                </option>

                <option>
                  Finding Type
                </option>

              </select>


            </div>


          </section>



          {/* ==================================
              FINDINGS TABLE
          ================================== */}

          <section className="findings-table">


            {/* TABLE HEADER */}

            <div className="findings-table-header">

              <div>
                POLICY
              </div>

              <div>
                GUIDELINES REFERENCED
              </div>

              <div></div>

            </div>



            {/* FINDING ROWS */}

            <div className="findings-scroll-area">


              {visibleFindings.map(
                (finding) => (

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


                      {finding.unread && (

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
              )}


              {visibleFindings.length ===
                0 && (

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