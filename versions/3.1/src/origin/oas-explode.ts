import { OasStyle } from './oas-style';

export const OasExplode: OasExplodeType = {
  matrix: {
    false: {
      empty: ';color',
      string: ';color=blue',
      array: ';color=blue,black,brown',
      object: ';color=R,100,G,200,B,150',
    },
    true: {
      empty: ';color',
      string: ';color=blue',
      array: ';color=blue;color=black;color=brown',
      object: ';R=100;G=200;B=150',
    },
  },
  label: {
    false: {
      empty: '.',
      string: '.blue',
      array: '.blue.black.brown',
      object: '.R.100.G.200.B.150',
    },
    true: {
      empty: '.',
      string: '.blue',
      array: '.blue.black.brown',
      object: '.R=100.G=200.B=150',
    },
  },
  form: {
    false: {
      empty: 'color=',
      string: 'color=blue',
      array: 'color=blue,black,brown',
      object: 'color=R,100,G,200,B,150',
    },
    true: {
      empty: 'color=',
      string: 'color=blue',
      array: 'color=blue&color=black&color=brown',
      object: 'R=100&G=200&B=150',
    },
  },
  simple: {
    false: {
      empty: 'n/a',
      string: 'blue',
      array: 'blue,black,brown',
      object: 'R,100,G,200,B,150',
    },
    true: {
      empty: 'n/a',
      string: 'blue',
      array: 'blue,black,brown',
      object: 'R=100,G=200,B=150',
    },
  },
  spaceDelimited: {
    false: {
      empty: 'n/a',
      string: 'n/a',
      array: 'blue%20black%20brown',
      object: 'R%20100%20G%20200%20B%20150',
    },
  },
  pipeDelimited: {
    false: {
      empty: 'n/a',
      string: 'n/a',
      array: 'blue|black|brown',
      object: 'R|100|G|200|B|150',
    },
  },
  deepObject: {
    true: {
      empty: 'n/a',
      string: 'n/a',
      array: 'n/a',
      object: 'color[R]=100&color[G]=200&color[B]=150',
    },
  },
};

type OasExplodeType = {
  [P in OasStyle]: {
    [V in 'true' | 'false']?: { [K in 'empty' | 'string' | 'array' | 'object']: string };
  };
};
