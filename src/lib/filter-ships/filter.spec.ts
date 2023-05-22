import { Ship } from '../ship';
import { filterShips } from './filter';
import { SearchWords } from './search-words';

describe('filterShips', () => {
  const first: Ship = {
    id: 1,
    name: '戦艦',
    kana: 'せんかん',
    category: '戦艦級',
    types: ['戦艦'],
    speed: '低速',
    range: '長射程',
    equipments: ['艦隊司令部施設', '水上戦闘機'],
    abilities: ['特殊攻撃'],
    country: '日本',
    showDefault: true,
  };
  const hiddenFirst: Ship = {
    ...first,
    showDefault: false,
  };
  const second: Ship = {
    id: 2,
    name: '駆逐艦',
    kana: 'くちくかん',
    category: '駆逐艦',
    types: ['駆逐艦'],
    speed: '高速',
    range: '短射程',
    equipments: [],
    abilities: ['無条件先制対潜'],
    country: 'アメリカ',
    showDefault: true,
  };
  const hiddenSecond: Ship = {
    ...second,
    showDefault: false,
  };
  const third: Ship = {
    id: 3,
    name: '航空巡洋艦',
    kana: 'こうくうじゅんようかん',
    category: '重巡級',
    types: ['航空巡洋艦'],
    speed: '高速',
    range: '中射程',
    equipments: ['水上爆撃機', '水上戦闘機'],
    abilities: [],
    country: 'イギリス',
    showDefault: true,
  };
  const hiddenThird: Ship = {
    ...third,
    showDefault: false,
  };
  const ships: Ship[] = [
    first,
    hiddenFirst,
    second,
    hiddenSecond,
    third,
    hiddenThird,
  ];
  const emptyWords: SearchWords = {
    names: [],
    categories: [],
    types: [],
    speeds: [],
    ranges: [],
    equipments: [],
    abilities: [],
    countries: [],
  };

  describe('デフォルト表示キャラのみが対象の場合', () => {
    describe('検索条件がない場合', () => {
      it('デフォルト表示キャラ全員が返る', () => {
        expect(filterShips(ships, emptyWords, false)).toEqual([
          first,
          second,
          third,
        ]);
      });
    });

    describe('名前の指定がある場合', () => {
      it('指定ワードを全て含む名前の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          names: ['艦', '空'],
        };
        expect(filterShips(ships, words, false)).toEqual([third]);
      });

      it('マイナスワードを含まない艦船の名前が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          names: ['艦', '-空'],
        };
        expect(filterShips(ships, words, false)).toEqual([first, second]);
      });
    });

    describe('艦種カテゴリの指定がある場合', () => {
      it('指定された艦種カテゴリの艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          categories: ['駆逐艦'],
        };
        expect(filterShips(ships, words, false)).toEqual([second]);
      });

      it('マイナス指定された艦種カテゴリ以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          categories: ['-戦艦級'],
        };
        expect(filterShips(ships, words, false)).toEqual([second, third]);
      });
    });

    describe('艦種の指定がある場合', () => {
      it('指定された艦種の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          types: ['戦艦'],
        };
        expect(filterShips(ships, words, false)).toEqual([first]);
      });

      it('マイナス指定された艦種以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          types: ['-戦艦'],
        };
        expect(filterShips(ships, words, false)).toEqual([second, third]);
      });
    });

    describe('速度の指定がある場合', () => {
      it('指定された速度の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['高速'],
        };
        expect(filterShips(ships, words, false)).toEqual([second, third]);
      });

      it('マイナス指定されていない速度の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['-高速'],
        };
        expect(filterShips(ships, words, false)).toEqual([first]);
      });
    });

    describe('射程の指定がある場合', () => {
      it('指定された射程の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          ranges: ['長射程'],
        };
        expect(filterShips(ships, words, false)).toEqual([first]);
      });

      it('マイナス指定されていない射程の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          ranges: ['-中射程'],
        };
        expect(filterShips(ships, words, false)).toEqual([first, second]);
      });
    });

    describe('装備の指定がある場合', () => {
      it('指定された装備を装備できる艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          equipments: ['水上戦闘機'],
        };
        expect(filterShips(ships, words, false)).toEqual([first, third]);
      });

      it('マイナス指定された装備を装備できない艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          equipments: ['-水上戦闘機'],
        };
        expect(filterShips(ships, words, false)).toEqual([second]);
      });
    });

    describe('特性の指定がある場合', () => {
      it('指定された特性を持つ艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          abilities: ['無条件先制対潜'],
        };
        expect(filterShips(ships, words, false)).toEqual([second]);
      });

      it('マイナス指定された特性を持たない艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          abilities: ['-無条件先制対潜'],
        };
        expect(filterShips(ships, words, false)).toEqual([first, third]);
      });
    });

    describe('国籍の指定がある場合', () => {
      it('指定された国籍の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          countries: ['日本'],
        };
        expect(filterShips(ships, words, false)).toEqual([first]);
      });

      it('マイナス指定された国籍以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          countries: ['-日本'],
        };
        expect(filterShips(ships, words, false)).toEqual([second, third]);
      });
    });

    describe('複数の指定がある場合', () => {
      it('指定を全て満たす艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['高速'],
          ranges: ['-短射程'],
        };
        expect(filterShips(ships, words, false)).toEqual([third]);
      });
    });
  });

  describe('全キャラが対象の場合', () => {
    describe('検索条件がない場合', () => {
      it('デフォルト表示キャラ全員が返る', () => {
        expect(filterShips(ships, emptyWords, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('名前の指定がある場合', () => {
      it('指定ワードを全て含む名前の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          names: ['艦', '空'],
        };
        expect(filterShips(ships, words, true)).toEqual([third, hiddenThird]);
      });

      it('マイナスワードを含まない艦船の名前が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          names: ['艦', '-空'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
        ]);
      });
    });

    describe('艦種カテゴリの指定がある場合', () => {
      it('指定された艦種カテゴリの艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          categories: ['駆逐艦'],
        };
        expect(filterShips(ships, words, true)).toEqual([second, hiddenSecond]);
      });

      it('マイナス指定された艦種カテゴリ以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          categories: ['-戦艦級'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('艦種の指定がある場合', () => {
      it('指定された艦種の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          types: ['戦艦'],
        };
        expect(filterShips(ships, words, true)).toEqual([first, hiddenFirst]);
      });

      it('マイナス指定された艦種以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          types: ['-戦艦'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('速度の指定がある場合', () => {
      it('指定された速度の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['高速'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });

      it('マイナス指定されていない速度の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['-高速'],
        };
        expect(filterShips(ships, words, true)).toEqual([first, hiddenFirst]);
      });
    });

    describe('射程の指定がある場合', () => {
      it('指定された射程の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          ranges: ['長射程'],
        };
        expect(filterShips(ships, words, true)).toEqual([first, hiddenFirst]);
      });

      it('マイナス指定されていない射程の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          ranges: ['-中射程'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          second,
          hiddenSecond,
        ]);
      });
    });

    describe('装備の指定がある場合', () => {
      it('指定された装備を装備できる艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          equipments: ['水上戦闘機'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          third,
          hiddenThird,
        ]);
      });

      it('マイナス指定された装備を装備できない艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          equipments: ['-水上戦闘機'],
        };
        expect(filterShips(ships, words, true)).toEqual([second, hiddenSecond]);
      });
    });

    describe('特性の指定がある場合', () => {
      it('指定された特性を持つ艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          abilities: ['無条件先制対潜'],
        };
        expect(filterShips(ships, words, true)).toEqual([second, hiddenSecond]);
      });

      it('マイナス指定された特性を持たない艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          abilities: ['-無条件先制対潜'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          first,
          hiddenFirst,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('国籍の指定がある場合', () => {
      it('指定された国籍の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          countries: ['日本'],
        };
        expect(filterShips(ships, words, true)).toEqual([first, hiddenFirst]);
      });

      it('マイナス指定された国籍以外の艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          countries: ['-日本'],
        };
        expect(filterShips(ships, words, true)).toEqual([
          second,
          hiddenSecond,
          third,
          hiddenThird,
        ]);
      });
    });

    describe('複数の指定がある場合', () => {
      it('指定を全て満たす艦船が返る', () => {
        const words: SearchWords = {
          ...emptyWords,
          speeds: ['高速'],
          ranges: ['-短射程'],
        };
        expect(filterShips(ships, words, true)).toEqual([third, hiddenThird]);
      });
    });
  });
});
