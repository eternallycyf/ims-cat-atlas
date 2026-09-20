---
title: CatAtlas
description: 3D 猫咪品种查看器
toc: content
group:
  title: 3D 组件
  order: 0
demo:
  cols: 1
---

## CatAtlas

3D 猫咪品种查看器，支持 8 个品种的 procedural 低模渲染，可拖拽旋转、滚轮缩放。

### 使用

```tsx
import { CatAtlas, BREEDS } from 'ims-cat-atlas';

<CatAtlas breed={BREEDS[0]} autoRotate />
```

### API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| breed | `Breed` | - | 品种数据，从 `BREEDS` 中选取 |
| furColor | `string` | `breed.fur` | 主毛色 hex |
| accentColor | `string` | `breed.accent` | 辅助色 hex |
| autoRotate | `boolean` | `true` | 是否自动旋转 |

<code src='./demo/index.tsx'></code>
