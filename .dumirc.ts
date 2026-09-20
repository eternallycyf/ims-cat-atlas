import { defineConfig } from 'dumi';
import type { SiteThemeConfig } from 'dumi-theme-antd-style';
import { footer } from 'ims-template-config';
import path from 'path';
import { featuresZh } from './config/features';
import style from './docs/siteIndexStyle';
import { homepage, name as repo } from './package.json';

const basePath = `/${repo}/`;
const isProd = process.env.NODE_ENV === 'production';

const themeConfig: SiteThemeConfig = {
  name: 'Cat Atlas',
  github: homepage,
  logo: isProd ? '/images/origin.png' : `/${repo}/images/origin.png`,
  hero: {
    'zh-CN': {
      description: '猫咪品种 3D 图鉴 · React Three Fiber',
      actions: [
        {
          type: 'primary',
          text: '开始使用',
          link: '/guide',
        },
        {
          text: 'Github',
          link: homepage,
          openExternal: true,
        },
      ],
      features: featuresZh,
    },
    'en-US': {
      description: '3D cat breed atlas with React Three Fiber',
      actions: [
        {
          type: 'primary',
          text: 'Start',
          link: '/guide',
        },
      ],
    },
  },
  socialLinks: { github: homepage },
  apiHeader: {
    sourceUrl: `https://github.com/eternallycyf/ims-cat-atlas/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `https://github.com/eternallycyf/ims-cat-atlas/tree/master/src/components/{atomId}/index.md`,
    pkg: 'ims-cat-atlas',
    match: ['/ims-cat-atlas/src/component'],
  },
  footerConfig: {
    bottom: '2026',
    copyright: 'Made with ❤️ by eternallycyf · Cat Atlas',
    columns: footer(repo),
  },
};

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: isProd ? '/' : `/${repo}`,
  publicPath: isProd ? '/' : basePath,
  alias: {
    [repo]: path.join(__dirname, './src'),
    [repo + '/src']: path.join(__dirname, './src/*'),
  },
  favicons: [isProd ? '/images/favicon.ico' : `/${repo}/images/favicon.ico`],
  styles: [
    `html, body { background: transparent;  }
  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
    style,
  ],
  outputPath: 'docs-dist',
  devtool: isProd ? false : 'source-map',
  clickToComponent: {},
  ignoreMomentLocale: true,
  targets: { chrome: 79 },
  codeSplitting: { jsStrategy: 'granularChunks' },
  themeConfig,
  ssr: false,
  extraBabelPlugins: ['antd-style'],
  hash: true,
  mock: {},
  exportStatic: false,
  html2sketch: {},
  mfsu: {
    runtimePublicPath: true,
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: './src/components' }],
    entryFile: './src/index.ts',
    codeBlockMode: 'passive',
  },
});
