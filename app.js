const treeGroups = document.querySelectorAll('.tree__group');
const treeNodes = document.querySelectorAll('.tree__node');
const noteTitle = document.getElementById('note-title');
const noteMeta = document.getElementById('note-meta');
const noteSummary = document.getElementById('note-summary');
const noteTags = document.getElementById('note-tags');
const exportButton = document.getElementById('export-button');
const newNoteButton = document.getElementById('new-note-button');
const searchInput = document.querySelector('.search input');
const filterButtons = document.querySelectorAll('.filter');
const outputPreview = document.getElementById('output-preview');
const copyOutput = document.getElementById('copy-output');
const shareOutput = document.getElementById('share-output');
const generateOutput = document.getElementById('generate-output');
const toggleFavoriteButton = document.getElementById('toggle-favorite');
const noteOutline = document.getElementById('note-outline');
const noteDetails = document.getElementById('note-details');
const noteRelations = document.getElementById('note-relations');
const tabButtons = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.note__panel');
const activityLog = document.getElementById('activity-log');

const groupLabels = ['产品规划', '设计素材', '会议纪要'];

const noteData = {
  '需求梳理.docx': {
    summary: '聚焦用户需求与业务目标，整理优先级并拆解为阶段性里程碑。',
    tags: ['#需求', '#优先级', '#规划'],
    outline: ['梳理核心问题与目标。', '定义关键里程碑与验收标准。', '对齐跨团队协作计划。'],
    details: '记录核心需求与业务目标，形成可执行的阶段任务列表。',
    relations: ['竞品拆解.docx', '用户画像.docx', '版本节奏.docx'],
    updated: '2024-02-08 09:20',
    favorite: true,
    shared: true,
  },
  '版本节奏.docx': {
    summary: '制定季度版本节奏，明确每个迭代的目标与交付时间。',
    tags: ['#节奏', '#里程碑', '#计划'],
    outline: ['确定季度目标。', '拆分版本交付节奏。', '同步外部依赖节点。'],
    details: '梳理各版本的需求范围与交付计划，确保节奏稳定。',
    relations: ['需求梳理.docx', '关键里程碑.docx'],
    updated: '2024-02-07 16:40',
    favorite: false,
    shared: false,
  },
  '用户画像.docx': {
    summary: '总结关键用户画像与行为路径，支撑功能决策。',
    tags: ['#画像', '#用户', '#洞察'],
    outline: ['整理核心人群画像。', '提炼关键使用场景。', '沉淀洞察结论。'],
    details: '补充画像描述与行为路径，用于指导功能优先级。',
    relations: ['需求梳理.docx', '访谈整理.docx'],
    updated: '2024-02-06 11:15',
    favorite: false,
    shared: true,
  },
  '竞品拆解.docx': {
    summary: '拆解竞品信息架构与交互亮点，提炼可落地的改进点。',
    tags: ['#竞品', '#研究', '#灵感'],
    outline: ['拆解核心流程。', '收集差异化亮点。', '形成改进建议。'],
    details: '对比竞品功能与体验，输出可参考的交互策略。',
    relations: ['需求梳理.docx', '动效灵感.docx'],
    updated: '2024-02-05 10:30',
    favorite: true,
    shared: false,
  },
  '关键里程碑.docx': {
    summary: '定义项目核心里程碑与验收标准，确保阶段成果可衡量。',
    tags: ['#里程碑', '#目标', '#验收'],
    outline: ['定义阶段目标。', '细化验收标准。', '确定评审节点。'],
    details: '整合各阶段交付成果与验收条件，保证目标清晰。',
    relations: ['版本节奏.docx'],
    updated: '2024-02-06 09:40',
    favorite: false,
    shared: false,
  },
  '色彩规范.docx': {
    summary: '整理品牌色体系与可访问性对比度标准，确保一致性。',
    tags: ['#设计', '#色彩', '#规范'],
    outline: ['整理品牌色板。', '检查可访问性。', '同步组件库。'],
    details: '提供主辅色与对比度建议，保证视觉一致。',
    relations: ['组件库存.docx'],
    updated: '2024-02-03 14:10',
    favorite: false,
    shared: true,
  },
  '动效灵感.docx': {
    summary: '收集动效参考与实现方式，形成轻量动效指引。',
    tags: ['#动效', '#交互', '#灵感'],
    outline: ['搜集案例。', '筛选合适风格。', '整理落地方式。'],
    details: '沉淀动效语言，保证动效一致与克制。',
    relations: ['竞品拆解.docx'],
    updated: '2024-02-04 18:05',
    favorite: false,
    shared: false,
  },
  '组件库存.docx': {
    summary: '罗列核心组件库存，明确复用方式与迭代计划。',
    tags: ['#组件', '#规范', '#复用'],
    outline: ['盘点现有组件。', '确定复用策略。', '计划下一版本。'],
    details: '补充组件清单与复用规范，保持一致性。',
    relations: ['色彩规范.docx'],
    updated: '2024-02-02 15:55',
    favorite: false,
    shared: true,
  },
  '周会纪要.docx': {
    summary: '记录周会关键结论与行动项，确保跨团队同步。',
    tags: ['#会议', '#同步', '#行动'],
    outline: ['整理会议结论。', '明确责任人。', '同步风险事项。'],
    details: '提炼会议结论与行动项，方便跟进。',
    relations: ['行动清单.docx'],
    updated: '2024-02-08 10:05',
    favorite: true,
    shared: true,
  },
  '评审复盘.docx': {
    summary: '总结评审问题与复盘结论，输出优化方案。',
    tags: ['#评审', '#复盘', '#改进'],
    outline: ['整理问题清单。', '归纳改进建议。', '落实后续计划。'],
    details: '记录评审发现的问题与改进方向。',
    relations: ['行动清单.docx'],
    updated: '2024-02-07 17:25',
    favorite: false,
    shared: false,
  },
  '访谈整理.docx': {
    summary: '整理访谈要点与情绪轨迹，提炼用户机会点。',
    tags: ['#访谈', '#用户', '#机会'],
    outline: ['整理访谈重点。', '提炼机会点。', '输出洞察结论。'],
    details: '对访谈内容进行归纳，形成机会点清单。',
    relations: ['用户画像.docx'],
    updated: '2024-02-06 12:35',
    favorite: false,
    shared: true,
  },
  '行动清单.docx': {
    summary: '罗列待办事项与责任人，跟踪闭环进展。',
    tags: ['#行动', '#责任', '#闭环'],
    outline: ['确认任务清单。', '标记责任人。', '设置跟踪节点。'],
    details: '确保每个事项都有负责人并可追踪进展。',
    relations: ['周会纪要.docx'],
    updated: '2024-02-08 11:30',
    favorite: false,
    shared: true,
  },
};

let activeFilter = 'all';

const updateContent = (title) => {
  const data = noteData[title];
  if (!data) return;
  noteTitle.textContent = title;
  noteSummary.textContent = data.summary;
  noteTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
  noteOutline.innerHTML = data.outline.map((item) => `<li>${item}</li>`).join('');
  noteDetails.textContent = data.details;
  noteRelations.innerHTML = data.relations
    .map((item) => `<span>${item}</span>`)
    .join('');
  toggleFavoriteButton.textContent = data.favorite ? '取消收藏' : '收藏笔记';
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
