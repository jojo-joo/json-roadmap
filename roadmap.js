(function (global) {
  'use strict';

  var STYLE_ID = 'roadmap-style';

  var CSS = [
    '*{margin:0;padding:0;box-sizing:border-box}',
    ':root{--rm-completed:#059669;--rm-progress:#d97706;--rm-badge-text:#ffffff}',

    "html[data-theme='dark']{",
    '--rm-bg:#0a0f1c;',
    '--rm-panel-bg:#1e2532;',
    '--rm-surface:#2a3441;',
    '--rm-surface-2:#374151;',
    '--rm-head-bg:linear-gradient(135deg,#334155 0%,#1e293b 100%);',
    '--rm-border:#475569;',
    '--rm-text:#f1f5f9;',
    '--rm-text-dim:#cbd5e1;',
    '--rm-text-faint:#94a3b8;',
    '--rm-link:#60a5fa;',
    '--rm-link-hover:#93c5fd;',
    '--rm-shadow:0 4px 15px rgba(0,0,0,.2);',
    '--rm-track:rgba(255,255,255,.14);',
    '--rm-info-metrics:#34d399;',
    '--rm-info-risks:#f87171;',
    '--rm-info-deps:#a78bfa;',
    '--rm-error:#f87171;',
    '--rm-error-bg:rgba(248,113,113,.12);',
    '}',

    "html[data-theme='light']{",
    '--rm-bg:#ffffff;',
    '--rm-panel-bg:#ffffff;',
    '--rm-surface:#ffffff;',
    '--rm-surface-2:#f1f5f9;',
    '--rm-head-bg:#f8fafc;',
    '--rm-border:#e2e8f0;',
    '--rm-text:#0f172a;',
    '--rm-text-dim:#334155;',
    '--rm-text-faint:#64748b;',
    '--rm-link:#3b82f6;',
    '--rm-link-hover:#dc2626;',
    '--rm-shadow:0 1px 3px 0 rgba(0,0,0,.1);',
    '--rm-track:rgba(0,0,0,.09);',
    '--rm-info-metrics:#059669;',
    '--rm-info-risks:#dc2626;',
    '--rm-info-deps:#64748b;',
    '--rm-error:#dc2626;',
    '--rm-error-bg:rgba(220,38,38,.08);',
    '}',

    'body{font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;',
    'background:var(--rm-bg);color:var(--rm-text);line-height:1.4;font-size:14px}',
    '.container{max-width:95vw;margin:0 auto;padding:15px}',

    '.group-section{margin-bottom:40px;background:var(--rm-panel-bg);border-radius:8px;',
    'border:1px solid var(--rm-border);overflow:hidden;box-shadow:var(--rm-shadow)}',
    '.group-header{background:var(--rm-head-bg);padding:15px 20px;display:flex;align-items:center;',
    'border-bottom:2px solid var(--rm-border)}',
    '.group-title{font-size:1.3rem;font-weight:600;color:var(--rm-text);flex:1}',
    '.project-count{background:var(--rm-surface-2);color:var(--rm-text);padding:4px 10px;',
    'border-radius:12px;font-size:.8rem;font-weight:500;border:1px solid var(--rm-border)}',

    '.group-table-container{overflow-x:auto;background:var(--rm-surface)}',
    '.projects-table{width:100%;border-collapse:collapse;min-width:1200px}',
    '.projects-table th{background:var(--rm-surface-2);color:var(--rm-text);padding:12px 8px;',
    'text-align:center;font-weight:600;font-size:.85rem;border-right:1px solid var(--rm-border);',
    'border-bottom:1px solid var(--rm-border);position:sticky;top:0;z-index:10}',
    '.project-header{width:280px;min-width:280px;text-align:left!important;position:sticky;left:0;',
    'z-index:11!important;background:var(--rm-surface-2)!important;border-right:2px solid var(--rm-border)!important}',
    '.column-header{width:220px;min-width:220px}',

    '.project-row{border-bottom:2px solid var(--rm-border)}',
    '.project-info{width:280px;min-width:280px;padding:15px 12px;background:var(--rm-surface-2);',
    'border-right:2px solid var(--rm-border);position:sticky;left:0;z-index:1}',
    '.project-name{font-weight:600;color:var(--rm-text);font-size:.95rem;margin-bottom:8px;line-height:1.3}',
    '.project-link{color:var(--rm-link);text-decoration:none}',
    '.project-link:hover{color:var(--rm-link-hover)}',
    '.issue-arrow{opacity:.7;margin-left:4px;font-size:.8em}',
    '.project-link:hover .issue-arrow{opacity:1}',
    '.project-meta{font-size:.75rem;color:var(--rm-text-faint);line-height:1.4}',
    '.project-meta strong{color:var(--rm-text-dim)}',

    '.column-cell{width:220px;min-width:220px;padding:12px 8px;vertical-align:top;',
    'border-left:3px solid transparent;border-right:1px solid var(--rm-border);',
    'position:relative;background:var(--rm-surface)}',
    '.column-cell.empty{opacity:.6}',
    '.column-cell:not(.empty)::before{',
    'content:"";position:absolute;left:-3px;top:6px;bottom:6px;width:3px;border-radius:2px;',
    'background:linear-gradient(to bottom,var(--rm-fill-color,transparent) var(--rm-fill,0%),',
    'var(--rm-track) var(--rm-fill,0%))}',

    '.status-badge{display:inline-block;padding:3px 7px;border-radius:4px;font-size:.7rem;',
    'font-weight:600;margin-bottom:6px;white-space:nowrap;border:1px solid transparent}',
    '.status-badge.completed{background:var(--rm-completed);color:var(--rm-badge-text)}',
    '.status-badge.in-progress{background:var(--rm-progress);color:var(--rm-badge-text)}',
    '.status-badge.planned{background:var(--rm-track);color:var(--rm-text)}',
    '.empty-badge{display:inline-block;padding:3px 7px;border-radius:4px;font-size:.7rem;',
    'font-weight:600;white-space:nowrap;border:1px solid var(--rm-border);',
    'background:var(--rm-surface-2);color:var(--rm-text-faint)}',

    '.cell-content{font-size:.8rem;color:var(--rm-text-dim)}',
    '.cell-description{margin-bottom:8px;line-height:1.4;font-weight:500;color:var(--rm-text-dim)}',
    '.cell-details{font-size:.75rem;color:var(--rm-text-faint);margin-bottom:8px}',
    '.detail-item{margin-bottom:3px;line-height:1.3}',
    '.extra-info{margin-top:8px;padding-top:8px;border-top:1px solid var(--rm-border)}',
    '.extra-info>div{margin-bottom:6px;font-size:.7rem}',
    '.metrics-info{color:var(--rm-info-metrics)}',
    '.risks-info{color:var(--rm-info-risks)}',
    '.objectives-info{color:var(--rm-link)}',
    '.dependencies-info{color:var(--rm-info-deps)}',

    '.json-error{margin:15px;padding:14px 16px;border-radius:8px;',
    'border:1px solid var(--rm-error);background:var(--rm-error-bg);color:var(--rm-error);',
    'font-size:.85rem;line-height:1.6;white-space:pre-wrap;word-break:break-word}',

    '@media (max-width:1400px){',
    '.container{max-width:100vw;padding:10px}',
    '.projects-table{min-width:1000px}',
    '.column-header,.column-cell{width:180px;min-width:180px}',
    '.project-header,.project-info{width:240px;min-width:240px}',
    '}',
    '@media (max-width:768px){',
    '.projects-table{min-width:800px}',
    '.column-header,.column-cell{width:150px;min-width:150px;font-size:.75rem}',
    '.project-header,.project-info{width:200px;min-width:200px}',
    '}',

    '.group-table-container::-webkit-scrollbar{height:8px}',
    '.group-table-container::-webkit-scrollbar-track{background:var(--rm-surface-2)}',
    '.group-table-container::-webkit-scrollbar-thumb{background:var(--rm-border);border-radius:4px}',
    '.group-table-container::-webkit-scrollbar-thumb:hover{background:var(--rm-text-faint)}',
  ].join('');

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };

  function esc(t) {
    return String(t === undefined || t === null ? '' : t).replace(/[&<>"'/]/g, function (c) {
      return ESCAPES[c];
    });
  }

  function safeUrl(u) {
    var s = String(u).trim();
    return /^(javascript|data|vbscript):/i.test(s) ? '#' : s;
  }

  function clampPct(n) {
    return Math.max(0, Math.min(100, Math.round(n * 10) / 10));
  }

  function progressFill(p) {
    var s = String(p === undefined || p === null ? '' : p).trim();
    var pct = s.match(/^(\d+(?:\.\d+)?)\s*%$/);
    if (pct) return clampPct(parseFloat(pct[1]));
    var frac = s.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
    if (frac && parseFloat(frac[2]) > 0) {
      return clampPct((parseFloat(frac[1]) / parseFloat(frac[2])) * 100);
    }
    return 0;
  }

  var STATE_COLOR = {
    completed: 'var(--rm-completed)',
    'in-progress': 'var(--rm-progress)',
    planned: 'transparent',
  };

  var LANGS = {
    en: {
      completed: 'Completed',
      'in-progress': 'In Progress',
      planned: 'Planned',
      noInfo: 'No info',
      project: 'Project',
      responsible: 'Responsible:',
      metrics: 'Metrics:',
      risks: 'Risks:',
      objectives: 'Objectives:',
      dependencies: 'Dependencies:',
      unit: 'projects',
      unitOne: 'project',
    },
    chs: {
      completed: '已完成',
      'in-progress': '进行中',
      planned: '计划中',
      noInfo: '暂无信息',
      project: '项目',
      responsible: '负责人:',
      metrics: '指标:',
      risks: '风险:',
      objectives: '目标:',
      dependencies: '依赖:',
      unit: '个项目',
      unitOne: '个项目',
    },
    cht: {
      completed: '已完成',
      'in-progress': '進行中',
      planned: '計劃中',
      noInfo: '暫無資訊',
      project: '項目',
      responsible: '負責人:',
      metrics: '指標:',
      risks: '風險:',
      objectives: '目標:',
      dependencies: '依賴:',
      unit: '個項目',
      unitOne: '個項目',
    },
    ja: {
      completed: '完了',
      'in-progress': '進行中',
      planned: '計画中',
      noInfo: '情報なし',
      project: 'プロジェクト',
      responsible: '担当者:',
      metrics: '指標:',
      risks: 'リスク:',
      objectives: '目標:',
      dependencies: '依存関係:',
      unit: '件のプロジェクト',
      unitOne: '件のプロジェクト',
    },
    ko: {
      completed: '완료',
      'in-progress': '진행 중',
      planned: '계획 중',
      noInfo: '정보 없음',
      project: '프로젝트',
      responsible: '담당자:',
      metrics: '지표:',
      risks: '리스크:',
      objectives: '목표:',
      dependencies: '의존성:',
      unit: '개의 프로젝트',
      unitOne: '개의 프로젝트',
    },
  };

  function stateOf(fill) {
    if (fill >= 100) return 'completed';
    if (fill > 0) return 'in-progress';
    return 'planned';
  }

  function resolveEl(target) {
    return typeof target === 'string' ? global.document.querySelector(target) : target;
  }

  function isElementLike(x) {
    return !!x && typeof x === 'object' && typeof x.textContent === 'string';
  }

  function readJSON(source) {
    if (source && typeof source === 'object' && !isElementLike(source)) return source;

    var text;
    if (isElementLike(source)) {
      text = source.textContent;
    } else if (typeof source === 'string') {
      var el = null;
      try {
        el = global.document.querySelector(source);
      } catch (e) {
        el = null;
      }
      text = el ? el.textContent : source;
    } else {
      throw new Error('Roadmap.readJSON: no JSON source was provided');
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Roadmap.readJSON: invalid JSON: ' + e.message);
    }
  }

  function toData(data) {
    if (typeof data === 'string' || isElementLike(data)) return readJSON(data);
    return data || {};
  }

  function makeView(showInternal, lang) {
    return {
      showInternal: showInternal,
      t: LANGS[lang] || LANGS.en,
      items: function (list) {
        return (list || [])
          .filter(function (e) {
            return showInternal || typeof e === 'string' || !e.internal;
          })
          .map(function (e) {
            return typeof e === 'string' ? e : e.text;
          })
          .filter(Boolean);
      },
    };
  }

  function infoList(label, list, cls) {
    var body = list
      .map(function (t) {
        return '&bull; ' + esc(t);
      })
      .join('<br>');
    return '<div class="' + cls + '"><strong>' + esc(label) + '</strong><br>' + body + '</div>';
  }

  function renderCell(cell, view) {
    if (!cell) {
      return '<td class="column-cell empty"><div class="empty-badge">' + esc(view.t.noInfo) + '</div></td>';
    }

    var details = view.items(cell.details);
    var html = details.length
      ? '<div class="cell-details">' +
        details
          .map(function (t) {
            return '<div class="detail-item">&bull; ' + esc(t) + '</div>';
          })
          .join('') +
        '</div>'
      : '';

    var extra = [];
    if (cell.metrics) extra.push(infoList(view.t.metrics, view.items(cell.metrics), 'metrics-info'));
    if (cell.risks) extra.push(infoList(view.t.risks, view.items(cell.risks), 'risks-info'));
    if (cell.objectives) extra.push(infoList(view.t.objectives, view.items(cell.objectives), 'objectives-info'));
    if (cell.dependencies) extra.push(infoList(view.t.dependencies, view.items(cell.dependencies), 'dependencies-info'));
    if (extra.length) html += '<div class="extra-info">' + extra.join('') + '</div>';

    var fill = progressFill(cell.progress);
    var state = stateOf(fill);

    return (
      '<td class="column-cell" style="--rm-fill:' + fill + '%;--rm-fill-color:' + STATE_COLOR[state] + '">' +
      '<div class="status-badge ' + state + '">' + esc(view.t[state]) + '</div>' +
      '<div class="cell-content">' +
      '<div class="cell-description">' + esc(cell.description || '') + '</div>' +
      html +
      '</div></td>'
    );
  }

  function renderProject(project, columns, view) {
    var nameHTML = project.issue
      ? '<a href="' + esc(safeUrl(project.issue)) + '" target="_blank" class="project-link">' +
        esc(project.name) + ' <span class="issue-arrow">&#8599;</span></a>'
      : esc(project.name);

    var infoHTML = project.responsible
      ? '<strong>' + esc(view.t.responsible) + '</strong> ' + esc(project.responsible)
      : '';

    var cells = columns
      .map(function (col) {
        return renderCell(project.cells ? project.cells[col] : undefined, view);
      })
      .join('');

    return (
      '<tr class="project-row">' +
      '<td class="project-info">' +
      '<div class="project-name">' + nameHTML + '</div>' +
      '<div class="project-meta">' + infoHTML + '</div>' +
      '</td>' + cells + '</tr>'
    );
  }

  function renderTable(data, columns, view) {
    var list = data.projects.filter(function (p) {
      return view.showInternal || !p.internal;
    });
    if (!list.length) return '';

    var headerHTML = columns
      .map(function (col) {
        return '<th class="column-header">' + esc(col) + '</th>';
      })
      .join('');

    var bodyHTML = list
      .map(function (p) {
        return renderProject(p, columns, view);
      })
      .join('');

    var count = list.length;
    var unit = count === 1 ? view.t.unitOne : view.t.unit;

    var titleHTML = data.title
      ? '<div class="group-header">' +
        '<h2 class="group-title">' + esc(data.title) + '</h2>' +
        '<span class="project-count">' + count + ' ' + esc(unit) + '</span>' +
        '</div>'
      : '';

    return (
      '<div class="group-section">' +
      titleHTML +
      '<div class="group-table-container">' +
      '<table class="projects-table">' +
      '<thead><tr><th class="project-header">' + esc(view.t.project) + '</th>' + headerHTML + '</tr></thead>' +
      '<tbody>' + bodyHTML + '</tbody>' +
      '</table>' +
      '</div></div>'
    );
  }

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function show(v) {
    var s;
    try {
      s = JSON.stringify(v);
    } catch (e) {
      s = String(v);
    }
    if (s === undefined) s = String(v);
    return s.length > 120 ? s.slice(0, 120) + '...' : s;
  }

  function validate(d) {
    if (!d || typeof d !== 'object' || !Object.keys(d).length) {
      throw new Error('empty data: expected an object holding "columns" and "projects"');
    }
    if (!isArray(d.columns) || !d.columns.length) {
      throw new Error(
        '"columns" is missing or is not an array; it needs at least one column, for example:\n"columns": ["2026 Q1", "2026 Q2"]'
      );
    }
    if (!isArray(d.projects) || !d.projects.length) {
      throw new Error(
        '"projects" is missing or is not an array; it needs at least one entry, for example:\n"projects": [ { "name": "Project name", "cells": { "2026 Q1": { ... } } } ]'
      );
    }
    d.projects.forEach(function (p, i) {
      if (!p || typeof p !== 'object') {
        throw new Error('projects[' + i + '] is not an object, got: ' + show(p));
      }
      if (isArray(p.projects)) {
        throw new Error(
          'projects[' + i + '] must not nest another "projects" array: put the columns of a project straight into "cells". Got: ' +
            show(p)
        );
      }
    });
  }

  function buildTable(data, options) {
    options = options || {};
    var d = toData(data);
    validate(d);
    var view = makeView(!!options.showInternal, options.language || d.language);
    return renderTable(d, d.columns, view);
  }

  function injectStyle() {
    var doc = global.document;
    if (doc.getElementById(STYLE_ID)) return;
    var style = doc.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    doc.head.appendChild(style);
  }

  function setTheme(theme) {
    var name = theme === 'light' ? 'light' : 'dark';
    global.document.documentElement.setAttribute('data-theme', name);
    return name;
  }

  var DATA_HINT =
    'Invalid data\n' +
    'Check the JSON syntax first: 1) every key and every string needs double quotes; ' +
    '2) no comma after the last item; 3) no comments.\n\n';

  function mount(target, data, options) {
    options = options || {};
    var doc = global.document;

    var host = typeof target === 'string' ? doc.querySelector(target) : target;
    if (!host) throw new Error('Roadmap.mount: container not found: ' + target);

    injectStyle();
    host.classList.add('container');

    var d = null;
    try {
      d = toData(data);
      setTheme(options.theme || d.theme);
      var html = buildTable(d, {
        showInternal: !!options.showInternal,
        language: options.language || d.language,
      });
      host.innerHTML =
        html ||
        '<div class="json-error">' +
          esc(
            DATA_HINT +
              'Nothing to render: the data holds no renderable project, or every project was filtered out by showInternal: false.'
          ) +
          '</div>';
    } catch (err) {
      if (global.console && global.console.error) global.console.error(err);
      setTheme(options.theme || (d && d.theme));
      host.innerHTML = '<div class="json-error">' + esc(DATA_HINT + err.message) + '</div>';
    }

    return host;
  }

  global.Roadmap = {
    version: '1.0.0',
    css: CSS,
    langs: LANGS,
    mount: mount,
    render: buildTable,
    readJSON: readJSON,
    setTheme: setTheme,
    getTheme: function () {
      return global.document.documentElement.getAttribute('data-theme');
    },
  };
})(window);
