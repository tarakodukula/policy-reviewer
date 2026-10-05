import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function GuidelinesPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Most recent')

  // Remember guidelines that have been deleted

  const [deletedGuidelineIds, setDeletedGuidelineIds] = useState(
    JSON.parse(
      localStorage.getItem('deletedGuidelineIds')
    ) || []
  )

  // ==========================================
  // ORIGINAL GUIDELINES
  // ==========================================

  const guidelines = [
    {
      id: 1,
      name: 'Cardiac Coverage Guideline',
      description:
        'Policy review for cardiac procedures and treatments.',
      created: 'Sep 23, 2026',
      createdAge: '2 days ago',
      updated: 'Sep 23, 2026',
      updatedAge: '2 days ago',
      status: 'In Review',
    },

    {
      id: 2,
      name: 'Diabetes Treatment Guideline',
      description:
        'Policy review for diabetes management and treatment.',
      created: 'Sep 18, 2026',
      createdAge: '6 days ago',
      updated: 'Sep 18, 2026',
      updatedAge: '6 days ago',
      status: 'Completed',
    },

    {
      id: 3,
      name: 'Oncology Coverage Guideline',
      description:
        'Policy review for oncology services and treatments.',
      created: 'Sep 10, 2026',
      createdAge: '14 days ago',
      updated: 'Sep 10, 2026',
      updatedAge: '14 days ago',
      status: 'Completed',
    },

    {
      id: 4,
      name: 'Orthopedic Surgery Guideline',
      description:
        'Policy review for orthopedic procedures and rehab.',
      created: 'Sep 5, 2026',
      createdAge: '19 days ago',
      updated: 'Sep 5, 2026',
      updatedAge: '19 days ago',
      status: 'In Review',
    },

    {
      id: 5,
      name: 'Mental Health Guideline',
      description:
        'Policy review for mental health services and treatment.',
      created: 'Aug 28, 2026',
      createdAge: '27 days ago',
      updated: 'Aug 28, 2026',
      updatedAge: '27 days ago',
      status: 'Completed',
    },
  ]

  // ==========================================
  // GET UPLOADED GUIDELINES
  // ==========================================

  const addedGuidelines =
    JSON.parse(
      localStorage.getItem('addedGuidelines')
    ) || []

  // ==========================================
  // COMBINE ALL GUIDELINES
  // ==========================================

  const allGuidelines = [
    ...addedGuidelines,
    ...guidelines,
  ].filter(
    (guideline) =>
      !deletedGuidelineIds.includes(
        guideline.id
      )
  )

  // ==========================================
  // DELETE GUIDELINE
  // ==========================================

  function deleteGuideline(id, name) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${name}"?`
      )

    if (!confirmed) {
      return
    }

    const savedGuidelines =
      JSON.parse(
        localStorage.getItem(
          'addedGuidelines'
        )
      ) || []

    const updatedSavedGuidelines =
      savedGuidelines.filter(
        (guideline) =>
          guideline.id !== id
      )

    localStorage.setItem(
      'addedGuidelines',
      JSON.stringify(
        updatedSavedGuidelines
      )
    )

    const updatedDeletedIds = [
      ...deletedGuidelineIds,
      id,
    ]

    setDeletedGuidelineIds(
      updatedDeletedIds
    )

    localStorage.setItem(
      'deletedGuidelineIds',
      JSON.stringify(
        updatedDeletedIds
      )
    )
  }

  // ==========================================
  // SEARCH + FILTER + SORT
  // ==========================================

  const visibleGuidelines =
    allGuidelines
      .filter((guideline) => {
        const matchesSearch =
          guideline.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchesFilter =
          filter === 'All' ||
          guideline.status === filter

        return (
          matchesSearch &&
          matchesFilter
        )
      })

      .sort((a, b) => {
        if (sort === 'Oldest') {
          return (
            new Date(a.created) -
            new Date(b.created)
          )
        }

        return (
          new Date(b.created) -
          new Date(a.created)
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
            Dashboard
          </Link>

          <Link
            to="/reviews"
            className="nav-item"
          >
            Review Sessions
          </Link>

          <Link
            to="/policies"
            className="nav-item"
          >
            Policy Database
          </Link>

          <Link
            to="/guidelines"
            className="nav-item active"
          >
            Guideline Database
          </Link>
        </aside>

        {/* ======================================
            MAIN PAGE
        ====================================== */}

        <main className="guidelines-content">
          <h1>
            Guidelines
          </h1>

          <p className="guidelines-subtitle">
            View and manage your guidelines. Each entry contains a
            guideline with a log of all versions of that guideline over time.
          </p>

          {/* ==================================
              CONTROLS
          ================================== */}

          <div className="guidelines-controls">
            {/* SEARCH */}

            <div className="guidelines-search">
              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search guidelines..."
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />
            </div>

            {/* FILTER BUTTONS */}

            <div className="guidelines-filter-buttons">
              <button
                type="button"
                className={
                  filter === 'All'
                    ? 'active'
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
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setFilter(
                    'In Review'
                  )
                }
              >
                In Review
              </button>

              <button
                type="button"
                className={
                  filter === 'Completed'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setFilter(
                    'Completed'
                  )
                }
              >
                Completed
              </button>
            </div>

            {/* SORT */}

            <div className="guidelines-sort">
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
              GUIDELINES TABLE
          ================================== */}

          <div className="guidelines-table">
            {/* TABLE HEADER */}

            <div className="guidelines-table-header">
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

            {/* TABLE ROWS */}

            {visibleGuidelines.map(
              (guideline) => (
                <div
                  className="guidelines-table-row"
                  key={guideline.id}
                >
                  {/* GUIDELINE NAME */}

                  <div className="guideline-name-cell">
                    <strong>
                      {guideline.name}
                    </strong>

                    <p>
                      {guideline.description}
                    </p>
                  </div>

                  {/* DATE CREATED */}

                  <div className="guideline-date-cell">
                    <span>
                      {guideline.created}
                    </span>

                    <small>
                      {guideline.createdAge}
                    </small>
                  </div>

                  {/* LAST UPDATED */}

                  <div className="guideline-date-cell">
                    <span>
                      {guideline.updated}
                    </span>

                    <small>
                      {guideline.updatedAge}
                    </small>
                  </div>

                  {/* STATUS + DELETE */}

                  <div className="guideline-status-actions">
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

                    <button
                      type="button"
                      className="delete-guideline-button"
                      onClick={() =>
                        deleteGuideline(
                          guideline.id,
                          guideline.name
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* ==================================
              NEW GUIDELINE BUTTON
          ================================== */}

          <button
            type="button"
            className="new-guideline-button"
            onClick={() =>
              navigate(
                '/guidelines/new'
              )
            }
          >
            New Guideline

            <span>
              ＋
            </span>
          </button>
        </main>
      </div>
    </div>
  )
}

export default GuidelinesPage