import { atom, selector } from "recoil";
import { shuffleObject } from "../utils/helperfunc";
import _ from "lodash";
import localForage from "localforage";

export const localForageEffect =
  (key) =>
  ({ setSelf, onSet, trigger }) => {
    // If there's a persisted value - set it on load
    const loadPersisted = async () => {
      const savedValue = await localForage.getItem(key);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    };

    // Asynchronously set the persisted data
    if (trigger === "get") {
      loadPersisted();
    }

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      isReset
        ? localForage.removeItem(key)
        : localForage.setItem(key, JSON.stringify(newValue));
    });
  };

export const QnBnk_LMAtom = atom({
  key: "QnBnk_LMAtom",
  default: [],
  effects: [localForageEffect("QnBank")],
});

export const EdittedQnBnk_LMAtom = atom({
  key: "EdittedQnBnk_LMAtom",
  default: [],
  effects: [localForageEffect("EdittedQnBnk")],
});

export const EdittedQnBnk_LMSelector = selector({
  key: "EdittedQnBnk_LMSelector",

  get: ({ get }) => {
    const qBank = get(QnBnk_LMAtom);
    return qBank;
  },
  set: ({ set }, newValue) => {
    set(QnBnk_LMAtom, newValue);
  },
});

export const SampleQn_LMAtom = atom({
  key: "SampleBank_LM",
  default: selector({
    key: "SampleBankSelector_LM",

    get: ({ get }) => {
      const Samplelist = _.sampleSize(get(QnBnk_LMAtom), 15);
      return Samplelist;
    },
  }),
});

export const SelectedQn_LMSelector = selector({
  key: "SelectedQn_LM",

  get: ({ get }) => {
    const TotalSample = _.sampleSize(get(QnBnk_LMAtom), 15);
    const RemainingSample = _.sampleSize(get(SampleQn_LMAtom), 15);
    const SampleNum = RemainingSample.length;
    const SelectedQns = RemainingSample[0];
    const Qns = SelectedQns ? SelectedQns.Question : "";
    const Options = _.pickBy(
      SelectedQns,
      (value, key) => key.startsWith("Option") && !_.isEmpty(value),
    );
    const shuffleOptions = shuffleObject(Options);
    const answer = SelectedQns ? SelectedQns.Answer : "";

    return {
      TotalSample,
      RemainingSample,
      SampleNum,
      SelectedQns,
      Qns,
      Options,
      shuffleOptions,
      answer,
    };
  },
  set: ({ set, get }, newValue) => {
    const answer = _.split(newValue[0].Answer, ",");
    const SelOpts = _.isArray(get(SelectedOption_LMAtom))
      ? get(SelectedOption_LMAtom)
      : [get(SelectedOption_LMAtom)].slice().sort();
    let value = [];

    if (!_.isEmpty(SelOpts)) {
      set(SelectedOption_LMAtom, []);

      //console.log(SelOpts);
      if (_.isEqual(SelOpts, answer)) {
        value = _.drop(newValue);
      } else {
        value = _.shuffle(newValue);
      }
      let shuffled = [];

      shuffled = _.shuffle(value);

      set(SampleQn_LMAtom, shuffled);
    }
  },
});

export const SelectedOption_LMAtom = atom({
  key: "SelectedOption_LMAtom",
  default: [],
});

export const SelectedOption_LMSelector = selector({
  key: "SelectedOption_LMSelector",

  get: ({ get }) => {
    const options = get(SelectedOption_LMAtom);
    const BtnState = _.isNull(options) || options.length === 0 ? true : false;
    return { options, BtnState };
  },
  set: ({ set }, newValue) => {
    set(SelectedOption_LMAtom, newValue);
  },
});
