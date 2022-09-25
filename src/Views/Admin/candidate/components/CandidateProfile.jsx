export const CandidateProfile = props => {
  return (
    <div className="App">
      <div className="container mt-5">
        <h1 className="text-center">Therichpost.com</h1>
      </div>
      <div class="container p-5">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Open PDF
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content" style={{ height: '500px' }}>
              <div class="modal-header">
                <h5 class="modal-title text-danger" id="exampleModalLabel">
                  PDF
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <iframe
                  src="https://therichpost.com/sample.pdf#toolbar=0&navpanes=0&scrollbar=0"
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                  title="Candidate CV"
                ></iframe>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
