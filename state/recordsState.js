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

export const RecordsAtom = atom({
  key: "Records",
  default: [],
  effects: [localForageEffect("records")],
});

export const SortedRecordSelector = selector({
  key: "SortedRecordSelector",
  get: ({ get }) => {
    const Records = get(RecordsAtom);
    const sortedRecords = _.sortBy(Records, ["user"]);
    return sortedRecords;
  },
});

export const SelectedRecordAtom = atom({
  key: "SelectedRecordAtom",
  default: {},
});

export const RecordAtomFamily = atomFamily({
  key: "RecordAtomFamily",
  default: selectorFamily({
    key: "RecordAtomFamily/Default",
    get:
      (user) =>
      ({ get }) => {
        const Records = get(RecordsAtom);
        const userRecord = _.filter(Records, function (Record) {
          return Record.user === user;
        });
        return userRecord;
      },
  }),
});

export const RecordSelectorFamily = selectorFamily({
  key: "RecordSelectorFamily",
  get:
    (user) =>
    ({ get }) => {
      const Records = get(RecordsAtom);
      const userRecord = _.find(Records, function (Record) {
        return Record.user === user;
      });
      const id = userRecord._id;
      const name = userRecord.user;
      const bfdate =
        userRecord.BF_Date === [] ? null : userRecord.BF_Date.slice(-1);
      const quizdate =
        userRecord.Quiz_Date === [] ? null : userRecord.Quiz_Date.slice(-1);
      const allValid =
        (dayjs().isoWeek() === dayjs(bfdate).isoWeek()) &
        (dayjs().isoWeek() === dayjs(quizdate).isoWeek())
          ? true
          : false;

      return { userRecord, id, name, bfdate, quizdate, allValid };
    },
});

export const isExpandedAtomFamily = atomFamily({
  key: "isExpandedAtomFamily",
  default: false,
});

export const isExpandedSelectorFamily = selectorFamily({
  key: "isExpandedSelectorFamily",
  get:
    (user) =>
    ({ get }) => {
      return get(isExpandedAtomFamily(user));
    },
  set:
    (user) =>
    ({ set, get }, newValue) => {
      set(isExpandedAtomFamily(user), newValue);
      newValue
        ? set(
            SelectedRecordAtom,
            _.find(get(RecordsAtom), function (Record) {
              return Record.user === user;
            })
          )
        : set(SelectedRecordAtom, {});
    },
});
