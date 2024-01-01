import * as React from "react";
import { mongoPost } from "../utils/mongoHelper";
import { useRouter } from "next/router";
import Stepper from "../components/Stepper";
import { OptionsGroup } from "../components/QuizCard_LM";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import _ from "lodash";
import { Container } from "@mui/material";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  SampleQn_LMAtom,
  SelectedQn_LMSelector,
  SelectedOption_LMSelector,
} from "../state/quiz_LMState";
import { SelectedRecord_LMAtom } from "../state/records_LMState";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en-sg";

dayjs.locale("en-sg");
dayjs.extend(localeData);
dayjs.extend(isoWeek);

const Quiz = () => {
  const { TotalSample, RemainingSample, SampleNum, Qns, answer } =
    useRecoilValue(SelectedQn_LMSelector);
  const handleOnSubmit = useSetRecoilState(SelectedQn_LMSelector);
  const selected = useRecoilValue(SelectedOption_LMSelector);
  const resetSampleQn = useResetRecoilState(SampleQn_LMAtom);
  const selectedRec = useRecoilValue(SelectedRecord_LMAtom);
  const router = useRouter();

  React.useEffect(() => {
    if (SampleNum === 0) {
      //TODO show all the loading page
      submit(selectedRec, router, resetSampleQn);
    }
  }, [SampleNum, selectedRec, router, resetSampleQn]);

  return (
    <Container>
      <Stepper Total={TotalSample} leftover={RemainingSample} />
      <Typography variant="h5" my={3}>
        {Qns}
        {answer}
      </Typography>
      <OptionsGroup />
      <Button
        sx={{ mt: 3 }}
        fullWidth
        disableRipple
        disabled={selected.BtnState}
        size="small"
        variant="contained"
        onClick={() => handleOnSubmit(RemainingSample)}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Quiz;

//TODO get most updated userRecords - consider merging with Boldface submit
function submit(selectedRec, router, resetState) {
  if (!_.isEmpty(selectedRec)) {
    const userobj = _.cloneDeep(selectedRec); //Create New instance of Record since Its a read-only.
    userobj.Quiz_Date.push(new Date());
    mongoPost("/editRecord_LM", userobj);
    router.push("/Overview_LM");
  }
  resetState();
}
