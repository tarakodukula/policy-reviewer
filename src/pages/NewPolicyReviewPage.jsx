import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NewPolicyReviewPage() {
  const navigate = useNavigate()

  // ==========================================
  // REVIEW SESSION INFORMATION
  // ==========================================

  const [reviewName, setReviewName] = useState(() => {
    return localStorage.getItem('newReviewName') || ''
  })

  const [reviewDescription, setReviewDescription] = useState(() => {
    return localStorage.getItem('newReviewDescription') || ''
  })

  // ==========================================
  // SELECTED POLICIES
  // ==========================================

  const [selectedPolicies, setSelectedPolicies] = useState(() => {
    const saved = localStorage.getItem('selectedPolicies')

    if (saved) {
      return JSON.parse(saved)
    }

    return []
  })

  // ==========================================
  // REMOVE POLICY
  // ==========================================

  function removePolicy(id) {
    const updatedPolicies = selectedPolicies.filter(
      (policy) => policy.id !== id
    )

    setSelectedPolicies(updatedPolicies)

    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(updatedPolicies)
    )
  }

  // ==========================================
  // FILE UPLOAD
  // ==========================================

  function handleFileUpload(event) {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const uploadedPolicy = {
      id: Date.now(),
      name: file.name,
      description: 'Uploaded policy document',
      fileName: file.name,
      size: `${(
        file.size /
        1024 /
        1024
      ).toFixed(1)} MB`,
    }

    const updatedPolicies = [
      ...selectedPolicies,
      uploadedPolicy,
    ]

    setSelectedPolicies(updatedPolicies)

    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(updatedPolicies)
    )
  }

  // ==========================================
  // CONTINUE TO GUIDELINES
  // ==========================================

  function continueToGuidelines() {
    if (reviewName.trim() === '') {
      alert('Please enter a review session name.')
      return
    }

    if (reviewDescription.trim() === '') {
      alert('Please enter a short description.')
      return
    }

    if (selectedPolicies.length === 0) {
      alert('Please select at least one policy.')
      return
    }

    // Save session information so it is available
    // on the next page of the workflow.

    localStorage.setItem(
      'newReviewName',
      reviewName.trim()
    )

    localStorage.setItem(
      'newReviewDescription',
      reviewDescription.trim()
    )

    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(selectedPolicies)
    )

    // Clear guidelines from a previous session so
    // a new review starts with a clean selection.

    localStorage.removeItem('selectedGuidelines')
    localStorage.setItem('guidelineMode', 'manual')

    navigate('/reviews/new/select-guidelines')
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
        {/* ======================================
            SIDEBAR
        ====================================== */}

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

        {/* ======================================
            PAGE CONTENT
        ====================================== */}

        <main className="new-review-content">
          <Link
            to="/reviews"
            className="back-link"
          >
            ← Back to Review Sessions
          </Link>

          {/* ==================================
              PAGE HEADER
          ================================== */}

          <div
            style={{
              marginBottom: '26px',
            }}
          >
            <h1>
              Start a Review Session
            </h1>

            <p className="new-review-subtitle">
              Create a review session and choose the policies
              that should be evaluated.
            </p>
          </div>

          {/* ==================================
              WORKFLOW STEPS
          ================================== */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '28px',
              fontSize: '13px',
            }}
          >
            <span
              style={{
                background: '#0078bf',
                color: 'white',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
              }}
            >
              1
            </span>

            <strong>
              Session Details
            </strong>

            <span
              style={{
                color: '#aaa',
              }}
            >
              →
            </span>

            <span
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: '1px solid #bbb',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#777',
                fontWeight: '700',
              }}
            >
              2
            </span>

            <span
              style={{
                color: '#777',
              }}
            >
              Reference Guidelines
            </span>

            <span
              style={{
                color: '#aaa',
              }}
            >
              →
            </span>

            <span
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: '1px solid #bbb',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#777',
                fontWeight: '700',
              }}
            >
              3
            </span>

            <span
              style={{
                color: '#777',
              }}
            >
              Start Review
            </span>
          </div>

          {/* ==================================
              SESSION INFORMATION
          ================================== */}

          <section className="new-review-card">
            <h2>
              Review Session Details
            </h2>

            <p
              style={{
                marginTop: '4px',
                marginBottom: '22px',
                color: '#666',
              }}
            >
              Give this review session a clear name and
              description so it can be identified later.
            </p>

            <label className="new-review-label">
              Review Session Name
            </label>

            <input
              className="review-name-input"
              type="text"
              placeholder="Example: 2026 Cardiac Policy Review"
              value={reviewName}
              onChange={(event) => {
                setReviewName(event.target.value)

                localStorage.setItem(
                  'newReviewName',
                  event.target.value
                )
              }}
            />

            <label
              className="new-review-label"
              style={{
                display: 'block',
                marginTop: '22px',
              }}
            >
              Description
            </label>

            <textarea
              className="review-name-input"
              placeholder="Briefly describe the purpose of this review session..."
              value={reviewDescription}
              onChange={(event) => {
                setReviewDescription(event.target.value)

                localStorage.setItem(
                  'newReviewDescription',
                  event.target.value
                )
              }}
              rows="4"
              style={{
                resize: 'vertical',
                minHeight: '90px',
                fontFamily: 'inherit',
              }}
            />
          </section>

          {/* ==================================
              POLICY SELECTION
          ================================== */}

          <section className="new-review-card policy-document-section">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              <div>
                <h2>
                  Policies in this Review Session
                </h2>

                <p>
                  Select one or more policies from the Policy
                  Database to include in this review.
                </p>
              </div>

              {selectedPolicies.length > 0 && (
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    background: '#e7f3fb',
                    color: '#0078bf',
                    padding: '6px 10px',
                    borderRadius: '14px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {selectedPolicies.length}{' '}
                  {selectedPolicies.length === 1
                    ? 'policy selected'
                    : 'policies selected'}
                </span>
              )}
            </div>

            {/* ==================================
                SELECT FROM POLICY DATABASE
            ================================== */}

            <div
              style={{
                marginTop: '22px',
                marginBottom: '22px',
              }}
            >
              <button
                type="button"
                className="outline-action-button"
                onClick={() =>
                  navigate(
                    '/reviews/new/select-policies'
                  )
                }
              >
                Select from Policy Database
              </button>
            </div>

            {/* ==================================
                SELECTED POLICIES
            ================================== */}

            {selectedPolicies.length > 0 ? (
              <div className="selected-policies-list">
                {selectedPolicies.map((policy) => (
                  <div
                    className="selected-policy-file"
                    key={policy.id}
                  >
                    <div>
                      <strong>
                        {policy.name ||
                          policy.fileName}
                      </strong>

                      <small>
                        {policy.description ||
                          'Policy selected for review'}
                      </small>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removePolicy(policy.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  border: '1px dashed #bbb',
                  borderRadius: '6px',
                  padding: '24px',
                  textAlign: 'center',
                  color: '#777',
                  marginBottom: '22px',
                }}
              >
                No policies have been selected yet.
              </div>
            )}

            {/* ==================================
                OPTIONAL UPLOAD
            ================================== */}

            <div
              style={{
                marginTop: '22px',
                paddingTop: '20px',
                borderTop: '1px solid #e2e2e2',
              }}
            >
              <p
                style={{
                  marginBottom: '12px',
                  fontSize: '13px',
                  color: '#666',
                }}
              >
                Or upload a policy document directly.
              </p>

              <label className="upload-area">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleFileUpload}
                />

                <div className="upload-icon">
                  ⇧
                </div>

                <div>
                  <strong>
                    Upload policy document
                  </strong>

                  <span>
                    {' '}
                    PDF or DOCX
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* ==================================
              BOTTOM ACTIONS
          ================================== */}

          <div className="new-review-actions">
            <button
              type="button"
              className="cancel-review-button"
              onClick={() =>
                navigate('/reviews')
              }
            >
              Cancel
            </button>

            <button
              type="button"
              className="start-review-button"
              onClick={continueToGuidelines}
            >
              Continue to Reference Guidelines →
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default NewPolicyReviewPage