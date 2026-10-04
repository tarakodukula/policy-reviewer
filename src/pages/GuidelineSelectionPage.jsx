import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function GuidelineSelectionPage() {
  const navigate = useNavigate()


  // ==========================================
  // ORIGINAL GUIDELINES
  // ==========================================

  const originalGuidelines = [
    {
      id: 1,
      name: 'Cardiac Coverage Guideline',
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
      name: 'Diabetes Treatment Guideline',
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
      name: 'Oncology Coverage Guideline',
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
      name: 'Orthopedic Surgery Guideline',
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
      name: 'Mental Health Guideline',
      description:
        'Policy review for mental health services and treatment.',
      date: 'Aug 28, 2026',
      age: '27 days ago',
      updated: 'Aug 28, 2026',
      updatedAge: '27 days ago',
      status: 'Completed',
    },
  ]


  // ==========================================
  // GET NEWLY UPLOADED GUIDELINES
  // ==========================================

  const savedGuidelines =
    JSON.parse(
      localStorage.getItem('addedGuidelines')
    ) || []


  // Make uploaded guidelines match the format
  // used by this selection page
  const addedGuidelines = savedGuidelines.map(
    (guideline) => ({
      ...guideline,

      date:
        guideline.date ||
        guideline.created,

      age:
        guideline.age ||
        guideline.createdAge ||
        'Just now',

      updated:
        guideline.updated ||
        guideline.date ||
        guideline.created,

      updatedAge:
        guideline.updatedAge ||
        'Just now',
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
  // SELECTED GUIDELINES
  // ==========================================

  const [selectedGuidelines, setSelectedGuidelines] =
    useState(() => {

      const saved =
        localStorage.getItem(
          'selectedGuidelines'
        )


      // If guidelines were already selected,
      // start with those checked
      if (saved) {

        const savedGuidelines =
          JSON.parse(saved)

        return savedGuidelines
          .map(
            (guideline) =>
              guideline.id
          )
          .filter((id) =>
            guidelines.some(
              (guideline) =>
                guideline.id === id
            )
          )
      }


      // First time opening:
      // start with first two selected
      return [1, 2].filter((id) =>
        guidelines.some(
          (guideline) =>
            guideline.id === id
        )
      )
    })


  // ==========================================
  // CHECK / UNCHECK GUIDELINE
  // ==========================================

  function toggleGuideline(id) {

    if (
      selectedGuidelines.includes(id)
    ) {

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
  // CONFIRM SELECTIONS
  // ==========================================

  function confirmSelections() {

    const selected =
      guidelines.filter(
        (guideline) =>
          selectedGuidelines.includes(
            guideline.id
          )
      )


    // Save selected guidelines
    localStorage.setItem(
      'selectedGuidelines',
      JSON.stringify(selected)
    )


    // We manually selected guidelines
    localStorage.setItem(
      'guidelineMode',
      'manual'
    )


    // Return to New Policy Review
    navigate('/reviews/new')
  }


  return (
    <div className="policy-selection-page">


      {/* ======================================
          BACKGROUND PAGE
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
          BLURRED OVERLAY
      ====================================== */}

      <div
        className="selection-overlay"
        onClick={() =>
          navigate('/reviews/new')
        }
      ></div>



      {/* ======================================
          GUIDELINE SELECTION WINDOW
      ====================================== */}

      <div className="policy-selection-modal">


        <h1>
          Guideline Selection
        </h1>


        <p className="selection-subtitle">
          Select all guidelines to be used in your review
        </p>



        {/* ==================================
            TABLE
        ================================== */}

        <div className="selection-table">


          {/* HEADER */}

          <div className="selection-table-header">

            <div></div>

            <div>
              GUIDELINE NAME
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



          {/* ==================================
              GUIDELINE ROWS
          ================================== */}

          {guidelines.map(
            (guideline) => (

              <div
                className="selection-table-row"
                key={guideline.id}
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
                  />

                </div>



                {/* GUIDELINE NAME */}

                <div className="selection-policy-name">

                  <strong>
                    {guideline.name}
                  </strong>


                  <p>
                    {guideline.description}
                  </p>

                </div>



                {/* DATE CREATED */}

                <div className="selection-date">

                  <span>
                    {guideline.date}
                  </span>


                  <small>
                    {guideline.age}
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

                  <span
                    className={
                      guideline.status ===
                      'Completed'
                        ? 'status completed'
                        : 'status in-review'
                    }
                  >
                    {guideline.status}
                  </span>

                </div>


              </div>

            )
          )}


        </div>



        {/* ==================================
            CONFIRM BUTTON
        ================================== */}

        <div className="selection-confirm-row">

          <button
            type="button"
            className="confirm-selection-button"
            onClick={
              confirmSelections
            }
          >
            Confirm Selections
          </button>

        </div>


      </div>


    </div>
  )
}

export default GuidelineSelectionPage