# Cat Atlas Website

猫咪品种 3D 图鉴（程序化低模猫 + React Three Fiber）。

## 开发

```bash
cd website
pnpm install

# pnpm 10 若提示 Ignored build scripts: esbuild，手动补二进制：
node node_modules/.pnpm/esbuild@*/node_modules/esbuild/install.js

pnpm dev
```

浏览器打开 http://127.0.0.1:5173

## 构建

```bash
pnpm build
pnpm preview
```

## 功能

- 左侧切换品种：布偶、金渐层、英短、暹罗、美短、缅因、波斯、孟加拉
- 右侧调节主毛色 / 重点色（对标 T 恤换色面板）
- OrbitControls 旋转缩放 + 展厅光照 / 地面网格（对标 SU7）
- 无外部 GLB：几何体拼装的可换材质猫模型

## 参考

- https://juejin.cn/post/7515378780371189786
- https://juejin.cn/post/7352797634556706831
- `../react-course-code/react-3d-tshirt-design`
