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

    updateContent(title);
    noteMeta.textContent = `2024-02-08 · ${groupLabels[groupIndex]}`;
    updateActivity(title);
    updateOutputPreview(title);
  });
});

const updateBadgeCount = (groupIndex) => {
  const badge = treeGroups[groupIndex].querySelector('.badge');
  const count = treeGroups[groupIndex].querySelectorAll('.tree__leaf').length;
  badge.textContent = count;
};

const updateActivity = (title) => {
  const data = noteData[title];
  if (!data) return;
  activityLog.innerHTML = [
    `${data.updated} 更新了笔记`,
    '已同步到团队空间',
    '生成了可分享摘要',
  ]
    .map((item) => `<li>${item}</li>`)
    .join('');
};

const updateOutputPreview = (title) => {
  const data = noteData[title];
  if (!data) return;
  outputPreview.textContent = `${title}：${data.summary} 标签：${data.tags.join(' ')}。`;
};

const filterLeaves = () => {
  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
  getLeaves().forEach((leaf) => {
    const title = leaf.textContent.trim();
    const data = noteData[title];
    const matchesKeyword = title.toLowerCase().includes(keyword);
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'favorite' && data?.favorite) ||
      (activeFilter === 'shared' && data?.shared) ||
      (activeFilter === 'recent' &&
        ['2024-02-08', '2024-02-07'].some((date) =>
          data?.updated.startsWith(date)
        ));
    leaf.style.display = matchesKeyword && matchesFilter ? 'block' : 'none';
  });
};

const handleTabSwitch = (tabKey) => {
  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabKey);
  });
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === tabKey);
  });
};

if (exportButton) {
  exportButton.addEventListener('click', () => {
    const title = noteTitle.textContent.trim();
    const data = noteData[title];
    const content = `${title}\n\n${data ? data.summary : '暂无内容'}\n\n标签：${
      data ? data.tags.join(' ') : '未设置'
    }`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = title.replace('.docx', '') + '.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

if (newNoteButton) {
  newNoteButton.addEventListener('click', () => {
    const title = prompt('请输入新的 Word 笔记名称，例如：新品发布.docx');
    if (!title) return;

    const normalized = title.endsWith('.docx') ? title : `${title}.docx`;
    if (noteData[normalized]) {
      alert('该笔记已存在，请换一个名称。');
      return;
    }

    noteData[normalized] = {
      summary: '这是一条新建笔记，可在此补充内容。',
      tags: ['#新建', '#待整理'],
      outline: ['补充核心目标。', '拆解阶段任务。', '标记协作事项。'],
      details: '新建笔记的补充说明将在此展示。',
      relations: [],
      updated: '2024-02-08 12:00',
      favorite: false,
      shared: false,
    };

    const groupIndex = 0;
    const container = treeGroups[groupIndex].querySelector('.tree__children');
    const button = document.createElement('button');
    button.className = 'tree__leaf';
    button.textContent = normalized;
    button.dataset.note = normalized;

    button.addEventListener('click', () => {
      getLeaves().forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      updateContent(normalized);
      noteMeta.textContent = `2024-02-08 · ${groupLabels[groupIndex]}`;
      updateActivity(normalized);
      updateOutputPreview(normalized);
    });

    container.appendChild(button);
    updateBadgeCount(groupIndex);
    filterLeaves();
  });
}

if (toggleFavoriteButton) {
  toggleFavoriteButton.addEventListener('click', () => {
    const title = noteTitle.textContent.trim();
    if (!noteData[title]) return;
    noteData[title].favorite = !noteData[title].favorite;
    toggleFavoriteButton.textContent = noteData[title].favorite
      ? '取消收藏'
      : '收藏笔记';
    filterLeaves();
  });
}

if (searchInput) {
  searchInput.addEventListener('input', filterLeaves);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    filterLeaves();
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => handleTabSwitch(button.dataset.tab));
});

if (generateOutput) {
  generateOutput.addEventListener('click', () => {
    const title = noteTitle.textContent.trim();
    updateOutputPreview(title);
  });
}

if (copyOutput) {
  copyOutput.addEventListener('click', async () => {
    const text = outputPreview.textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyOutput.textContent = '已复制';
      setTimeout(() => {
        copyOutput.textContent = '复制内容';
      }, 1200);
    } catch (error) {
      copyOutput.textContent = '复制失败';
    }
  });
}

if (shareOutput) {
  shareOutput.addEventListener('click', () => {
    shareOutput.textContent = '已生成链接';
    setTimeout(() => {
      shareOutput.textContent = '生成分享链接';
    }, 1200);
  });
}

// Default open first group and highlight first leaf.
if (treeGroups.length > 0) {
  treeGroups[0].classList.add('open');
  treeNodes[0].classList.add('active');
  updateBadgeCount(0);
}

if (getLeaves().length > 0) {
  getLeaves()[0].classList.add('active');
  const title = getLeaves()[0].textContent.trim();
  updateContent(title);
  updateActivity(title);
  updateOutputPreview(title);
}

filterLeaves();
}

if (treeLeaves.length > 0) {
  treeLeaves[0].classList.add('active');
}
