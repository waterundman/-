const treeGroups = document.querySelectorAll('.tree__group');
const treeNodes = document.querySelectorAll('.tree__node');
const treeLeaves = document.querySelectorAll('.tree__leaf');
const noteTitle = document.getElementById('note-title');
const noteMeta = document.getElementById('note-meta');

const groupLabels = ['产品规划', '设计素材', '会议纪要'];

const toggleGroup = (index) => {
  treeGroups.forEach((group, idx) => {
    if (idx === index) {
      group.classList.toggle('open');
      treeNodes[idx].classList.toggle('active');
    } else {
      group.classList.remove('open');
      treeNodes[idx].classList.remove('active');
    }
  });
};

treeNodes.forEach((node, index) => {
  node.addEventListener('click', () => toggleGroup(index));
});

treeLeaves.forEach((leaf) => {
  leaf.addEventListener('click', () => {
    treeLeaves.forEach((item) => item.classList.remove('active'));
    leaf.classList.add('active');

    const title = leaf.textContent.trim();
    const groupIndex = Array.from(treeGroups).findIndex((group) =>
      group.contains(leaf)
    );

    noteTitle.textContent = title;
    noteMeta.textContent = `2024-02-08 · ${groupLabels[groupIndex]}`;
  });
});

// Default open first group and highlight first leaf.
if (treeGroups.length > 0) {
  treeGroups[0].classList.add('open');
  treeNodes[0].classList.add('active');
}

if (treeLeaves.length > 0) {
  treeLeaves[0].classList.add('active');
}
