import React, { useState, useEffect } from 'react';
import '../css/App.css';

export default function TreeView() {
  const BASE_URL = '/api/v1/treeview';
  const [tree, setTree] = useState(0);

  const fetchTree = () => {
    fetch(BASE_URL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setTree(data));
  };

  useEffect(() => {
    fetchTree();
  }, []);

  let treePoints = 0;
  if (tree[0] === undefined) {
    treePoints = -1;
  } else {
    treePoints = tree[0].tree_points;
  }

  let indexValue = 0;
  if (treePoints >= 0 && treePoints < 7) {
    indexValue = 1;
  } else if (treePoints >= 7 && treePoints < 21) {
    indexValue = 2;
  } else if (treePoints >= 21 && treePoints < 42) {
    indexValue = 3;
  } else if (treePoints >= 42 && treePoints < 98) {
    indexValue = 4;
  } else if (treePoints >= 98) {
    indexValue = 5;
  } else if (treePoints === -1) {
    indexValue = 0;
  }

  const trees = ['empty.png', '1.png', '2.png', '3.png', '4.png', '5.png'];
  return (
    <div className="treeview">
      <h2 className="tree-text">TREE LEVEL: {indexValue} / 5 </h2>
      <div className="tree">
        <img className="tree" alt="Treeview" src={trees[indexValue]} />
      </div>
    </div>
  );
}
