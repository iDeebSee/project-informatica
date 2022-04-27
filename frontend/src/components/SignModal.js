import * as React from 'react';
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import CanvasDraw from "react-canvas-draw";
// import classNames from "react-canvas-draw";
import SignCanvas from './SignCanvas';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export const SignModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  // const [color, setcolor] = React.useState(false);
  // const [brushRadius, setBrushRadius] = React.useState(false);
  // const [lazyRadius, setLazyRadius] = React.useState(false);
  // const [width, setWidth] = React.useState(false);
  // const [height, setHeight] = React.useState(false);

  const handleClose = () => setOpen(false);

  React.useImperativeHandle(ref, () => ({

    handleOpen() {
      setOpen(true)
    }

  }))

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignCanvas></SignCanvas>
        </Box>
      </Modal>
    </div>
  );
});
