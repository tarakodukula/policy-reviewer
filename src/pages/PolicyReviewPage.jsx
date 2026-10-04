import { useState } from 'react'
import { Link } from 'react-router-dom'

function PolicyReviewPage() {

  // ==========================================
  // SEARCH / FILTER / SORT
  // ==========================================

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Most recent')


  // ==========================================
  // ORIGINAL REVIEWS
  // ==========================================

  const originalReviews = [
    {
      id: 1,
      name: 'Cardiac Coverage Policy',
      description:
        'Policy review for cardiac procedures and treatments.',
      document: 'Cardiac_Coverage_Policy_v4.pdf',
      version: 'v4.0',
      guideline: '2026 Cardiac Coverage Guidelines',
      guidelineVersion: 'v2.1',
      date: 'Sep 23, 2026',
      age: '2 days ago',
      status: 'In Review',
      findings: 14,
    },

    {
      id: 2,
      name: 'Diabetes Treatment Policy',
      description:
        'Policy review for diabetes management and treatment.',
      document: 'Diabetes_Treatment_Policy_v3.pdf',
      version: 'v3.0',
      guideline: '2026 Diabetes Treatment Guidelines',
      guidelineVersion: 'v1.8',
      date: 'Sep 18, 2026',
      age: '6 days ago',
      status: 'Completed',
      findings: 8,
    },

    {
      id: 3,
      name: 'Oncology Coverage Policy',
      description:
        'Policy review for oncology services and treatments.',
      document: 'Oncology_Policy_v2.pdf',
      version: 'v2.0',
      guideline: 'Oncology Coverage Guidelines',
      guidelineVersion: 'v1.4',
      date: 'Sep 10, 2026',
      age: '14 days ago',
      status: 'Completed',
      findings: 21,
    },

    {
      id: 4,
      name: 'Orthopedic Surgery Policy',
      description:
        'Policy review for orthopedic procedures and rehab.',
      document: 'Ortho_Surgery_Policy_v5.pdf',
      version: 'v5.0',
      guideline: '2026 Orthopedic Guidelines',
      guidelineVersion: 'v2.0',
      date: 'Sep 5, 2026',
      age: '19 days ago',
      status: 'In Review',
      findings: 0,
    },

    {
      id: 5,
      name: 'Mental Health Coverage Policy',
      description:
        'Policy review for mental health services and treatment.',
      document: 'Mental_Health_Policy_v3.pdf',
      version: 'v3.0',
      guideline: '2026 Mental Health Guidelines',
      guidelineVersion: 'v1.6',
      date: 'Aug 28, 2026',
      age: '27 days ago',
      status: 'Completed',
      findings: 12,
    },
  ]


  // ==========================================
  // GET NEW REVIEWS
  // ==========================================

  const savedReviews =
    JSON.parse(
      localStorage.getItem('createdReviews')
    ) || []


  // Put new reviews above original reviews
  const allReviews = [
    ...savedReviews,
    ...originalReviews,
  ]


  // ==========================================
  // SEARCH + FILTER + SORT
  // ==========================================

  const visibleReviews = allReviews
    .filter((review) => {

      const matchesSearch =
        review.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )


      const matchesFilter =
        filter === 'All' ||
        review.status === filter


      return (
        matchesSearch &&
        matchesFilter
      )
    })

    .sort((a, b) => {

      if (sort === 'Oldest') {
        return (
          new Date(a.date) -
          new Date(b.date)
        )
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      )
    })


  return (
    <div className="app-page">


      {/* ======================================
          TOP BAR
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



        {/* ======================================
            MAIN PAGE
        ====================================== */}

        <main className="policy-reviews-content">


          <h1>
            Policy Reviews
          </h1>


          <p className="page-subtitle">
            All policy review sessions created by you
          </p>



          {/* ==================================
              CONTROLS
          ================================== */}

          <div className="review-controls">


            {/* SEARCH */}

            <input
              className="review-search"
              type="text"
              placeholder="⌕   Search policy reviews..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />



            {/* FILTERS */}

            <div className="filter-buttons">


              <button
                type="button"
                className={
                  filter === 'All'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('All')
                }
              >
                All
              </button>


              <button
                type="button"
                className={
                  filter === 'In Review'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('In Review')
                }
              >
                In Review
              </button>


              <button
                type="button"
                className={
                  filter === 'Completed'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('Completed')
                }
              >
                Completed
              </button>


            </div>



            {/* SORT */}

            <div className="sort-area">

              <span>
                Sort by
              </span>


              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value
                  )
                }
              >

                <option>
                  Most recent
                </option>

                <option>
                  Oldest
                </option>

              </select>


            </div>


          </div>



          {/* ==================================
              REVIEW TABLE
          ================================== */}

          <div className="policy-review-table">


            {/* TABLE HEADER */}

            <div className="policy-review-header">

              <span>
                REVIEW NAME
              </span>

              <span>
                POLICY DOCUMENT
              </span>

              <span>
                EXTERNAL GUIDELINE
              </span>

              <span>
                DATE CREATED
              </span>

              <span>
                STATUS
              </span>

              <span>
                FINDINGS
              </span>

            </div>



            {/* REVIEW ROWS */}

            {visibleReviews.map(
              (review) => (

                <div
                  className="policy-review-row"
                  key={review.id}
                >


                  {/* REVIEW NAME */}

                  <div>

                    <strong className="review-name">
                      {review.name}
                    </strong>

                    <p>
                      {review.description}
                    </p>

                  </div>



                  {/* POLICY DOCUMENT */}

                  <div className="document-cell">

                    <span className="pdf-icon">
                      PDF
                    </span>


                    <div>

                      <strong>
                        {review.document}
                      </strong>

                      <small>
                        {review.version}
                      </small>

                    </div>

                  </div>



                  {/* GUIDELINE */}

                  <div className="guideline-cell">

                    <span className="guideline-icon">
                      ⌜
                    </span>


                    <div>

                      <strong>
                        {review.guideline}
                      </strong>

                      <small>
                        {review.guidelineVersion}
                      </small>

                    </div>

                  </div>



                  {/* DATE */}

                  <div className="date-cell">

                    <span>
                      {review.date}
                    </span>

                    <small>
                      {review.age}
                    </small>

                  </div>



                  {/* STATUS */}

                  <div>

                    <span
                      className={
                        review.status ===
                        'Completed'
                          ? 'status completed'
                          : 'status in-review'
                      }
                    >
                      {review.status}
                    </span>

                  </div>



                  {/* FINDINGS */}

                  <div className="findings-cell">

                    <strong>
                      {review.findings}
                    </strong>

                    <small>
                      identified
                    </small>

                  </div>


                </div>

              )
            )}


          </div>



          {/* ==================================
              NEW REVIEW
          ================================== */}

          <Link
            to="/reviews/new"
            className="new-review-button"
          >
            New Review

            <span>
              +
            </span>
          </Link>


        </main>


      </div>


    </div>
  )
}

export default PolicyReviewPage