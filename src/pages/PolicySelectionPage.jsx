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
        'Policy review for cardiac procedures and treatments.',
      date: 'Sep 23, 2026',
      age: '2 days ago',
      updated: 'Sep 23, 2026',
      updatedAge: '2 days ago',
      status: 'In Review',
    },

    {
      id: 2,
      name: 'Diabetes Treatment Policy',
      description:
        'Policy review for diabetes management and treatment.',
      date: 'Sep 18, 2026',
      age: '6 days ago',
      updated: 'Sep 18, 2026',
      updatedAge: '6 days ago',
      status: 'Completed',
    },

    {
      id: 3,
      name: 'Oncology Coverage Policy',
      description:
        'Policy review for oncology services and treatments.',
      date: 'Sep 10, 2026',
      age: '14 days ago',
      updated: 'Sep 10, 2026',
      updatedAge: '14 days ago',
      status: 'Completed',
    },

    {
      id: 4,
      name: 'Orthopedic Surgery Policy',
      description:
        'Policy review for orthopedic procedures and rehab.',
      date: 'Sep 5, 2026',
      age: '19 days ago',
      updated: 'Sep 5, 2026',
      updatedAge: '19 days ago',
      status: 'In Review',
    },

    {
      id: 5,
      name: 'Mental Health Coverage Policy',
      description:
        'Policy review for mental health services and treatments.',
      date: 'Aug 28, 2026',
      age: '27 days ago',
      updated: 'Aug 28, 2026',
      updatedAge: '27 days ago',
      status: 'Completed',
    },
  ]


  // ==========================================
  // GET NEWLY UPLOADED POLICIES
  // ==========================================

  const savedPolicies =
    JSON.parse(
      localStorage.getItem('addedPolicies')
    ) || []


  // Convert uploaded policy properties so they
  // match the properties used by this page
  const addedPolicies = savedPolicies.map((policy) => ({
    ...policy,

    date:
      policy.date ||
      policy.created,

    age:
      policy.age ||
      policy.createdAge ||
      'Just now',

    updated:
      policy.updated ||
      policy.date ||
      policy.created,

    updatedAge:
      policy.updatedAge ||
      'Just now',
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
  // SELECTED POLICIES
  // ==========================================

  // Start with policies 1 and 2 checked,
  // as long as they have not been deleted.
  const startingSelections = [1, 2].filter((id) =>
    policies.some((policy) => policy.id === id)
  )

  const [selectedPolicies, setSelectedPolicies] =
    useState(startingSelections)


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

    const selected = policies.filter(
      (policy) =>
        selectedPolicies.includes(policy.id)
    )


    // Save selected policies in the browser
    localStorage.setItem(
      'selectedPolicies',
      JSON.stringify(selected)
    )


    // Return to New Policy Review
    navigate('/reviews/new')
  }


  return (
    <div className="policy-selection-page">


      {/* ======================================
          FAKE BLURRED PAGE UNDERNEATH
      ====================================== */}

      <div className="selection-background">


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



        <div className="app-body">


          {/* SIDEBAR */}

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

              Policy Reviews

            </div>


            <div className="nav-item">

              <span className="nav-icon">
                ⊗
              </span>

              Guidelines

            </div>


            <div className="nav-item">

              <span className="nav-icon">
                ⊗
              </span>

              Policies

            </div>


          </aside>



          {/* BACKGROUND CONTENT */}

          <main className="selection-background-content">

            <span>
              ← Back to Policy Reviews
            </span>


            <h1>
              New Policy Review
            </h1>


            <p>
              Upload a policy document and select the
              guidelines to use for this review.
            </p>


            <div className="background-card">

              <h2>
                Review Information
              </h2>

            </div>


            <div className="background-card">

              <h2>
                Policy Document(s)
              </h2>

            </div>


            <div className="background-card">

              <h2>
                External Guidelines Settings
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
        onClick={() =>
          navigate('/reviews/new')
        }
      ></div>



      {/* ======================================
          POLICY SELECTION MODAL
      ====================================== */}

      <div className="policy-selection-modal">


        <h1>
          Policy Selection
        </h1>


        <p className="selection-subtitle">
          Select all policies to be used in your review
        </p>



        {/* TABLE */}

        <div className="selection-table">


          {/* TABLE HEADER */}

          <div className="selection-table-header">

            <div></div>

            <div>
              POLICY NAME
            </div>

            <div>
              DATE CREATED
            </div>

            <div>
              LAST UPDATED
            </div>

            <div>
              STATUS
            </div>

          </div>



          {/* POLICY ROWS */}

          {policies.map((policy) => (

            <div
              className="selection-table-row"
              key={policy.id}
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
                />

              </div>



              {/* POLICY NAME */}

              <div className="selection-policy-name">

                <strong>
                  {policy.name}
                </strong>

                <p>
                  {policy.description}
                </p>

              </div>



              {/* DATE CREATED */}

              <div className="selection-date">

                <span>
                  {policy.date}
                </span>

                <small>
                  {policy.age}
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
                  className={
                    policy.status === 'Completed'
                      ? 'status completed'
                      : 'status in-review'
                  }
                >
                  {policy.status}
                </span>

              </div>


            </div>

          ))}


        </div>



        {/* ==================================
            CONFIRM BUTTON
        ================================== */}

        <div className="selection-confirm-row">

          <button
            type="button"
            className="confirm-selection-button"
            onClick={confirmSelections}
          >
            Confirm Selections
          </button>

        </div>


      </div>


    </div>
  )
}

export default PolicySelectionPage