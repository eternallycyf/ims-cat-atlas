---
title: 指南
nav:
  title: 指南
  order: 0
---

# Cat Atlas 指南

## 是什么

一个猫咪品种 3D 图鉴 npm 包，提供：

- **`CatAtlas`** — 3D 猫咪查看器组件（React Three Fiber 程序化渲染）
- **`BREEDS`** — 8 个猫咪品种数据（布偶、金渐层、英短、暹罗、美短、缅因、波斯、孟加拉）
- **`FUR_PRESETS`** — 8 个毛色预设

## 安装

```bash
npm install ims-cat-atlas
```

### Peer Dependencies

3D 组件需要以下 peer dependencies：

```bash
npm install three @react-three/fiber @react-three/drei
```

## 使用

### 3D 查看器

```tsx
import { CatAtlas, BREEDS } from 'ims-cat-atlas';

export default () => {
  return (
    <div style={{ height: 500 }}>
      <CatAtlas breed={BREEDS[0]} autoRotate />
    </div>
  );
};
```

### 品种数据

```tsx
import { BREEDS, FUR_PRESETS } from 'ims-cat-atlas';
import type { Breed } from 'ims-cat-atlas';

const ragdoll: Breed = BREEDS.find((b) => b.id === 'ragdoll');
```

## 品种列表

| 品种 | 英文名 | 毛色模式 | 产地 |
| --- | --- | --- | --- |
| 布偶猫 | Ragdoll | pointed | 美国 |
| 金渐层 | Golden Shaded | shaded | 英国 |
| 英短蓝猫 | British Shorthair | solid | 英国 |
| 暹罗猫 | Siamese | pointed | 泰国 |
| 美短虎斑 | American Shorthair | tabby | 美国 |
| 缅因猫 | Maine Coon | tabby | 美国 |
| 波斯猫 | Persian | solid | 伊朗 |
| 孟加拉豹猫 | Bengal | tabby | 美国 |

## 全屏 3D 体验

运行 `pnpm run dev:web` 进入全屏 3D 体验（目录 `website/`），包含完整的品种切换、毛色定制面板。
