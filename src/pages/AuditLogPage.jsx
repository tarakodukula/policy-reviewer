import { useState } from 'react'
import { Link } from 'react-router-dom'

function AuditLogPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  // Read existing browser data without crashing on missing or invalid values.
  function getSavedArray(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key))
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }

  const policyVersions = getSavedArray('policyVersions')
  const recommendationDecisions = getSavedArray('recommendationDecisions')
  const createdReviews = getSavedArray('createdReviews')
  const addedPolicies = getSavedArray('addedPolicies')
  const addedGuidelines = getSavedArray('addedGuidelines')
  const auditEvents = getSavedArray('auditEvents')

  // Preserve the activity already displayed by the original Audit Log.
  const policyRecords = policyVersions.map((version, index) => ({
    id: `policy-${version.id || index}`,
    date: version.createdAt || '',
    user: version.reviewer || 'Sarah Chen',
    action: 'Policy Updated',
    category: 'Policy Changes',
    item: version.originalPolicy || version.policy || 'Policy',
    details: version.reviewName
      ? `Updated during ${version.reviewName}`
      : 'Saved a new policy version',
  }))

  const decisionRecords = recommendationDecisions.map((decision, index) => ({
    id: `decision-${decision.id || index}`,
    date: decision.decidedAt || '',
    user: decision.reviewer || 'Sarah Chen',
    action: decision.decision || 'Decision Recorded',
    category: 'Recommendation Decisions',
    item: decision.policy || 'Policy recommendation',
    details: decision.guideline
      ? `Reference guideline: ${decision.guideline}`
      : 'Reviewed a policy recommendation',
  }))

  const reviewRecords = createdReviews.map((review, index) => ({
    id: `review-${review.id || index}`,
    date: review.createdAt || review.date || '',
    user: review.reviewer || 'Sarah Chen',
    action: 'Review Session Created',
    category: 'Review Sessions',
    item: review.name || 'Untitled Review Session',
    details: review.description || 'Created a new review session',
  }))

  // Read events explicitly saved by other pages, including future deletions.
  const eventRecords = auditEvents.map((event, index) => ({
    id: `event-${event.id || index}`,
    date: event.timestamp || event.date || '',
    user: event.user || 'Sarah Chen',
    action: event.action || 'Change Recorded',
    category: event.category || 'Policy Changes',
    item: event.item || 'Unknown item',
    details: event.details || '',
  }))

  // Existing uploaded items can appear even before their pages start writing
  // dedicated audit events. Avoid showing a second upload row when an event
  // already exists for that item and action.
  function hasUploadEvent(category, name) {
    return eventRecords.some((record) =>
      record.category === category &&
      record.item === name &&
      /upload|add|creat/i.test(record.action)
    )
  }

  const uploadedPolicyRecords = addedPolicies
    .filter((policy) => !hasUploadEvent('Policy Changes', policy.name))
    .map((policy, index) => ({
      id: `uploaded-policy-${policy.id || index}`,
      date: policy.createdAt || policy.date || policy.created || '',
      user: 'Sarah Chen',
      action: 'Policy Uploaded',
      category: 'Policy Changes',
      item: policy.name || 'Unnamed Policy',
      details: policy.fileName
        ? `Document: ${policy.fileName}`
        : 'Added to Policy Database',
    }))

  const uploadedGuidelineRecords = addedGuidelines
    .filter((guideline) => !hasUploadEvent('Guideline Changes', guideline.name))
    .map((guideline, index) => ({
      id: `uploaded-guideline-${guideline.id || index}`,
      date: guideline.createdAt || guideline.created || guideline.date || '',
      user: 'Sarah Chen',
      action: 'Guideline Uploaded',
      category: 'Guideline Changes',
      item: guideline.name || 'Unnamed Guideline',
      details: guideline.fileName
        ? `Document: ${guideline.fileName}`
        : 'Added to Guideline Database',
    }))

  const allRecords = [
    ...policyRecords,
    ...decisionRecords,
    ...reviewRecords,
    ...uploadedPolicyRecords,
    ...uploadedGuidelineRecords,
    ...eventRecords,
  ].sort((a, b) => {
    const aTime = new Date(a.date).getTime() || 0
    const bTime = new Date(b.date).getTime() || 0
    return bTime - aTime
  })

  const visibleRecords = allRecords.filter((record) => {
    const matchesSearch = [
      record.action,
      record.item,
      record.user,
      record.details,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesSearch && (filter === 'All' || record.category === filter)
  })

  function formatDate(value) {
    if (!value) return 'Date unavailable'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)

    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const policyCount = allRecords.filter(
    (record) => record.category === 'Policy Changes'
  ).length
  const guidelineCount = allRecords.filter(
    (record) => record.category === 'Guideline Changes'
  ).length
  const decisionCount = allRecords.filter(
    (record) => record.category === 'Recommendation Decisions'
  ).length
  const reviewCount = allRecords.filter(
    (record) => record.category === 'Review Sessions'
  ).length

  const columnStyle = {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr 1.5fr 1.5fr 2fr',
    gap: '16px',
  }

  return (
    <div className="app-page">
      <header className="top-bar">
        <div className="brand-area">
          <span className="brand-name">Policy Review</span>
          <span className="brand-divider"></span>
          <span className="workspace-name">Policy Review Workspace</span>
        </div>

        <div className="top-right">
          <div className="search-box">
            <span>⌕</span>
            <input type="text" placeholder="Search policies, guidelines..." />
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
        <aside className="sidebar">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/reviews" className="nav-item">Review Sessions</Link>
          <Link to="/policies" className="nav-item">Policy Database</Link>
          <Link to="/guidelines" className="nav-item">Guideline Database</Link>
          <Link to="/audit-log" className="nav-item active">Audit Log</Link>
        </aside>

        <main className="policy-reviews-content" style={{ width: '100%' }}>
          <h1>Audit Log</h1>
          <p className="page-subtitle">
            View policy and guideline changes, recommendation decisions,
            and review sessions.
          </p>

          {/* SUMMARY CARDS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              marginTop: '26px',
              marginBottom: '28px',
            }}
          >
            {[
              ['TOTAL CHANGES', allRecords.length],
              ['POLICY CHANGES', policyCount],
              ['GUIDELINE CHANGES', guidelineCount],
              ['RECOMMENDATION DECISIONS', decisionCount],
              ['REVIEW SESSIONS', reviewCount],
            ].map(([label, count]) => (
              <div className="stat-card" key={label}>
                <span>{label}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>

          {/* SEARCH AND FILTER */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '22px',
              flexWrap: 'wrap',
            }}
          >
            <input
              className="review-search"
              type="text"
              placeholder="Search audit history..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              style={{
                padding: '11px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '7px',
                background: 'white',
              }}
            >
              <option value="All">All Actions</option>
              <option value="Policy Changes">Policy Changes</option>
              <option value="Guideline Changes">Guideline Changes</option>
              <option value="Recommendation Decisions">Recommendation Decisions</option>
              <option value="Review Sessions">Review Sessions</option>
            </select>
          </div>

          {/* AUDIT TABLE */}
          <div
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              overflowX: 'auto',
            }}
          >
            <div
              style={{
                ...columnStyle,
                minWidth: '780px',
                padding: '18px 22px',
                background: '#f8fafc',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '12px',
                fontWeight: 700,
                color: '#64748b',
              }}
            >
              <span>DATE</span>
              <span>USER</span>
              <span>ACTION</span>
              <span>ITEM</span>
              <span>DETAILS</span>
            </div>

            {visibleRecords.map((record) => (
              <div
                key={record.id}
                style={{
                  ...columnStyle,
                  minWidth: '780px',
                  padding: '18px 22px',
                  borderBottom: '1px solid #edf0f3',
                  alignItems: 'center',
                  fontSize: '13px',
                }}
              >
                <span>{formatDate(record.date)}</span>
                <span>{record.user}</span>
                <span style={{ fontWeight: 600 }}>{record.action}</span>
                <span>{record.item}</span>
                <span style={{ color: '#64748b' }}>{record.details}</span>
              </div>
            ))}

            {visibleRecords.length === 0 && (
              <div
                style={{
                  padding: '45px 20px',
                  textAlign: 'center',
                  color: '#64748b',
                }}
              >
                {allRecords.length === 0
                  ? 'No recorded changes yet. Add a policy, upload a guideline, or create a review session to see activity here.'
                  : 'No audit records match your search or filter.'}
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: '12px',
              color: '#64748b',
              marginTop: '18px',
            }}
          >
            This prototype displays records saved in this browser.
            Audit history is not yet shared across users or devices, and
            browser storage can be changed or cleared. Upload records inferred
            from existing database items do not necessarily include an exact
            upload time. Deleted items will be tracked after their pages are
            connected to the audit event history.
          </p>
        </main>
      </div>
    </div>
  )
}

export default AuditLogPage