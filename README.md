# Cat Atlas

猫咪品种 3D 图鉴站点。

> 📊 Total: <kbd>**1**</kbd>

<a href="https://github.com/eternallycyf" title="eternallycyf">
  <img src="https://avatars.githubusercontent.com/u/63464198?v=4" width="50" />
</a>

# Cat Atlas

猫咪品种 3D 图鉴站点。无外部模型文件，使用程序化低模猫 + React Three Fiber 交互展厅。

## 快速开始

根目录 `node_modules` 若权限异常，请直接进入 `website`：

```bash
cd website
pnpm install
# pnpm 10 首次可能需：pnpm approve-builds（允许 esbuild）
pnpm dev
```

或在仓库根目录：

```bash
pnpm run dev:web
```

浏览器打开 http://localhost:5173

## 功能

- **品种切换**：布偶 / 金渐层 / 英短蓝猫 / 暹罗 / 美短虎斑 / 缅因 / 波斯 / 孟加拉
- **毛色定制**：主色 + 重点色（交互参考 [T 恤设计](../react-course-code/react-3d-tshirt-design)）
- **3D 展厅**：OrbitControls、环境光、地面网格（视觉参考 [SU7 Three.js 复刻](https://juejin.cn/post/7515378780371189786)）

## 技术栈

- React 18
- Vite
- Three.js
- `@react-three/fiber` + `@react-three/drei`
- GSAP（面板切换动效）

## 目录

```
website/          # 3D 图鉴站点（主应用）
src/              # 可复用类型 / 品种数据导出（供文档包）
```
