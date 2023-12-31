import * as React from "react";
import { mongoPost } from "../utils/mongoHelper";
import { useRouter } from "next/router";
import Stepper from "../components/Stepper";
import { OptionsGroup } from "../components/QuizCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import _ from "lodash";
import { Container } from "@mui/material";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  SampleQnAtom,
  SelectedQnSelector,
  SelectedOptionSelector,
} from "../state/quizState";
import { SelectedRecordAtom } from "../state/recordsState";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/en-sg";

dayjs.locale("en-sg");
dayjs.extend(localeData);
dayjs.extend(isoWeek);

const Quiz = () => {
  const { TotalSample, RemainingSample, SampleNum, Qns } =
    useRecoilValue(SelectedQnSelector);
  const handleOnSubmit = useSetRecoilState(SelectedQnSelector);
  const selected = useRecoilValue(SelectedOptionSelector);
  const resetSampleQn = useResetRecoilState(SampleQnAtom);
  const selectedRec = useRecoilValue(SelectedRecordAtom);
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
    mongoPost("/editRecord", userobj);
    router.push("/Overview");
  }
  resetState();
}
