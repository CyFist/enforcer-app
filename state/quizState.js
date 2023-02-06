import { atom, selector } from 'recoil';
import { shuffleObject } from '../utils/helperfunc';
import _ from 'lodash';
import localForage from 'localforage';

export const localForageEffect = (key) => ({ setSelf, onSet, trigger }) => {
  // If there's a persisted value - set it on load
  const loadPersisted = async () => {
    const savedValue = await localForage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  };

  // Asynchronously set the persisted data
  if (trigger === 'get') {
    loadPersisted();
  }

  // Subscribe to state changes and persist them to localForage
  onSet((newValue, _, isReset) => {
    isReset ? localForage.removeItem(key) : localForage.setItem(key, JSON.stringify(newValue));
  });
};

export const QnBnkAtom = atom({
  key: 'QnBnkAtom',
  default: [],
  effects: [localForageEffect('QnBank')]
});

export const EdittedQnBnkAtom = atom({
  key: 'EdittedQnBnkAtom',
  default: [],
  effects: [localForageEffect('EdittedQnBnk')]
});

export const EdittedQnBnkSelector = selector({
  key: 'EdittedQnBnkSelector',

  get: ({ get }) => {
    const qBank = get(QnBnkAtom);
    return qBank;
  },
  set: ({ set }, newValue) => {
    set(QnBnkAtom, newValue);
  }
});

export const SampleQnAtom = atom({
  key: 'SampleBank',
  default: selector({
    key: 'SampleBankSelector',

    get: ({ get }) => {
      const Samplelist = _.sampleSize(get(QnBnkAtom), 15);
      return Samplelist;
    }
  })
});

export const SelectedQnSelector = selector({
  key: 'SelectedQn',

  get: ({ get }) => {
    const TotalSample = _.sampleSize(get(QnBnkAtom), 15);
    const RemainingSample = _.sampleSize(get(SampleQnAtom), 15);
    const SampleNum = RemainingSample.length;
    const SelectedQns = RemainingSample[0];
    const Qns = SelectedQns ? SelectedQns.Question : '';
    const Options = _.pickBy(
      SelectedQns,
      (value, key) => key.startsWith('Option') && !_.isEmpty(value)
    );
    const shuffleOptions = shuffleObject(Options);
    const answer = SelectedQns ? SelectedQns.Answer : '';
    return {
      TotalSample,
      RemainingSample,
      SampleNum,
      SelectedQns,
      Qns,
      Options,
      shuffleOptions,
      answer
    };
  },
  set: ({ set, get }, newValue) => {
    const rembank = get(SampleQnAtom);
    const answer = _.split(rembank[0].Answer, ',');
    const SelOpts = _.isArray(get(SelectedOptionAtom))
      ? get(SelectedOptionAtom)
      : [get(SelectedOptionAtom)].slice().sort();
    let value = [];

    if (!_.isEmpty(SelOpts)) {
      set(SelectedOptionAtom, []);

      if (_.isEqual(SelOpts, answer)) {
        value = _.drop(newValue);
      } else {
        value = _.shuffle(newValue);
      }
      let shuffled = [];

      shuffled = _.shuffle(value);

      set(SampleQnAtom, shuffled);
    }
  }
});

export const SelectedOptionAtom = atom({
  key: 'SelectedOptionAtom',
  default: []
});

export const SelectedOptionSelector = selector({
  key: 'SelectedOptionSelector',

  get: ({ get }) => {
    const options = get(SelectedOptionAtom);
    const BtnState = _.isNull(options) || options.length === 0 ? true : false;
    return { options, BtnState };
  },
  set: ({ set }, newValue) => {
    set(SelectedOptionAtom, newValue);
  }
});
