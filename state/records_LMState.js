import { atom, atomFamily, selector, selectorFamily } from "recoil";
import _ from "lodash";
import { localForageEffect } from "./quizState";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en-sg";

dayjs.locale("en-sg");
dayjs.extend(localeData);
dayjs.extend(isoWeek);

export const Records_LMAtom = atom({
  key: "Records_LM",
  default: [],
  effects: [localForageEffect("records_LM")],
});

export const SortedRecord_LMSelector = selector({
  key: "SortedRecord_LMSelector",
  get: ({ get }) => {
    const Records = get(Records_LMAtom);
    const sortedRecords = _.sortBy(Records, ["user"]);
    return sortedRecords;
  },
});

export const SelectedRecord_LMAtom = atom({
  key: "SelectedRecord_LMAtom",
  default: {},
});

export const RecordAtom_LMFamily = atomFamily({
  key: "RecordAtom_LMFamily",
  default: selectorFamily({
    key: "RecordAtom_LMFamily/Default",
    get:
      (user) =>
      ({ get }) => {
        const Records = get(Records_LMAtom);
        const userRecord = _.filter(Records, function (Record) {
          return Record.user === user;
        });
        return userRecord;
      },
  }),
});

export const RecordSelector_LMFamily = selectorFamily({
  key: "RecordSelector_LMFamily",
  get:
    (user) =>
    ({ get }) => {
      const Records = get(Records_LMAtom);
      const userRecord = _.find(Records, function (Record) {
        return Record.user === user;
      });
      const id = userRecord._id;
      const name = userRecord.user;
      const bfdate =
        userRecord.BF_Date.length === 0 ? "" : userRecord.BF_Date.slice(-1);
      const quizdate =
        userRecord.Quiz_Date.length === 0 ? "" : userRecord.Quiz_Date.slice(-1);
      const allValid =
        dayjs().isoWeek() === dayjs(quizdate).isoWeek() ? true : false;

      return { userRecord, id, name, bfdate, quizdate, allValid };
    },
});

export const isExpandedAtom_LMFamily = atomFamily({
  key: "isExpandedAtom_LMFamily",
  default: false,
});

export const isExpandedSelector_LMFamily = selectorFamily({
  key: "isExpandedSelector_LMFamily",
  get:
    (user) =>
    ({ get }) => {
      return get(isExpandedAtom_LMFamily(user));
    },
  set:
    (user) =>
    ({ set, get }, newValue) => {
      set(isExpandedAtom_LMFamily(user), newValue);
      newValue
        ? set(
            SelectedRecord_LMAtom,
            _.find(get(Records_LMAtom), function (Record) {
              return Record.user === user;
            }),
          )
        : set(SelectedRecord_LMAtom, {});
    },
});
