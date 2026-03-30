# TaskFlow

> 专业、简洁的个人任务管理系统

## 功能特性

- **看板视图** — Todo / In Progress / Done 三列布局
- **优先级管理** — 高 / 中 / 低三级优先级，颜色直观区分
- **截止日期** — 支持设置截止日期，自动标记逾期任务
- **标签系统** — 为任务添加自定义标签
- **搜索过滤** — 实时搜索 + 按优先级过滤
- **数据持久化** — 数据存储在浏览器 LocalStorage，无需后端
- **深色主题** — 专业深色 UI，护眼舒适

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 构建部署

```bash
npm run build
# 产物在 dist/ 目录，直接部署到任意静态服务器
```

## 技术栈

- React 18 + TypeScript
- Vite 5
- Lucide React (图标)
- LocalStorage (数据持久化)
