import { Link, useParams } from 'react-router-dom'

function PolicyDetailsPage() {
  const { policyId } = useParams()


  // ==========================================
  // ORIGINAL POLICIES
  // ==========================================

  const originalPolicies = [
    {
      id: 1,
      name: 'Cardiac Coverage Policy',
      fileName: 'Cardiac_Coverage_Policy_v4.pdf',
      description:
        'Policy review for cardiac procedures and treatments.',
      created: 'Sep 23, 2026',
      status: 'In Review',
    },

    {
      id: 2,
      name: 'Diabetes Treatment Policy',
      fileName: 'Diabetes_Treatment_Policy_v3.pdf',
      description:
        'Policy review for diabetes management and treatment.',
      created: 'Sep 18, 2026',
      status: 'Completed',
    },

    {
      id: 3,
      name: 'Oncology Coverage Policy',
      fileName: 'Oncology_Policy_v2.pdf',
      description:
        'Policy review for oncology services and treatments.',
      created: 'Sep 10, 2026',
      status: 'Completed',
    },

    {
      id: 4,
      name: 'Orthopedic Surgery Policy',
      fileName: 'Ortho_Surgery_Policy_v5.pdf',
      description:
        'Policy review for orthopedic procedures and rehab.',
      created: 'Sep 5, 2026',
      status: 'In Review',
    },

    {
      id: 5,
      name: 'Mental Health Coverage Policy',
      fileName: 'Mental_Health_Policy_v3.pdf',
      description:
        'Policy review for mental health services and treatment.',
      created: 'Aug 28, 2026',
      status: 'Completed',
    },
  ]


  // ==========================================
  // UPLOADED POLICIES
  // ==========================================

  const savedPolicies =
    JSON.parse(
      localStorage.getItem('addedPolicies')
    ) || []


  const uploadedPolicies =
    savedPolicies.map((policy) => ({
      ...policy,

      fileName:
        policy.fileName ||
        policy.name,

      created:
        policy.created ||
        policy.date,

      status:
        policy.status ||
        'In Review',
    }))


  // ==========================================
  // FIND CURRENT POLICY
  // ==========================================

  const allPolicies = [
    ...uploadedPolicies,
    ...originalPolicies,
  ]


  const policy =
    allPolicies.find(
      (item) =>
        String(item.id) ===
        String(policyId)
    )


  // ==========================================
  // GET SAVED VERSIONS
  // ==========================================

  const policyVersions =
    JSON.parse(
      localStorage.getItem('policyVersions')
    ) || []


  const versions = policy
    ? policyVersions
        .filter(
          (version) =>
            version.originalPolicy ===
              policy.fileName ||
            version.originalPolicy ===
              policy.name
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
    : []


  // ==========================================
  // POLICY NOT FOUND
  // ==========================================

  if (!policy) {
    return (
      <div className="app-page">

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

        </header>


        <div className="app-body">

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
              className="nav-item"
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
              className="nav-item active"
            >
              <span className="nav-icon">
                ⊗
              </span>

              Policies
            </Link>

          </aside>


          <main className="policy-details-content">

            <Link
              to="/policies"
              className="back-link"
            >
              ← Back to Policies
            </Link>

            <h1>
              Policy Not Found
            </h1>

            <p>
              This policy could not be found.
            </p>

          </main>

        </div>

      </div>
    )
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
            className="nav-item"
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
            className="nav-item active"
          >
            <span className="nav-icon">
              ⊗
            </span>

            Policies
          </Link>

        </aside>



        {/* MAIN CONTENT */}

        <main className="policy-details-content">


          <Link
            to="/policies"
            className="back-link"
          >
            ← Back to Policies
          </Link>


          <div className="policy-details-heading">

            <div>

              <h1>
                {policy.name}
              </h1>

              <p>
                {policy.description}
              </p>

            </div>


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



          {/* POLICY INFORMATION */}

          <section className="policy-details-card">

            <h2>
              Policy Information
            </h2>


            <div className="policy-information-grid">

              <div>

                <span className="policy-detail-label">
                  POLICY FILE
                </span>

                <strong>
                  {policy.fileName}
                </strong>

              </div>


              <div>

                <span className="policy-detail-label">
                  DATE CREATED
                </span>

                <strong>
                  {policy.created}
                </strong>

              </div>


              <div>

                <span className="policy-detail-label">
                  SAVED VERSIONS
                </span>

                <strong>
                  {versions.length}
                </strong>

              </div>

            </div>

          </section>



          {/* VERSION HISTORY */}

          <section className="policy-details-card">

            <h2>
              Version History
            </h2>

            <p className="policy-version-description">
              View edited versions of this policy that were saved during policy review.
            </p>


            {versions.length === 0 ? (

              <div className="no-policy-versions">

                <strong>
                  No edited versions yet
                </strong>

                <p>
                  Edited versions will appear here after changes are saved from a policy review.
                </p>

              </div>

            ) : (

              <div className="policy-version-list">

                {versions.map(
                  (version, index) => {

                    const versionNumber =
                      versions.length - index

                    const savedDate =
                      new Date(
                        version.createdAt
                      ).toLocaleString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        }
                      )


                    return (

                      <div
                        className="policy-version-card"
                        key={version.id}
                      >

                        <div className="policy-version-header">

                          <div>

                            <strong>
                              Version {versionNumber}
                            </strong>

                            <span>
                              Saved {savedDate}
                            </span>

                          </div>


                          {index === 0 && (

                            <span className="latest-version-badge">
                              Latest
                            </span>

                          )}

                        </div>


                        <div className="policy-version-meta">

                          {version.guideline && (

                            <div>

                              <span>
                                GUIDELINE
                              </span>

                              <strong>
                                {version.guideline}
                              </strong>

                            </div>

                          )}


                          {version.criterion && (

                            <div>

                              <span>
                                POLICY CRITERION
                              </span>

                              <strong>
                                {version.criterion}
                              </strong>

                            </div>

                          )}


                          {version.priority && (

                            <div>

                              <span>
                                PRIORITY
                              </span>

                              <strong>
                                {version.priority}
                              </strong>

                            </div>

                          )}

                        </div>


                        <div className="policy-version-content">

                          <span>
                            SAVED POLICY CONTENT
                          </span>

                          <pre>
                            {version.content}
                          </pre>

                        </div>

                      </div>

                    )
                  }
                )}

              </div>

            )}

          </section>


        </main>


      </div>


    </div>
  )
}

export default PolicyDetailsPage