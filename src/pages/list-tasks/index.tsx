import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import ModalItem from '../../components/modal';
import Task from '../../models/task';
import { ptBR } from '@material-ui/core/locale';
import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../../assets/images/logo.png';
const ListTasks = () => {
  const [savedDataOnStorage, setSavedDataOnStorage] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  // Parte responsável pelo controle da tabela
  const [page, setPage] = React.useState(0);
  const theme = createMuiTheme({}, ptBR);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const uppdateTasks = (value: boolean) => {
    if (value === true) {
      let tasksFound = localStorage.getItem('@MyToDoList/tasks');
      if (tasksFound) {
        setSavedDataOnStorage(JSON.parse(tasksFound));
        setMyTasks(JSON.parse(tasksFound));
        notifySuccess();
      }
    }
  };
  const handleChangeStatusTask = (task: Task) => {
    const tasksFound = myTasks;
    let taskToChange = tasksFound.find(
      (taskOnStorage: Task) => taskOnStorage.id == task.id,
    );
    if (taskToChange?.id == task.id) {
      taskToChange.done = !task.done;
      let indexTask = tasksFound.indexOf(taskToChange);
      tasksFound.splice(tasksFound.indexOf(taskToChange), 1);
      tasksFound.splice(indexTask, 0, taskToChange);
    }
    localStorage.setItem('@MyToDoList/tasks', JSON.stringify(tasksFound));
    setMyTasks([...tasksFound]);
    if (taskToChange?.done === true) {
      notifyInfo();
    }
  };
  useEffect(() => {
    let tasksFound = localStorage.getItem('@MyToDoList/tasks');
    if (tasksFound) {
      setMyTasks(JSON.parse(tasksFound));
    }
  }, [savedDataOnStorage]);

  //Notificações para o usuário
  const notifyInfo = () => {
    toast.info('Activity completed', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notifySuccess = () => {
    toast.success('Activity saved', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
        <Box className="containerPage">
          <Box
            className={'containerLogo'}
            display="block"
            flexDirection={'row'}
          >
            <img alt="Logo" className={'imageLogo'} src={logo} />
            <Typography className="textLogo">My ToDo List</Typography>
          </Box>
          <Box className="containerListing" display="inline-table">
            <Box className="containerAddItem">
              <ModalItem icone={<AddIcon />} uppdateTasks={uppdateTasks} />
            </Box>
            <Box
              display="inline-table"
              flexDirection={'row'}
              className={'containerTable'}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead className={'tableHead'}>
                    <TableRow>
                      <TableCell className={'tableCellHeadFirst'}>
                        Done
                      </TableCell>
                      <TableCell className={'tableCellHead'}>
                        Description
                      </TableCell>
                      <TableCell className={'tableCellHead'}>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(5 > 0
                      ? myTasks.slice(page * 5, page * 5 + 5)
                      : myTasks
                    ).map((task: Task) => (
                      <TableRow key={task.id}>
                        <TableCell align="left">
                          <Checkbox
                            checked={task.done}
                            onClick={() => {
                              handleChangeStatusTask(task);
                            }}
                          />
                        </TableCell>
                        <TableCell
                          className={
                            task.done === true
                              ? 'TableCell-Done'
                              : 'TableCell-unDone'
                          }
                          align="center"
                        >
                          {task.task}
                        </TableCell>
                        <TableCell align="center">
                          <ModalItem
                            icone={<Edit />}
                            task={task}
                            uppdateTasks={uppdateTasks}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={myTasks?.length}
                        rowsPerPageOptions={[0]}
                        rowsPerPage={5}
                        page={page}
                        SelectProps={{
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default ListTasks;
