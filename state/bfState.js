import { atom, atomFamily, selector } from 'recoil';
import _ from 'lodash';
import { localForageEffect } from './quizState';

export const BoldfaceAtom = atom({
  key: 'Boldface',
  default: {},
  effects: [localForageEffect('boldfaces')]
});

export const RemBoldfaceAtom = atom({
  key: 'rem_Boldface',
  default: selector({
    key: 'SampleBFSelector',

    get: ({ get }) => {
      const Samplelist = get(BoldfaceAtom);
      return Samplelist;
    }
  })
});

export const SelectedBFSelector = selector({
  key: 'boldface',

  get: ({ get }) => {
    const bfs = get(BoldfaceAtom);
    const Rem_bfs = get(RemBoldfaceAtom);
    const Rem_bfs_num = Rem_bfs.length;
    const Selected_bf = Rem_bfs[0];
    const bf_hdr = Selected_bf ? Selected_bf.header : '';
    const bf_elm = Selected_bf ? Selected_bf.elm : '';
    const ids = _.map(bf_elm, (value, key) => {
      if (_.startsWith(key, 'answer')) {
        return { key };
      }
    });

    return {
      bfs,
      Rem_bfs,
      Rem_bfs_num,
      Selected_bf,
      bf_hdr,
      bf_elm,
      ids
    };
  },
  set: ({ set, get }, { updatetype, newValue }) => {
    //clear all txtfield
    const currbf = get(SelectedBFSelector);
    const checkAnswers = _.map(currbf.bf_elm, (value, key) => {
      if (_.startsWith(key, 'answer')) {
        const txtfldvalue = get(TxtFieldAtomFamily(key));

        set(TxtFieldAtomFamily(key), '');
        if (txtfldvalue.toUpperCase() !== value.toUpperCase()) {
          return false;
        }
      }
    });
    const correct = !checkAnswers.some((ans) => ans === false); //Check for incorrect answer
    let value = [];
    if (updatetype === 'reset') {
      set(RemBoldfaceAtom, newValue);
      //console.log('reseted', newValue);
    } else if (updatetype === 'submit') {
      if (correct) {
        value = _.drop(newValue);
      } else {
        //TODO show incorrect use another ATOM to show
        value = _.shuffle(newValue);
      }
      let shuffled = [];

      shuffled = _.shuffle(value);

      set(RemBoldfaceAtom, shuffled);
    }
  }
});

export const TxtFieldAtomFamily = atomFamily({
  key: 'texfield',
  default: ''
});

//to delete?
export const TxtFielRefdAtomFamily = atomFamily({
  key: 'texfieldRef',
  default: {}
});
