import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PolicySelectionPage() {
  const navigate = useNavigate()

  // ==========================================
  // ORIGINAL POLICIES
  // ==========================================

  const originalPolicies = [
    {
      id: 1,
      name: 'Cardiac Coverage Policy',
      description:
        'Coverage criteria for cardiac procedures, diagnostic testing, and treatment.',
      date: 'Sep 23, 2026',
      age: '2 days ago',
      updated: 'Sep 23, 2026',
      updatedAge: '2 days ago',
      status: 'Active',
      version: 'v4.0',
    },
    {
      id: 2,
      name: 'Diabetes Treatment Policy',
      description:
        'Coverage criteria for diabetes management, medications, and treatment.',
      date: 'Sep 18, 2026',
      age: '6 days ago',
      updated: 'Sep 18, 2026',
      updatedAge: '6 days ago',
      status: 'Active',
      version: 'v3.0',
    },
    {
      id: 3,
      name: 'Oncology Coverage Policy',
      description:
        'Coverage criteria for oncology services, testing, and treatments.',
      date: 'Sep 10, 2026',
      age: '14 days ago',
      updated: 'Sep 10, 2026',
      updatedAge: '14 days ago',
      status: 'Active',
      version: 'v2.0',
    },
    {
      id: 4,
      name: 'Orthopedic Surgery Policy',
      description:
        'Coverage criteria for orthopedic procedures and rehabilitation.',
      date: 'Sep 5, 2026',
      age: '19 days ago',
      updated: 'Sep 5, 2026',
      updatedAge: '19 days ago',
      status: 'Active',
      version: 'v5.0',
    },
    {
      id: 5,
      name: 'Mental Health Coverage Policy',
      description:
        'Coverage criteria for mental health services and treatment.',
      date: 'Aug 28, 2026',
      age: '27 days ago',
      updated: 'Aug 28, 2026',
      updatedAge: '27 days ago',
      status: 'Active',
      version: 'v3.0',
    },
  ]

  // ==========================================
  // GET NEWLY UPLOADED POLICIES
  // ==========================================

  const savedPolicies =
    JSON.parse(
      localStorage.getItem('addedPolicies')
    ) || []

  const addedPolicies = savedPolicies.map((policy) => ({
    ...policy,

    date:
      policy.date ||
      policy.created ||
      'Recently',

    age:
      policy.age ||
      policy.createdAge ||
      'Just now',

    updated:
      policy.updated ||
      policy.date ||
      policy.created ||
      'Recently',

    updatedAge:
      policy.updatedAge ||
      'Just now',

    status:
      policy.status ||
      'Active',

    version:
      policy.version ||
      'v1.0',
  }))

  // ==========================================
  // GET DELETED POLICY IDS
  // ==========================================

  const deletedPolicyIds =
    JSON.parse(
      localStorage.getItem('deletedPolicyIds')
    ) || []

  // ==========================================
  // COMBINE ALL POLICIES
  // ==========================================

  const policies = [
    ...addedPolicies,
    ...originalPolicies,
  ].filter(
    (policy) =>
      !deletedPolicyIds.includes(policy.id)
  )

  // ==========================================
  // PREVIOUSLY SELECTED POLICIES
  // ==========================================

  const previouslySelected =
    JSON.parse(
      localStorage.getItem('selectedPolicies')
    ) || []

  const startingSelections =
    previouslySelected.map(
      (policy) => policy.id
    )

  const [selectedPolicies, setSelectedPolicies] =
    useState(startingSelections)

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState('')

  const visiblePolicies = policies.filter((policy) => {
    const searchText = search.toLowerCase()

    return (
      policy.name
        .toLowerCase()
        .includes(searchText) ||
      (policy.description || '')
        .toLowerCase()
        .includes(searchText)
    )
  })

  // ==========================================
  // CHECK / UNCHECK POLICY
  // ==========================================

  function togglePolicy(id) {
    if (selectedPolicies.includes(id)) {
      setSelectedPolicies(
        selectedPolicies.filter(
          (policyId) => policyId !== id
        )
      )
    } else {
      setSelectedPolicies([
        ...selectedPolicies,
        id,
      ])
    }
  }

  // ==========================================
  // CONFIRM SELECTIONS
  // ==========================================

  function confirmSelections() {
    if (selectedPolicies.length === 0) {
      alert(
        'Please select at least one policy for this review session.'
      )
      return
    }

    const selected = policies.filter(
      (policy) =>
        selectedPolicies.includes(policy.id)
    )

    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(selected)
    )

    navigate('/reviews/new')
  }

  // ==========================================
  // CANCEL
  // ==========================================

  function cancelSelection() {
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
              ← Back to Review Sessions
            </span>

            <h1>
              Start a Review Session
            </h1>

            <p>
              Create a review session and choose the policies
              that should be evaluated.
            </p>

            <div className="background-card">
              <h2>
                Review Session Details
              </h2>
            </div>

            <div className="background-card">
              <h2>
                Policies in this Review Session
              </h2>
            </div>
          </main>
        </div>
      </div>

      {/* ======================================
          DARK / BLUR OVERLAY
      ====================================== */}

      <div
        className="selection-overlay"
        onClick={cancelSelection}
      ></div>

      {/* ======================================
          POLICY SELECTION MODAL
      ====================================== */}

      <div className="policy-selection-modal">
        {/* ==================================
            MODAL HEADER
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
            <h1
              style={{
                marginBottom: '7px',
              }}
            >
              Select Policies
            </h1>

            <p
              className="selection-subtitle"
              style={{
                margin: 0,
              }}
            >
              Choose the policies to include in this review session.
            </p>
          </div>

          <button
            type="button"
            onClick={cancelSelection}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '22px',
              cursor: 'pointer',
              color: '#666',
            }}
            aria-label="Close policy selection"
          >
            ×
          </button>
        </div>

        {/* ==================================
            SEARCH + SELECTION COUNT
        ================================== */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            margin: '22px 0 18px',
          }}
        >
          <input
            type="text"
            placeholder="⌕   Search Policy Database..."
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
                selectedPolicies.length > 0
                  ? '#0078bf'
                  : '#777',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedPolicies.length}{' '}
            {selectedPolicies.length === 1
              ? 'policy selected'
              : 'policies selected'}
          </span>
        </div>

        {/* ==================================
            POLICY TABLE
        ================================== */}

        <div className="selection-table">
          <div className="selection-table-header">
            <div></div>

            <div>
              POLICY NAME
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

          {visiblePolicies.map((policy) => (
            <div
              className="selection-table-row"
              key={policy.id}
              style={{
                cursor: 'pointer',
              }}
              onClick={() =>
                togglePolicy(policy.id)
              }
            >
              {/* CHECKBOX */}

              <div className="selection-checkbox-cell">
                <input
                  type="checkbox"
                  checked={
                    selectedPolicies.includes(
                      policy.id
                    )
                  }
                  onChange={() =>
                    togglePolicy(policy.id)
                  }
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                />
              </div>

              {/* POLICY */}

              <div className="selection-policy-name">
                <strong>
                  {policy.name}
                </strong>

                <p>
                  {policy.description}
                </p>
              </div>

              {/* VERSION */}

              <div className="selection-date">
                <span>
                  {policy.version || 'v1.0'}
                </span>

                <small>
                  Current version
                </small>
              </div>

              {/* LAST UPDATED */}

              <div className="selection-date">
                <span>
                  {policy.updated}
                </span>

                <small>
                  {policy.updatedAge}
                </small>
              </div>

              {/* STATUS */}

              <div>
                <span
                  className="status completed"
                >
                  {policy.status || 'Active'}
                </span>
              </div>
            </div>
          ))}

          {visiblePolicies.length === 0 && (
            <div
              style={{
                padding: '30px',
                textAlign: 'center',
                color: '#777',
              }}
            >
              No policies match your search.
            </div>
          )}
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
            onClick={cancelSelection}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-selection-button"
            onClick={confirmSelections}
          >
            Add {selectedPolicies.length}{' '}
            {selectedPolicies.length === 1
              ? 'Policy'
              : 'Policies'} to Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default PolicySelectionPage