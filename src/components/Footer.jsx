import React from 'react';

export default function Footer() {
  const githubClick = () => {
    window.open('https://github.com/CS490-Group3/Project3');
  };

  return (
    <div className="footer">
      <i className="far fa-copyright" />
      <span> 2021 GroupTree</span>
      <button type="submit" href="#" className="github-link" onClick={githubClick}>
        <i className="fab fa-github margin-left" />
      </button>
    </div>
  );
}
