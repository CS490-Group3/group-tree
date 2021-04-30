import React from 'react';

export default function TreeView() {
  const trees = ['1.png', '2.png', '3.png', '4.png', '5.png'];
  const indexValue = 4;
  return (
    <div className="treeview">
      <p>TreeView</p>
      <img alt="timer" src={trees[indexValue]} />
    </div>
  );
}
