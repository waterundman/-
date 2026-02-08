const treeGroups = document.querySelectorAll('.tree__group');
const treeNodes = document.querySelectorAll('.tree__node');
const noteTitle = document.getElementById('note-title');
const noteMeta = document.getElementById('note-meta');
const noteSummary = document.getElementById('note-summary');
const noteTags = document.getElementById('note-tags');
const exportButton = document.getElementById('export-button');
const newNoteButton = document.getElementById('new-note-button');

const groupLabels = ['产品规划', '设计素材', '会议纪要'];

const noteData = {
  '需求梳理.docx': {
    summary: '聚焦用户需求与业务目标，整理优先级并拆解为阶段性里程碑。',
    tags: ['#需求', '#优先级', '#规划'],
  },
  '版本节奏.docx': {
    summary: '制定季度版本节奏，明确每个迭代的目标与交付时间。',
    tags: ['#节奏', '#里程碑', '#计划'],
  },
  '用户画像.docx': {
    summary: '总结关键用户画像与行为路径，支撑功能决策。',
    tags: ['#画像', '#用户', '#洞察'],
  },
  '竞品拆解.docx': {
    summary: '拆解竞品信息架构与交互亮点，提炼可落地的改进点。',
    tags: ['#竞品', '#研究', '#灵感'],
  },
  '关键里程碑.docx': {
    summary: '定义项目核心里程碑与验收标准，确保阶段成果可衡量。',
    tags: ['#里程碑', '#目标', '#验收'],
  },
  '色彩规范.docx': {
    summary: '整理品牌色体系与可访问性对比度标准，确保一致性。',
    tags: ['#设计', '#色彩', '#规范'],
  },
  '动效灵感.docx': {
    summary: '收集动效参考与实现方式，形成轻量动效指引。',
    tags: ['#动效', '#交互', '#灵感'],
  },
  '组件库存.docx': {
    summary: '罗列核心组件库存，明确复用方式与迭代计划。',
    tags: ['#组件', '#规范', '#复用'],
  },
  '周会纪要.docx': {
    summary: '记录周会关键结论与行动项，确保跨团队同步。',
    tags: ['#会议', '#同步', '#行动'],
  },
  '评审复盘.docx': {
    summary: '总结评审问题与复盘结论，输出优化方案。',
    tags: ['#评审', '#复盘', '#改进'],
  },
  '访谈整理.docx': {
    summary: '整理访谈要点与情绪轨迹，提炼用户机会点。',
    tags: ['#访谈', '#用户', '#机会'],
  },
  '行动清单.docx': {
    summary: '罗列待办事项与责任人，跟踪闭环进展。',
    tags: ['#行动', '#责任', '#闭环'],
  },
};

const updateContent = (title) => {
  const data = noteData[title];
  if (!data) return;
  noteTitle.textContent = title;
  noteSummary.textContent = data.summary;
  noteTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
};

const getLeaves = () => document.querySelectorAll('.tree__leaf');

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

getLeaves().forEach((leaf) => {
  leaf.addEventListener('click', () => {
    getLeaves().forEach((item) => item.classList.remove('active'));
    leaf.classList.add('active');

    const title = leaf.textContent.trim();
    const groupIndex = Array.from(treeGroups).findIndex((group) =>
      group.contains(leaf)
    );

    updateContent(title);
    noteMeta.textContent = `2024-02-08 · ${groupLabels[groupIndex]}`;
  });
});

const updateBadgeCount = (groupIndex) => {
  const badge = treeGroups[groupIndex].querySelector('.badge');
  const count = treeGroups[groupIndex].querySelectorAll('.tree__leaf').length;
  badge.textContent = count;
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
    });

    container.appendChild(button);
    updateBadgeCount(groupIndex);
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
  updateContent(getLeaves()[0].textContent.trim());
}
