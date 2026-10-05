import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function GuidelineSelectionPage() {
  const navigate = useNavigate()

  // ==========================================
  // REVIEW SESSION INFORMATION
  // ==========================================

  const reviewName =
    localStorage.getItem('newReviewName') ||
    'New Review Session'

  const selectedPolicies =
    JSON.parse(
      localStorage.getItem('selectedPolicies')
    ) || []

  // ==========================================
  // ORIGINAL GUIDELINES
  // ==========================================

  const originalGuidelines = [
    {
      id: 1,
      name: 'Cardiac Coverage Guideline',
      description:
        'Clinical guidance for cardiac procedures, diagnostic testing, and treatment.',
      source: 'Clinical Reference',
      date: 'Sep 23, 2026',
      age: '2 days ago',
      updated: 'Sep 23, 2026',
      updatedAge: '2 days ago',
      status: 'Active',
      version: '2026',
    },
    {
      id: 2,
      name: 'Diabetes Treatment Guideline',
      description:
        'Clinical guidance for diabetes management, medications, and treatment.',
      source: 'Clinical Reference',
      date: 'Sep 18, 2026',
      age: '6 days ago',
      updated: 'Sep 18, 2026',
      updatedAge: '6 days ago',
      status: 'Active',
      version: '2026',
    },
    {
      id: 3,
      name: 'Oncology Coverage Guideline',
      description:
        'Clinical guidance for oncology services, testing, and treatments.',
      source: 'Clinical Reference',
      date: 'Sep 10, 2026',
      age: '14 days ago',
      updated: 'Sep 10, 2026',
      updatedAge: '14 days ago',
      status: 'Active',
      version: '2026',
    },
    {
      id: 4,
      name: 'Orthopedic Surgery Guideline',
      description:
        'Clinical guidance for orthopedic procedures and rehabilitation.',
      source: 'Clinical Reference',
      date: 'Sep 5, 2026',
      age: '19 days ago',
      updated: 'Sep 5, 2026',
      updatedAge: '19 days ago',
      status: 'Active',
      version: '2026',
    },
    {
      id: 5,
      name: 'Mental Health Guideline',
      description:
        'Clinical guidance for mental health services and treatment.',
      source: 'Clinical Reference',
      date: 'Aug 28, 2026',
      age: '27 days ago',
      updated: 'Aug 28, 2026',
      updatedAge: '27 days ago',
      status: 'Active',
      version: '2026',
    },
  ]

  // ==========================================
  // GET NEWLY UPLOADED GUIDELINES
  // ==========================================

  const savedGuidelines =
    JSON.parse(
      localStorage.getItem('addedGuidelines')
    ) || []

  const addedGuidelines = savedGuidelines.map(
    (guideline) => ({
      ...guideline,

      date:
        guideline.date ||
        guideline.created ||
        'Recently',

      age:
        guideline.age ||
        guideline.createdAge ||
        'Just now',

      updated:
        guideline.updated ||
        guideline.date ||
        guideline.created ||
        'Recently',

      updatedAge:
        guideline.updatedAge ||
        'Just now',

      status:
        guideline.status ||
        'Active',

      version:
        guideline.version ||
        'Current',

      source:
        guideline.source ||
        'Uploaded Guideline',
    })
  )

  // ==========================================
  // GET DELETED GUIDELINE IDS
  // ==========================================

  const deletedGuidelineIds =
    JSON.parse(
      localStorage.getItem('deletedGuidelineIds')
    ) || []

  // ==========================================
  // COMBINE ALL GUIDELINES
  // ==========================================

  const guidelines = [
    ...addedGuidelines,
    ...originalGuidelines,
  ].filter(
    (guideline) =>
      !deletedGuidelineIds.includes(
        guideline.id
      )
  )

  // ==========================================
  // PREVIOUSLY SELECTED GUIDELINES
  // ==========================================

  const previouslySelected =
    JSON.parse(
      localStorage.getItem('selectedGuidelines')
    ) || []

  const startingSelections =
    previouslySelected
      .map((guideline) => guideline.id)
      .filter((id) =>
        guidelines.some(
          (guideline) =>
            guideline.id === id
        )
      )

  const [
    selectedGuidelines,
    setSelectedGuidelines,
  ] = useState(startingSelections)

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState('')

  const visibleGuidelines = guidelines.filter(
    (guideline) => {
      const searchText = search.toLowerCase()

      return (
        guideline.name
          .toLowerCase()
          .includes(searchText) ||
        (guideline.description || '')
          .toLowerCase()
          .includes(searchText)
      )
    }
  )

  // ==========================================
  // CHECK / UNCHECK GUIDELINE
  // ==========================================

  function toggleGuideline(id) {
    if (selectedGuidelines.includes(id)) {
      setSelectedGuidelines(
        selectedGuidelines.filter(
          (guidelineId) =>
            guidelineId !== id
        )
      )
    } else {
      setSelectedGuidelines([
        ...selectedGuidelines,
        id,
      ])
    }
  }

  // ==========================================
  // START REVIEW
  // ==========================================

  function startReview() {
    if (selectedGuidelines.length === 0) {
      alert(
        'Please select at least one reference guideline before starting the review.'
      )
      return
    }

    if (selectedPolicies.length === 0) {
      alert(
        'This review session does not have any policies selected.'
      )
      navigate('/reviews/new')
      return
    }

    const selected = guidelines.filter(
      (guideline) =>
        selectedGuidelines.includes(
          guideline.id
        )
    )

    // Save selected reference guidelines.

    localStorage.setItem(
      'selectedGuidelines',
      JSON.stringify(selected)
    )

    localStorage.setItem(
      'guidelineMode',
      'manual'
    )

    // ========================================
    // CREATE REVIEW SESSION
    // ========================================

    const reviewDescription =
      localStorage.getItem(
        'newReviewDescription'
      ) || ''

    const newReview = {
      id: Date.now(),

      name: reviewName,

      description:
        reviewDescription,

      policies:
        selectedPolicies.length,

      selectedPolicies:
        selectedPolicies,

      guidelines:
        selected.length,

      selectedGuidelines:
        selected,

      guideline:
        selected.length === 1
          ? selected[0].name
          : `${selected.length} reference guidelines`,

      date:
        new Date().toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }
        ),

      age:
        'Just now',

      status:
        'In Review',

      findings:
        3,

      reviewer:
        'Sarah Chen',
    }

    // ========================================
    // SAVE REVIEW SESSION
    // ========================================

    const existingReviews =
      JSON.parse(
        localStorage.getItem(
          'createdReviews'
        )
      ) || []

    const updatedReviews = [
      newReview,
      ...existingReviews,
    ]

    localStorage.setItem(
      'createdReviews',
      JSON.stringify(updatedReviews)
    )

    localStorage.setItem(
      'currentReview',
      JSON.stringify(newReview)
    )

    // ========================================
    // SIMULATE AUTOMATED REVIEW
    // ========================================

    navigate('/reviews/findings')
  }

  // ==========================================
  // GO BACK
  // ==========================================

  function goBack() {
    // Save current choices before returning.

    const selected = guidelines.filter(
      (guideline) =>
        selectedGuidelines.includes(
          guideline.id
        )
    )

    localStorage.setItem(
      'selectedGuidelines',
      JSON.stringify(selected)
    )

    navigate('/reviews/new')
  }

  return (
    <div className="policy-selection-page">
      {/* ======================================
          BACKGROUND PAGE
      ====================================== */}

      <div className="selection-background">
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
          <aside className="sidebar">
            <div className="nav-item">
              <span className="nav-icon">
                ▦
              </span>

              Dashboard
            </div>

            <div className="nav-item active">
              <span className="nav-icon">
                ▣
              </span>

              Review Sessions
            </div>

            <div className="nav-item">
              <span className="nav-icon">
                ⊗
              </span>

              Policy Database
            </div>

            <div className="nav-item">
              <span className="nav-icon">
                ⊗
              </span>

              Guideline Database
            </div>
          </aside>

          <main className="selection-background-content">
            <span>
              ← Back to Review Session
            </span>

            <h1>
              {reviewName}
            </h1>

            <p>
              Configure the reference guidelines
              for this review session.
            </p>

            <div className="background-card">
              <h2>
                Session Details
              </h2>
            </div>

            <div className="background-card">
              <h2>
                Policies
              </h2>

              <p>
                {selectedPolicies.length}{' '}
                {selectedPolicies.length === 1
                  ? 'policy selected'
                  : 'policies selected'}
              </p>
            </div>

            <div className="background-card">
              <h2>
                Reference Guidelines
              </h2>
            </div>
          </main>
        </div>
      </div>

      {/* ======================================
          OVERLAY
      ====================================== */}

      <div
        className="selection-overlay"
        onClick={goBack}
      ></div>

      {/* ======================================
          GUIDELINE SELECTION WINDOW
      ====================================== */}

      <div className="policy-selection-modal">
        {/* ==================================
            HEADER
        ================================== */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            marginBottom: '8px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#0078bf',
                marginBottom: '7px',
              }}
            >
              STEP 2 OF 3
            </div>

            <h1
              style={{
                marginBottom: '7px',
              }}
            >
              Select Reference Guidelines
            </h1>

            <p
              className="selection-subtitle"
              style={{
                margin: 0,
              }}
            >
              Choose the external guidelines that
              should be used to evaluate the
              selected policies.
            </p>
          </div>

          <button
            type="button"
            onClick={goBack}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '22px',
              cursor: 'pointer',
              color: '#666',
            }}
            aria-label="Close guideline selection"
          >
            ×
          </button>
        </div>

        {/* ==================================
            SESSION SUMMARY
        ================================== */}

        <div
          style={{
            display: 'flex',
            gap: '24px',
            padding: '14px 16px',
            margin: '20px 0',
            background: '#f5f7f8',
            border: '1px solid #e1e4e6',
            borderRadius: '5px',
            fontSize: '13px',
          }}
        >
          <div>
            <span
              style={{
                color: '#777',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              REVIEW SESSION
            </span>

            <strong>
              {reviewName}
            </strong>
          </div>

          <div>
            <span
              style={{
                color: '#777',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              POLICIES
            </span>

            <strong>
              {selectedPolicies.length}{' '}
              {selectedPolicies.length === 1
                ? 'selected'
                : 'selected'}
            </strong>
          </div>
        </div>

        {/* ==================================
            SEARCH + COUNT
        ================================== */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '18px',
          }}
        >
          <input
            type="text"
            placeholder="⌕   Search Guideline Database..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              flex: 1,
              minWidth: 0,
              padding: '10px 12px',
              border: '1px solid #cfcfcf',
              borderRadius: '4px',
              fontFamily: 'inherit',
            }}
          />

          <span
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color:
                selectedGuidelines.length > 0
                  ? '#0078bf'
                  : '#777',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedGuidelines.length}{' '}
            {selectedGuidelines.length === 1
              ? 'guideline selected'
              : 'guidelines selected'}
          </span>
        </div>

        {/* ==================================
            GUIDELINE TABLE
        ================================== */}

        <div className="selection-table">
          <div className="selection-table-header">
            <div></div>

            <div>
              GUIDELINE NAME
            </div>

            <div>
              VERSION
            </div>

            <div>
              LAST UPDATED
            </div>

            <div>
              STATUS
            </div>
          </div>

          {visibleGuidelines.map(
            (guideline) => (
              <div
                className="selection-table-row"
                key={guideline.id}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() =>
                  toggleGuideline(
                    guideline.id
                  )
                }
              >
                {/* CHECKBOX */}

                <div className="selection-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={
                      selectedGuidelines.includes(
                        guideline.id
                      )
                    }
                    onChange={() =>
                      toggleGuideline(
                        guideline.id
                      )
                    }
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  />
                </div>

                {/* GUIDELINE */}

                <div className="selection-policy-name">
                  <strong>
                    {guideline.name}
                  </strong>

                  <p>
                    {guideline.description}
                  </p>
                </div>

                {/* VERSION */}

                <div className="selection-date">
                  <span>
                    {guideline.version ||
                      'Current'}
                  </span>

                  <small>
                    {guideline.source ||
                      'Reference'}
                  </small>
                </div>

                {/* LAST UPDATED */}

                <div className="selection-date">
                  <span>
                    {guideline.updated}
                  </span>

                  <small>
                    {guideline.updatedAge}
                  </small>
                </div>

                {/* STATUS */}

                <div>
                  <span className="status completed">
                    {guideline.status ||
                      'Active'}
                  </span>
                </div>
              </div>
            )
          )}

          {visibleGuidelines.length === 0 && (
            <div
              style={{
                padding: '30px',
                textAlign: 'center',
                color: '#777',
              }}
            >
              No guidelines match your search.
            </div>
          )}
        </div>

        {/* ==================================
            EXPLANATION
        ================================== */}

        <div
          style={{
            marginTop: '18px',
            padding: '12px 14px',
            background: '#f8f8f8',
            borderLeft: '3px solid #0078bf',
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#555',
          }}
        >
          <strong>
            How reference guidelines are used:
          </strong>{' '}
          The selected guidelines will be used as
          reference material when the system screens
          the policies in this review session for
          potential changes.
        </div>

        {/* ==================================
            BOTTOM ACTIONS
        ================================== */}

        <div
          className="selection-confirm-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            className="cancel-review-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <button
            type="button"
            className="confirm-selection-button"
            onClick={startReview}
          >
            Start Review →
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuidelineSelectionPage