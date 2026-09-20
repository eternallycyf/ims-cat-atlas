module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    eqeqeq: 'warn',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
  overrides: [
    {
      files: ['src/components/CatAtlas/**/*.tsx'],
      rules: {
        'react/no-unknown-property': [
          'error',
          {
            ignore: [
              'position',
              'rotation',
              'scale',
              'args',
              'material',
              'attach',
              'castShadow',
              'receiveShadow',
              'intensity',
              'groundColor',
              'angle',
              'penumbra',
              'roughness',
              'metalness',
              'shadow-mapSize',
              'shadow-bias',
            ],
          },
        ],
      },
    },
  ],
};
