import React from 'react';

import '@styles/loading.scss';
const Loading = ({visible}) => {
  return (
    <div id="loading" className={ visible ? "show" : "hide" }>
      <div id="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  );
}

export default Loading;