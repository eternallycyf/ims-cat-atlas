---
hero:
  title: Cat Atlas
  description: 猫咪品种 3D 图鉴 · React Three Fiber 程序化渲染 · 8 个品种 / 毛色定制 / 可交互
  actions:
    - text: 组件演示
      link: /components/cat-atlas
    - text: 使用指南
      link: /guide
    - text: Github
      link: https://github.com/eternallycyf/ims-cat-atlas/
      openExternal: true
---

## 快速开始

安装依赖：

```bash
npm install ims-cat-atlas
```

使用 3D 查看器：

```tsx
import { CatAtlas, BREEDS } from 'ims-cat-atlas';

export default () => <CatAtlas breed={BREEDS[0]} />;
```

或使用品种数据：

```tsx
import { BREEDS, FUR_PRESETS } from 'ims-cat-atlas';

console.log(BREEDS); // 8 个猫咪品种数据
console.log(FUR_PRESETS); // 8 个毛色预设
```
