import { Link } from 'react-router-dom'

function DashboardPage() {
  const reviews = [
    {
      name: 'Medical Necessity - Cardiac MRI',
      status: 'In Review',
      date: 'Oct 22, 2026',
      reviewer: 'Sarah Chen',
    },
    {
      name: 'Prior Auth - Spinal Fusion',
      status: 'Completed',
      date: 'Oct 20, 2026',
      reviewer: 'Sarah Chen',
    },
    {
      name: 'Coverage Criteria - Biologic Therapies',
      status: 'Completed',
      date: 'Oct 19, 2026',
      reviewer: 'Dr. Aris Thorne',
    },
    {
      name: 'Medical Necessity - Proton Beam Therapy',
      status: 'In Review',
      date: 'Oct 18, 2026',
      reviewer: 'Sarah Chen',
    },
    {
      name: 'Prior Auth - Total Joint Arthroplasty',
      status: 'Completed',
      date: 'Oct 15, 2026',
      reviewer: 'Dr. J. Patel',
    },
    {
      name: 'Coverage Criteria - Oncology Genetic Panel',
      status: 'In Review',
      date: 'Oct 14, 2026',
      reviewer: 'Sarah Chen',
    },
  ]

  return (
    <div className="app-page">

      {/* TOP GREEN BAR */}
      <header className="top-bar">
        <div className="brand-area">
          <span className="brand-name">Policy Review</span>
          <span className="brand-divider"></span>
          <span className="workspace-name">Policy Review Workspace</span>
        </div>

        <div className="top-right">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search policies, codes..."
            />
          </div>

          <span className="top-icon">?</span>
          <span className="top-icon">⚙</span>

          <div className="user-area">
            <div className="user-avatar">SC</div>
            <span>Sarah Chen</span>
          </div>
        </div>
      </header>

      <div className="app-body">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">

          <Link to="/dashboard" className="nav-item active">
            <span className="nav-icon">▦</span>
            Dashboard
          </Link>

          <Link to="/reviews" className="nav-item">
            <span className="nav-icon">▣</span>
            Policy Reviews
          </Link>

          <Link to="/guidelines" className="nav-item">
            <span className="nav-icon">⊗</span>
            Guidelines
          </Link>

          <Link to="/policies" className="nav-item">
            <span className="nav-icon">⊗</span>
            Policies
          </Link>

        </aside>

        {/* DASHBOARD CONTENT */}
        <main className="dashboard-content">

          <h1>Dashboard</h1>

          <div className="stat-cards">

            <div className="stat-card">
              <span>ACTIVE REVIEWS</span>
              <strong>12</strong>
            </div>

            <div className="stat-card">
              <span>PENDING RECOMMENDATIONS</span>
              <strong>34</strong>
            </div>

          </div>

          <div className="dashboard-grid">

            {/* RECENT REVIEWS */}
            <section className="reviews-card">

              <h2>Recent Policy Reviews</h2>

              <div className="review-table-header">
                <span>REVIEW SESSION NAME</span>
                <span>STATUS</span>
                <span>LAST UPDATED</span>
                <span>REVIEWER</span>
              </div>

              {reviews.map((review, index) => (
                <div className="review-row" key={index}>

                  <strong>{review.name}</strong>

                  <span
                    className={
                      review.status === 'Completed'
                        ? 'status completed'
                        : 'status in-review'
                    }
                  >
                    {review.status}
                  </span>

                  <span>{review.date}</span>

                  <span>{review.reviewer}</span>

                </div>
              ))}

            </section>

            {/* RECOMMENDATION SUMMARY */}
            <section className="recommendation-card">

              <h2>Recommendation Summary</h2>

              <p>Identified policy actions by category</p>

              <div className="recommendation-item">
                <div className="recommendation-label">
                  <strong>Criteria Update Needed</strong>
                  <span>14</span>
                </div>

                <div className="progress-background">
                  <div className="progress criteria"></div>
                </div>
              </div>

              <div className="recommendation-item">
                <div className="recommendation-label">
                  <strong>Guideline Mismatch</strong>
                  <span>8</span>
                </div>

                <div className="progress-background">
                  <div className="progress mismatch"></div>
                </div>
              </div>

              <div className="recommendation-item">
                <div className="recommendation-label">
                  <strong>New Evidence Available</strong>
                  <span>12</span>
                </div>

                <div className="progress-background">
                  <div className="progress evidence"></div>
                </div>
              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  )
}

export default DashboardPage