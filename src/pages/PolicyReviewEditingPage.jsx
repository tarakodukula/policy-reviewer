import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function PolicyReviewEditingPage() {
  const navigate = useNavigate()


  // ==========================================
  // GET THE FINDING THAT WAS CLICKED
  // ==========================================

  const savedFinding =
    localStorage.getItem('currentFinding')


  const currentFinding = savedFinding
    ? JSON.parse(savedFinding)
    : {
        id: 1,

        policy:
          'Cardiac_Coverage_Policy_v4.pdf',

        policyCriterion:
          'Criterion 4.2.1',

        policyText:
          'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A and B, including documented ischemia...',

        guideline:
          '2026 Cardiac Coverage Guidelines',

        guidelineCriterion:
          'Criterion 4.2.1',

        guidelineText:
          'Coverage is permitted for patients with symptomatic coronary artery disease who meet criteria A, B, and C, including documented ischemia or significant anatomical findings...',

        type: 'Change',

        priority: 'High',
      }


  // ==========================================
  // POLICY EDITOR TEXT
  // ==========================================

  const [policyText, setPolicyText] =
    useState(() => {

      // Start the editor using the policy
      // information from the finding clicked
      return `${currentFinding.policy}

${currentFinding.policyCriterion || ''}

${currentFinding.policyText || ''}`
    })


  // ==========================================
  // RECOMMENDATION
  // ==========================================

  const recommendations = [
    {
      id: currentFinding.id,

      policy:
        currentFinding.policy,

      policyCriterion:
        currentFinding.policyCriterion ||
        'No criterion listed',

      policyText:
        currentFinding.policyText,

      guideline:
        currentFinding.guideline,

      guidelineCriterion:
        currentFinding.guidelineCriterion ||
        'No criterion listed',

      guidelineText:
        currentFinding.guidelineText,

      type:
        currentFinding.type ||
        'Change',

      priority:
        currentFinding.priority ||
        'Medium',

      recommendation:
        getRecommendation(
          currentFinding.type
        ),

      proposedChange:
        getProposedChange(
          currentFinding
        ),
    },
  ]


  // ==========================================
  // RECOMMENDATION TEXT
  // ==========================================

  function getRecommendation(type) {

    if (type === 'Add') {
      return 'Add the guideline requirement to the current policy to improve alignment.'
    }

    if (type === 'Remove') {
      return 'Remove the identified policy language because it is not supported by the selected guideline.'
    }

    return 'Update the policy language to align with the selected external guideline.'
  }


  // ==========================================
  // PROPOSED CHANGE
  // ==========================================

  function getProposedChange(finding) {

    if (finding.guidelineText) {
      return finding.guidelineText
    }

    return 'Update this policy section according to the selected guideline.'
  }


  // ==========================================
  // SAVE CHANGES
  // ==========================================

  function saveChanges() {

    // Get any previously saved policy versions
    const oldVersions =
      JSON.parse(
        localStorage.getItem(
          'policyVersions'
        )
      ) || []


    // Create the new version
    const newVersion = {

      id: Date.now(),

      originalPolicy:
        currentFinding.policy,

      content:
        policyText,

      createdAt:
        new Date().toISOString(),

      sourceFinding:
        currentFinding.id,

      guideline:
        currentFinding.guideline,

      criterion:
        currentFinding.policyCriterion,

      type:
        currentFinding.type,

      priority:
        currentFinding.priority,
    }


    // Add new version
    const updatedVersions = [
      ...oldVersions,
      newVersion,
    ]


    // Save it
    localStorage.setItem(
      'policyVersions',
      JSON.stringify(updatedVersions)
    )


    // Also remember the newest edited version
    localStorage.setItem(
      'latestPolicyVersion',
      JSON.stringify(newVersion)
    )


    // Return to findings
    navigate('/reviews/findings')
  }


  return (
    <div className="app-page">


      {/* ======================================
          HEADER
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

        <main className="policy-editor-content">


          <Link
            to="/reviews/findings"
            className="back-link"
          >
            ← Back to Review Findings
          </Link>



          <h1>
            Policy Review and Editor
          </h1>


          <p className="policy-editor-subtitle">
            View the recommended change based on the guideline finding, and directly edit and save a new version of the policy.
          </p>



          {/* ==================================
              RECOMMENDATIONS
          ================================== */}

          <section className="editor-card">


            <h2>
              Policy Document(s)
            </h2>


            <p className="editor-card-description">
              Review the policy criterion, guideline criterion, and recommended change.
            </p>



            <div className="editor-recommendations-table">


              {/* TABLE HEADER */}

              <div className="editor-table-header">

                <div>
                  POLICY CRITERION
                </div>

                <div>
                  GUIDELINE CRITERION
                </div>

                <div>
                  RECOMMENDATION
                </div>

              </div>



              <div className="editor-table-scroll">


                {recommendations.map(
                  (item) => (

                    <div
                      className="editor-recommendation-row"
                      key={item.id}
                    >


                      {/* POLICY */}

                      <div className="editor-policy-column">

                        <strong>
                          {item.policy}
                        </strong>


                        {item.policyCriterion && (

                          <span>
                            {item.policyCriterion}
                          </span>

                        )}


                        <p>
                          {item.policyText}
                        </p>

                      </div>



                      {/* GUIDELINE */}

                      <div className="editor-guideline-column">

                        <strong>
                          {item.guideline}
                        </strong>


                        <span>
                          {item.guidelineCriterion}
                        </span>


                        <p>
                          {item.guidelineText}
                        </p>

                      </div>



                      {/* RECOMMENDATION */}

                      <div className="editor-recommendation-column">


                        <div className="recommendation-tags">


                          <span
                            className={`recommendation-type ${item.type.toLowerCase()}`}
                          >
                            {item.type.toUpperCase()}
                          </span>


                          <span
                            className={`recommendation-priority ${item.priority.toLowerCase()}`}
                          >
                            {item.priority.toUpperCase()}
                          </span>


                        </div>



                        <strong className="recommendation-text">
                          {item.recommendation}
                        </strong>



                        <span className="proposed-change-label">
                          Proposed Change:
                        </span>



                        <div className="proposed-change-box">
                          {item.proposedChange}
                        </div>


                      </div>


                    </div>

                  )
                )}


              </div>


            </div>


          </section>



          {/* ==================================
              POLICY DOCUMENT EDITOR
          ================================== */}

          <section className="editor-card policy-document-editor">


            <h2>
              Policy Document Editor
            </h2>


            <p className="editor-card-description">
              Directly edit the current version of the policy document based on the recommended change. Press Save Changes when finished editing to save a new policy version.
            </p>



            <textarea
              className="policy-editor-textarea"
              value={policyText}
              onChange={(event) =>
                setPolicyText(
                  event.target.value
                )
              }
            />


          </section>



          {/* ==================================
              BOTTOM BUTTONS
          ================================== */}

          <div className="policy-editor-actions">


            {/* CANCEL */}

            <button
              type="button"
              className="cancel-review-button"
              onClick={() =>
                navigate(
                  '/reviews/findings'
                )
              }
            >
              Cancel
            </button>



            {/* SAVE */}

            <button
              type="button"
              className="start-review-button"
              onClick={saveChanges}
            >
              Save Changes
            </button>


          </div>


        </main>


      </div>


    </div>
  )
}

export default PolicyReviewEditingPage