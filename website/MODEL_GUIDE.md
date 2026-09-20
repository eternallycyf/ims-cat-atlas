# 添加写实猫咪 3D 模型

当前项目已支持加载 GLB 格式的 3D 猫咪模型。默认使用程序化生成的猫咪，如果你想要更写实的效果，可以下载外部模型。

## 推荐模型来源

### Sketchfab（推荐）

以下模型经过筛选，符合以下标准：
- ✅ 写实风格
- ✅ CC Attribution 许可证（免费使用，需注明作者）
- ✅ 可下载 GLB 格式
- ✅ 高面数（90K+ 面片）

1. **Bengal Cat**（孟加拉豹猫）
   - 链接：https://sketchfab.com/3d-models/bengal-cat-6d82596b5db94f7b9093814a4a88caa9
   - 面数：98,498
   - 作者：krishbharal
   - 特点：高细节，适合展示

2. **Realistic Siamese Cat 3D Model**（写实暹罗猫）
   - 链接：https://sketchfab.com/3d-models/realistic-siamese-cat-3d-model-3da649dd14df43f4966b3a38577262fc
   - 面数：93,034
   - 特点：专门针对暹罗猫品种

### 下载步骤

1. 访问上述链接
2. 点击 "Download" 按钮（需要免费注册 Sketchfab 账号）
3. 选择 **glTF 格式**（包含 .glb 文件）
4. 解压下载的文件

### 放置模型

将下载的 `.glb` 文件重命名为 `cat.glb`，放置到：

```
website/public/models/cat.glb
```

## 技术说明

### 已实现的功能

1. **GLB 模型加载**
   - 使用 GLTFLoader + DRACO 压缩支持
   - 自动应用毛色纹理
   - 支持阴影投射和接收

2. **程序化纹理系统**
   - 根据品种自动生成毛色纹理（Canvas API）
   - 支持 5 种花纹模式：solid、pointed、bicolor、tabby、shaded
   - 法线贴图模拟毛发质感

3. **真实感渲染**
   - 环境贴图（park preset）提供真实反射
   - PBR 材质（物理基础渲染）
   - 后处理效果：Bloom（泛光）、Vignette（暗角）
   - 多光源布局：主光、补光、环境光、点光源

4. **品种数据**
   - 8 个品种：布偶猫、金渐层、英短蓝猫、暹罗猫、美短虎斑、缅因猫、波斯猫、孟加拉豹猫
   - 每个品种有独特的体型参数（fluff、earSize、faceRoundness）
   - 8 种毛色预设

### 文件结构

```
website/
├── public/
│   └── models/
│       └── cat.glb          # 放置下载的模型
├── src/
│   ├── components/
│   │   ├── CatModel.tsx     # 模型加载（GLB + 程序化）
│   │   └── CatScene.tsx     # 场景渲染（灯光、环境、后处理）
│   ├── data/
│   │   └── breeds.ts        # 品种数据
│   └── App.tsx              # 主界面
```

### 自定义模型要求

如果你使用其他模型，需要满足：
- 格式：GLB 或 glTF 2.0
- 建议面数：50K-200K（移动端建议 50K 以下）
- 材质：MeshStandardMaterial 或 MeshPhysicalMaterial
- 尺寸：模型应该大致在 2x2x2 单位范围内

### 性能优化

如果遇到性能问题，可以：
1. 使用面数更低的模型
2. 降低阴影贴图分辨率（CatScene.tsx 中的 `shadow-mapSize`）
3. 禁用后处理效果（删除 EffectComposer 部分）
4. 降低 DPR（CatScene.tsx 中的 `dpr` 参数）

## 许可证

- 代码：MIT
- 模型：请遵守各自模型的许可证（推荐 CC Attribution）
