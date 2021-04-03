export default function Header() {
  return (
    <header className="mb-6">
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title is-5 has-text-white">Speech Synthesis</h1>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
          <a className="button is-primary" href="https://github.com/gabrielrufino/speech-synthesis" target="_blank">
            <span className="icon has-text-white">
              <i className="fab fa-github"></i>
            </span>
            <strong>Github</strong>
          </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
