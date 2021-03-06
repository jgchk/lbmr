module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-declaration'],
      },
    ],
    'order/properties-order': [
      [
        'content',
        {
          groupName: 'display',
          emptyLineBefore: 'threshold',
          properties: ['display', 'visibility', 'opacity'],
        },
        {
          groupName: 'position',
          emptyLineBefore: 'threshold',
          properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
        },
        {
          groupName: 'size',
          emptyLineBefore: 'threshold',
          properties: [
            'box-sizing',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
          ],
        },
        {
          groupName: 'margin',
          emptyLineBefore: 'threshold',
          properties: [
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
          ],
        },
        {
          groupName: 'padding',
          emptyLineBefore: 'threshold',
          properties: [
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
          ],
        },
        {
          groupName: 'flexbox',
          emptyLineBefore: 'threshold',
          properties: [
            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'flex-direction',
            'flex-flow',
            'flex-wrap',
            'align-content',
            'align-items',
            'align-self',
            'justify-content',
            'order',
          ],
        },
        {
          groupName: 'overflow',
          emptyLineBefore: 'threshold',
          properties: ['overflow', 'overflow-x', 'overflow-y'],
        },
        {
          groupName: 'float',
          emptyLineBefore: 'threshold',
          properties: ['float', 'clear'],
        },
        {
          groupName: 'font',
          emptyLineBefore: 'threshold',
          properties: [
            'color',
            'font',
            'font-style',
            'font-weight',
            'font-size',
            'line-height',
            'font-family',
            'font-variant',
            'text-align',
            'text-decoration',
            'text-shadow',
            'text-transform',
            'white-space',
            'vertical-align',
          ],
        },
        {
          groupName: 'background',
          emptyLineBefore: 'threshold',
          properties: [
            'background',
            'background-image',
            'background-position',
            'background-position-x',
            'background-position-y',
            'background-size',
            'background-repeat',
            'background-attachment',
            'background-origin',
            'background-clip',
            'background-color',
          ],
        },
        {
          groupName: 'border',
          emptyLineBefore: 'threshold',
          properties: [
            'border',
            'border-width',
            'border-style',
            'border-color',
            'border-top',
            'border-top-width',
            'border-top-style',
            'border-top-color',
            'border-right',
            'border-right-width',
            'border-right-style',
            'border-right-color',
            'border-bottom',
            'border-bottom-width',
            'border-bottom-style',
            'border-bottom-color',
            'border-left',
            'border-left-width',
            'border-left-style',
            'border-left-color',
            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
          ],
        },
        {
          groupName: 'decorations',
          emptyLineBefore: 'threshold',
          properties: ['outline', 'box-shadow'],
        },
        {
          groupName: 'list',
          emptyLineBefore: 'threshold',
          properties: ['list-style', 'list-style-position', 'list-style-type'],
        },
        {
          groupName: 'pointer',
          emptyLineBefore: 'threshold',
          properties: ['pointer-events', 'cursor'],
        },
        {
          groupName: 'transform',
          emptyLineBefore: 'threshold',
          properties: ['filter', 'transform', 'transform-origin'],
        },
        {
          groupName: 'transition',
          emptyLineBefore: 'threshold',
          properties: [
            'transition',
            'transition-property',
            'transition-duration',
            'transition-timing-function',
            'transition-delay',
            'animation',
          ],
        },
      ],
      {
        emptyLineMinimumPropertyThreshold: 5,
      },
    ],
  },
}
