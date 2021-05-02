import React, { useState, useEffect } from 'react';

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
  if (treePoints >= 7 && treePoints < 21) {
    indexValue = 1;
  } else if (treePoints >= 21 && treePoints < 42) {
    indexValue = 2;
  } else if (treePoints >= 42 && treePoints < 98) {
    indexValue = 3;
  } else if (treePoints >= 98) {
    indexValue = 4;
  } else if (treePoints === -1) {
    indexValue = 5;
  }

  const trees = ['1.png', '2.png', '3.png', '4.png', '5.png', 'empty.png'];
  return (
    <div className="treeview">
      <p>TreeView</p>
      <img alt="timer" src={trees[indexValue]} />
    </div>
  );
}
