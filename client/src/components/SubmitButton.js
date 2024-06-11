import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function SubmitButton({type = "submit", label = "Submit", onClick}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={onClick} type={type}>
        {label}
      </Button>
    </Stack>
  );
}

export default SubmitButton;
