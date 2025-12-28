import React, { useState, useEffect, useRef, useMemo } from 'react';
import { templates } from '../data/templates';

const BookmarkletCreator = () => {
  const [code, setCode] = useState(templates[0].code);
  const [label, setLabel] = useState(templates[0].label);
  const [selectedDescription, setSelectedDescription] = useState(templates[0].description);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const linkRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const bookmarkletHref = useMemo(() => {
    const wrappedCode = `javascript:(function(){${code}})();`;
    return encodeURI(wrappedCode);
  }, [code]);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.setAttribute('href', bookmarkletHref);
    }
  }, [bookmarkletHref]);

  const loadTemplate = (template) => {
    setCode(template.code);
    setLabel(template.label);
    setSelectedDescription(template.description);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookmarkletHref).then(() => {
      alert('Bookmarklet code copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <h1>ScriptMark - JS Bookmarklet Creator</h1>
        <p>Turn your JavaScript code into a browser bookmarklet instantly.</p>
      </header>

      <main className="main-content">
        <section className="preview-section">
          <div className="control-group">
            <label>Choose a Template</label>
            <div className="template-buttons">
              {templates.map((t, idx) => (
                <button
                  key={idx}
                  className="btn-secondary"
                  onClick={() => loadTemplate(t)}
                  title={t.description}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <p className="template-description" style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {selectedDescription}
            </p>
          </div>

          <div className="drag-area">
            <p>Drag this button to your bookmarks bar</p>
            <a
              ref={linkRef}
              className="bookmarklet-button"
              onClick={(e) => e.preventDefault()}
              title="Drag me to your bookmarks bar!"
            >
              {label || 'My Bookmarklet'}
            </a>
          </div>

          <div className="control-group">
            <label>Or Copy Code</label>
            <div className="copy-group">
              <input
                type="text"
                className="input-text code-preview"
                value={bookmarkletHref}
                readOnly
              />
              <button
                className="btn-primary"
                type="button"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        <section className="editor-section">
          <div className="control-group">
            <label>Bookmarklet Name</label>
            <input
              type="text"
              className="input-text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="codeEditor">JavaScript Code</label>
            <textarea
              id="codeEditor"
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            ></textarea>
            <span className="helper-text">
              Code is automatically wrapped in an IIFE.
            </span>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-links">
          <a href="https://github.com/SamSeenX/jsbookmark" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://twitter.com/SamSeenX" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://buymeacoffee.com/samseen" target="_blank" rel="noopener noreferrer" className="social-icon coffee-icon" title="Buy me a coffee">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </a>
        </div>
        <p>&copy; 2026 ScriptMark. Open Source Software.</p>
        <p className="made-with">Made with ❤️ by <a href="https://buymeacoffee.com/samseen" target="_blank" rel="noopener noreferrer">SamSeen</a></p>
      </footer>
    </div>
  );
};

export default BookmarkletCreator;