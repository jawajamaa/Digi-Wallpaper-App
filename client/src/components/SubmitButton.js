import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function SubmitButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained">
        Submit
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  );
}

export default SubmitButton;
