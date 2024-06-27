import React, { useState } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import '../../styles/PitchRules.css';
import '../../assets/pitch-rules.png'

const PitchRules = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>Pitch Rules</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-title" variant="h6" component="h2">
            Pitch Rules
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Here are the pitch rules...
            <table>
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Daily Max</th>
                        <th>Required Rest Pitches</th>
                        <th>Required Rest Pitches</th>
                        <th>Required Rest Pitches</th>
                        <th>Required Rest Pitches</th>
                        <th>Required Rest Pitches</th>
                        <th>Weekly Max Pitches 7 Day Period</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>0 Days</th>
                        <th>1 Day</th>
                        <th>2 Days</th>
                        <th>3 Days</th>
                        <th>4 Days</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>3rd & 4th Grade</th>
                        <th>65*</th>
                        <th>1-25</th>
                        <th>26-35</th>
                        <th>36-50</th>
                        <th>51-65</th>
                        <th>66+</th>
                        <th>75*</th>
                    </tr>
                    <tr>
                        <th>5th & 6th Grade</th>
                        <th>65*</th>
                        <th>1-35</th>
                        <th>36-45</th>
                        <th>46-60</th>
                        <th>61-70</th>
                        <th>71+</th>
                        <th>95*</th>
                    </tr>
                    <tr>
                        <th>7th & 8th Grade</th>
                        <th>1-40</th>
                        <th>26-35</th>
                        <th>41-55</th>
                        <th>56-70</th>
                        <th>71-80</th>
                        <th>81+</th>
                        <th>105*</th>
                    </tr>
                    <tr>
                        <th>High School</th>
                        <th>None</th>
                        <th>N/A</th>
                        <th>N/A</th>
                        <th>N/A</th>
                        <th>N/A</th>
                        <th>N/A</th>
                        <th>125*</th>

                    </tr>
                </thead>
            </table>
          </Typography>
          <Button onClick={handleClose} style={{ marginTop: '20px' }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PitchRules;
