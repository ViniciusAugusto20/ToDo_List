import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import Task from '../../models/task';

import './style.scss';

interface Props {
  task?: Task;
  icone: React.ReactNode;
  uppdateTasks: (value: boolean) => void;
}

const Modal = (props: Props) => {
  const { task, uppdateTasks, icone } = props;
  const [abrirModal, setAbrirModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task?.task || '');
  const handleClickOpen = () => {
    setAbrirModal(true);
  };
  const handleClose = () => {
    setAbrirModal(false);
  };

  const salvarAtividade = () => {
    const tasksFound = JSON.parse(
      localStorage.getItem('@MyToDoList/tasks') || '[]',
    );
    if (task?.id) {
      let taskToChange = tasksFound.find(
        (taskOnStorage: Task) => taskOnStorage.id == task?.id,
      );
      if (taskToChange?.id == task?.id) {
        taskToChange.task = taskDescription;
        let indexTask = tasksFound.indexOf(taskToChange);
        tasksFound.splice(tasksFound.indexOf(taskToChange), 1);
        tasksFound.splice(indexTask, 0, taskToChange);
        handleClose();
        uppdateTasks(true);
      }
      localStorage.setItem('@MyToDoList/tasks', JSON.stringify(tasksFound));
    } else {
      let newTask: Task = {
        id: uuidv4(),
        task: taskDescription,
        done: false,
      };
      if (newTask.task === '') {
        notifyError();
        uppdateTasks(false);
      } else {
        tasksFound.splice(0, 0, newTask);
        handleClose();
        setTaskDescription('');
        uppdateTasks(true);
        localStorage.setItem('@MyToDoList/tasks', JSON.stringify(tasksFound));
      }
      uppdateTasks(true);
    }
  };

  const notifyError = () => {
    toast.error('Place a description', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Box display="block">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Button onClick={handleClickOpen}>
        {icone}
        {!task?.id ? (
          <Typography className={'titleAddButton'}>Add Activity</Typography>
        ) : (
          <></>
        )}
      </Button>
      <Dialog
        className={'dialogContainer'}
        onClose={handleClose}
        open={abrirModal}
      >
        <DialogTitle>
          {task?.id ? (
            <>
              <Typography className={'titleModal'}>Edit Activity</Typography>
            </>
          ) : (
            <>
              <Typography className={'titleModal'}>Add Activity</Typography>
            </>
          )}
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell className={'tableCellHeadFirst'}>
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task?.id ? (
                  <TableRow key={task.id}>
                    <TableCell align="center">
                      <TextField
                        variant="outlined"
                        value={taskDescription}
                        onChange={event =>
                          setTaskDescription(event.target.value)
                        }
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        variant="outlined"
                        value={taskDescription}
                        onChange={event =>
                          setTaskDescription(event.target.value)
                        }
                      ></TextField>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <Button
                variant="contained"
                color="primary"
                className="saveButton"
                onClick={salvarAtividade}
              >
                Save
              </Button>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Modal;
