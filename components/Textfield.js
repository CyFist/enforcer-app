import * as React from 'react';
import { useRecoilState } from 'recoil';
import { TxtFieldAtomFamily } from '../state/bfState';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

import split from 'lodash/split';

const TxtField = ({ id, defaultValue, txtRefobj, onInput }) => {
  const [value, setValue] = useRecoilState(TxtFieldAtomFamily(id));
  const indx = parseInt(split(id, '_')[1], 0) - 1;

  /*const handlekeydown = (e) => {
    console.log(e.target.value);
    if (e.charCode === 13) {
      alert('Enter... (KeyPress, use charCode)');
    }
    if (e.keyCode === 13) {
      //alert('Enter... (KeyDown, use keyCode)');
      const compactRefs = _.compact(txtRefobj.current);
      const current = _.findIndex(compactRefs, (element) => {
        return element === e.target;
      });
      const fst_txt = compactRefs[0];
      const curr_txt = compactRefs[current];
      const nxt_txt = compactRefs[current + 1];
      const lst_txt = compactRefs[compactRefs.length - 1];

      if (curr_txt === lst_txt) {
        //console.log('correct');
        handleOnSubmit({ updatetype: 'submit', newValue: Rem_bfs });
        curr_txt.value = '';
        fst_txt.focus();
      } else {
        nxt_txt.focus();
      }
    }
  };*/

  return (
    <Grid xs={6}>
      <TextField
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.secondary'
            }
          }
        }}
        fullWidth={true}
        id={id}
        variant="outlined"
        size="small"
        multiline
        autoComplete="off"
        inputProps={{
          style: { fontSize: '0.75rem', textTransform: 'uppercase' },
          enterKeyHint: 'next'
        }}
        inputRef={(el) => (txtRefobj.current[indx] = el)}
        //onKeyDown={handlekeydown}
        onInput={onInput}
        onChange={(ev) => setValue(ev.target.value)}
        //placeholder={defaultValue}
        {...{ value }}
      />
    </Grid>
  );
};

export default TxtField;
