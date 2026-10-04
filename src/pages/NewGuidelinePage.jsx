import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NewGuidelinePage() {
  const navigate = useNavigate()

  const [guidelineName, setGuidelineName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)


  // ==========================================
  // SELECT FILE
  // ==========================================

  function handleFileChange(event) {
    const file = event.target.files[0]

    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      })
    }
  }


  // ==========================================
  // REMOVE FILE
  // ==========================================

  function removeFile() {
    setSelectedFile(null)
  }


  // ==========================================
  // UPLOAD GUIDELINE
  // ==========================================

  function uploadGuideline() {

    // Make sure a guideline name was entered
    if (guidelineName.trim() === '') {
      alert('Please enter a guideline name.')
      return
    }


    // Make sure a file was selected
    if (!selectedFile) {
      alert('Please select a guideline document.')
      return
    }


    // Today's date
    const today = new Date().toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )


    // Create the new guideline
    const newGuideline = {
      id: Date.now(),

      name: guidelineName,

      description:
        `Guideline review for ${guidelineName}.`,

      created: today,

      createdAge: 'Just now',

      updated: today,

      updatedAge: 'Just now',

      status: 'In Review',

      fileName: selectedFile.name,
    }


    // Get guidelines already added
    const savedGuidelines =
      JSON.parse(
        localStorage.getItem('addedGuidelines')
      ) || []


    // Add this new guideline
    savedGuidelines.push(newGuideline)


    // Save them
    localStorage.setItem(
      'addedGuidelines',
      JSON.stringify(savedGuidelines)
    )


    // Return to Guidelines page
    navigate('/guidelines')
  }


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
            className="nav-item"
          >
            <span className="nav-icon">
              ▣
            </span>

            Policy Reviews
          </Link>


          <Link
            to="/guidelines"
            className="nav-item active"
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
            MAIN CONTENT
        ====================================== */}

        <main className="new-guideline-content">


          <Link
            to="/guidelines"
            className="back-link"
          >
            ← Back to Guidelines
          </Link>


          <h1>
            New Guidelines
          </h1>


          <p className="new-guideline-subtitle">
            Upload new guidelines
          </p>



          {/* ==================================
              GUIDELINE INFORMATION
          ================================== */}

          <section className="new-guideline-card">

            <h2>
              Guideline Information
            </h2>


            <label className="new-guideline-label">
              Guideline Name
            </label>


            <input
              className="guideline-name-input"
              type="text"
              placeholder="Enter a name for this guideline"
              value={guidelineName}
              onChange={(event) =>
                setGuidelineName(
                  event.target.value
                )
              }
            />

          </section>



          {/* ==================================
              GUIDELINE DOCUMENT
          ================================== */}

          <section className="new-guideline-card guideline-document-card">

            <h2>
              Guideline Document(s)
            </h2>


            <p>
              Upload or select the guideline documents you want to review.
            </p>


            <label className="guideline-upload-area">

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleFileChange}
              />


              <div className="guideline-upload-icon">
                ⇧
              </div>


              <div className="guideline-upload-text">

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

          </section>



          {/* ==================================
              SELECTED FILE
          ================================== */}

          {selectedFile && (

            <div className="guideline-selected-file">

              <div>

                <strong>
                  {selectedFile.name}
                </strong>

                <small>
                  PDF • {selectedFile.size}
                </small>

              </div>


              <button
                type="button"
                onClick={removeFile}
              >
                Remove
              </button>

            </div>

          )}



          {/* ==================================
              BOTTOM BUTTONS
          ================================== */}

          <div className="new-guideline-actions">


            <button
              type="button"
              className="cancel-guideline-button"
              onClick={() =>
                navigate('/guidelines')
              }
            >
              Cancel
            </button>


            <button
              type="button"
              className="upload-documents-button"
              onClick={uploadGuideline}
            >
              Upload Documents
            </button>


          </div>

        </main>

      </div>

    </div>
  )
}

export default NewGuidelinePage