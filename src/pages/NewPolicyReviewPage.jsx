import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NewPolicyReviewPage() {
  const navigate = useNavigate()


  // ==========================================
  // REVIEW SESSION NAME
  // ==========================================

  const [reviewName, setReviewName] = useState('')


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


  // Remove a selected policy
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
  // GUIDELINE MODE
  // ==========================================

  const [guidelineMode, setGuidelineMode] = useState(() => {
    return (
      localStorage.getItem('guidelineMode') ||
      'automatic'
    )
  })


  // ==========================================
  // SELECTED GUIDELINES
  // ==========================================

  const [selectedGuidelines, setSelectedGuidelines] = useState(() => {
    const saved =
      localStorage.getItem('selectedGuidelines')

    if (saved) {
      return JSON.parse(saved)
    }

    return []
  })


  // Remove a selected guideline
  function removeGuideline(id) {
    const updatedGuidelines =
      selectedGuidelines.filter(
        (guideline) =>
          guideline.id !== id
      )

    setSelectedGuidelines(
      updatedGuidelines
    )

    localStorage.setItem(
      'selectedGuidelines',
      JSON.stringify(updatedGuidelines)
    )
  }


  // ==========================================
  // GUIDELINE MODE FUNCTIONS
  // ==========================================

  function chooseAutomaticGuidelines() {
    setGuidelineMode('automatic')

    localStorage.setItem(
      'guidelineMode',
      'automatic'
    )
  }


  function chooseManualGuidelines() {
    setGuidelineMode('manual')

    localStorage.setItem(
      'guidelineMode',
      'manual'
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

    setSelectedPolicies(
      updatedPolicies
    )

    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(updatedPolicies)
    )
  }

  function startPolicyReview() {

  // Make sure a review name was entered
  if (reviewName.trim() === '') {
    alert('Please enter a review session name.')
    return
  }


  // Make sure at least one policy was selected
  if (selectedPolicies.length === 0) {
    alert('Please select at least one policy.')
    return
  }


  // If manual guidelines are selected,
  // make sure at least one guideline was chosen
  if (
    guidelineMode === 'manual' &&
    selectedGuidelines.length === 0
  ) {
    alert('Please select at least one guideline.')
    return
  }


  // Get today's date
  const today =
    new Date().toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )


  // First selected policy
  const firstPolicy =
    selectedPolicies[0]


  // Decide what guideline should display
  let guidelineName =
    'Automatically Selected Guidelines'


  if (
    guidelineMode === 'manual' &&
    selectedGuidelines.length > 0
  ) {
    guidelineName =
      selectedGuidelines[0].name
  }


  // Create the review
  const newReview = {

    id: Date.now(),

    name: reviewName.trim(),

    description:
      `Policy review for ${firstPolicy.name}.`,

    document:
      firstPolicy.fileName ||
      firstPolicy.name,

    version: 'v1.0',

    guideline:
      guidelineName,

    guidelineVersion: 'v1.0',

    date: today,

    age: 'Just now',

    status: 'In Review',

    findings: 0,

    policies:
      selectedPolicies,

    guidelines:
      selectedGuidelines,

    guidelineMode:
      guidelineMode,
  }


  // Get existing reviews
  const savedReviews =
    JSON.parse(
      localStorage.getItem(
        'createdReviews'
      )
    ) || []


  // Add this review
  const updatedReviews = [
    newReview,
    ...savedReviews,
  ]


  // Save reviews
  localStorage.setItem(
    'createdReviews',
    JSON.stringify(updatedReviews)
  )


  // Remember the current review
  localStorage.setItem(
    'currentReview',
    JSON.stringify(newReview)
  )


  // Go to findings
  navigate('/reviews/findings')
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
          MAIN PAGE
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
            PAGE CONTENT
        ================================== */}

        <main className="new-review-content">


          {/* BACK BUTTON */}

          <Link
            to="/reviews"
            className="back-link"
          >
            ← Back to Policy Reviews
          </Link>



          <h1>
            New Policy Review
          </h1>


          <p className="new-review-subtitle">
            Upload a policy document and select the guidelines to use for this review.
          </p>



          {/* ==================================
              REVIEW INFORMATION
          ================================== */}

          <section className="new-review-card">

            <h2>
              Review Information
            </h2>


            <label className="new-review-label">
              Review Session Name
            </label>


            <input
              className="review-name-input"
              type="text"
              placeholder="Enter a name for this review session"
              value={reviewName}
              onChange={(event) =>
                setReviewName(
                  event.target.value
                )
              }
            />

          </section>



          {/* ==================================
              POLICY DOCUMENTS
          ================================== */}

          <section className="new-review-card policy-document-section">


            <h2>
              Policy Document(s)
            </h2>


            <p>
              Upload or select the policy documents you want to review.
            </p>



            {/* UPLOAD BOX */}

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
                  Click to upload
                </strong>

                <span>
                  {' '}
                  or drag and drop a PDF or DOCX file here,
                  or browse your computer.
                </span>

              </div>


            </label>



            {/* ==================================
                SELECTED POLICIES
            ================================== */}

            {selectedPolicies.length > 0 && (

              <div className="selected-policies-list">

                {selectedPolicies.map(
                  (policy) => (

                    <div
                      className="selected-policy-file"
                      key={policy.id}
                    >

                      <div>

                        <strong>
                          {policy.fileName ||
                            policy.name}
                        </strong>


                        <small>

                          {policy.size
                            ? `PDF • ${policy.size}`
                            : policy.description}

                        </small>

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          removePolicy(
                            policy.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  )
                )}

              </div>

            )}



            {/* SELECT POLICIES BUTTON */}

            <div className="select-button-row">

              <button
                type="button"
                className="outline-action-button"
                onClick={() =>
                  navigate(
                    '/reviews/new/select-policies'
                  )
                }
              >
                Select Policies
              </button>

            </div>


          </section>



          {/* ==================================
              EXTERNAL GUIDELINES
          ================================== */}

          <section className="new-review-card guidelines-settings">


            <h2>
              External Guidelines Settings
            </h2>


            <p>
              Select the external guidelines that should be used to evaluate this policy.
            </p>



            {/* AUTOMATIC OPTION */}

            <label className="guideline-option">


              <input
                type="radio"
                name="guidelineMode"
                checked={
                  guidelineMode ===
                  'automatic'
                }
                onChange={
                  chooseAutomaticGuidelines
                }
              />


              <div>

                <strong>
                  Automatically identify relevant guidelines
                </strong>


                <small>
                  The system will identify relevant external guidelines based on the policy.
                </small>

              </div>


            </label>



            {/* MANUAL OPTION */}

            <div className="manual-guideline-row">


              <label className="guideline-option">


                <input
                  type="radio"
                  name="guidelineMode"
                  checked={
                    guidelineMode ===
                    'manual'
                  }
                  onChange={
                    chooseManualGuidelines
                  }
                />


                <div>

                  <strong>
                    Select guidelines manually
                  </strong>


                  <small>
                    Choose the specific guidelines to use for this review.
                  </small>

                </div>


              </label>



              <button
                type="button"
                className="outline-action-button"
                onClick={() => {

                  chooseManualGuidelines()

                  navigate(
                    '/reviews/new/select-guidelines'
                  )

                }}
              >
                Select Guidelines
              </button>


            </div>



            {/* ==================================
                SELECTED GUIDELINES
            ================================== */}

            {guidelineMode === 'manual' &&
              selectedGuidelines.length > 0 && (

                <div className="selected-guidelines-list">


                  {selectedGuidelines.map(
                    (guideline) => (

                      <div
                        className="selected-guideline-item"
                        key={guideline.id}
                      >

                        <div>

                          <strong>
                            {guideline.name}
                          </strong>


                          <small>
                            {guideline.description}
                          </small>

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            removeGuideline(
                              guideline.id
                            )
                          }
                        >
                          Remove
                        </button>


                      </div>

                    )
                  )}


                </div>

              )}


          </section>



          {/* ==================================
              BOTTOM BUTTONS
          ================================== */}

          <div className="new-review-actions">


            {/* CANCEL */}

            <button
              type="button"
              className="cancel-review-button"
              onClick={() =>
                navigate('/reviews')
              }
            >
              Cancel
            </button>



            {/* START REVIEW */}

            <button
              type="button"
              className="start-review-button"
              onClick={startPolicyReview}
            >
              Start Policy Review
            </button>


          </div>


        </main>


      </div>


    </div>
  )
}

export default NewPolicyReviewPage