import * as React from "react";
//import { Link } from '../utils/helperfunc';
import Link from "next/link";
//import { link } from "../utils/helperfunction";
import { useRouter } from "next/router";

import _ from "lodash";

import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import {
  Records_LMAtom,
  SelectedRecord_LMAtom,
  RecordSelector_LMFamily,
  isExpandedSelector_LMFamily,
  isExpandedAtom_LMFamily,
} from "../state/records_LMState";
import { SampleQn_LMAtom } from "../state/quiz_LMState";
import { query_LMAtom } from "../state/queryState";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en-sg";

dayjs.locale("en-sg");
dayjs.extend(localeData);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(isoWeek);
dayjs.extend(weekday);

const UserItem = ({ user }) => {
  const { name, bfdate, quizdate, allValid } = useRecoilValue(
    RecordSelector_LMFamily(user),
  );
  const setUserClicked = useSetRecoilState(isExpandedSelector_LMFamily(user));
  const [isExpanded, setIsExpanded] = useRecoilState(
    isExpandedAtom_LMFamily(user),
  );
  const [SelectedRecord, setSelectedRecord] = useRecoilState(
    SelectedRecord_LMAtom,
  );

  const handleChange = () => (event, isExpanded) => {
    setUserClicked(isExpanded);
  };

  const resetSampleQn = useResetRecoilState(SampleQn_LMAtom);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsExpanded(false);

        if (SelectedRecord.user === name) {
          setSelectedRecord({});
        }
      }}
    >
      <Grid
        height={56}
        key={`${name}Grid`}
        xs={12}
        sm={8}
        md={6}
        lg={4}
        zeroMinWidth
      >
        <Accordion
          sx={{
            bgcolor: "background.paper",
            boxShadow: 3,
            "&.MuiPaper-root": {
              borderRadius: 6,
            },
            zIndex: isExpanded ? 1100 : 100,
          }}
          disableGutters
          expanded={isExpanded}
          onChange={handleChange(name)}
          TransitionProps={{
            timeout: {
              enter: 600,
              exit: 20,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${name}-bh-content`}
            id={`${name}-bh-header`}
            sx={{
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              borderBottomRightRadius: isExpanded ? 0 : 24,
              borderBottomLeftRadius: isExpanded ? 0 : 24,
              bgcolor: allValid
                ? isExpanded
                  ? "success.light"
                  : "success.main"
                : isExpanded
                  ? "error.light"
                  : "error.main",
              zIndex: isExpanded ? 100 : 100,
              transition: (theme) =>
                theme.transitions.create(
                  [
                    "border-bottom-left-radius",
                    "border-bottom-right-radius",
                    "background-color",
                  ],
                  {
                    duration: theme.transitions.duration.complex,
                  },
                ),
              "&:hover": {
                bgcolor: allValid ? "success.light" : "error.light",
              },
            }}
          >
            <Typography noWrap width="99%">
              {name}
            </Typography>
          </AccordionSummary>
          <ListItemButton
            onClick={() => {
              setIsExpanded(false);
              resetSampleQn();
            }}
            component={Link}
            href="/Quiz_LM"
            key={`${name}-Quiz`}
            sx={{
              py: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemText
              width="99%"
              primary="Quiz"
              primaryTypographyProps={{ noWrap: true }}
              secondary={
                quizdate === "" ? "Nil" : dayjs(quizdate).format("DD MMM YY")
              }
              secondaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        </Accordion>
      </Grid>
    </ClickAwayListener>
  );
};

const UsersGrid = () => {
  const uRecords = useRecoilValue(Records_LMAtom);
  const query = useRecoilValue(query_LMAtom);

  const UserItems = _.chain(uRecords)
    .filter((uRecord) => {
      if (!_.isEmpty(query)) {
        const x = !_.isEmpty(
          _.compact(
            query.map((value) => {
              if (_.startsWith(uRecord.user, value)) {
                return true;
              }
              return false;
            }),
          ),
        );
        return x;
      }
      return true;
    })
    .value()
    .map((objRecord) => {
      return <UserItem key={`${objRecord.user}Item`} user={objRecord.user} />;
    });

  return (
    <Grid
      container
      rowSpacing={1}
      columns={24}
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
      disableEqualOverflow
    >
      {UserItems}
    </Grid>
  );
};

export default UsersGrid;
