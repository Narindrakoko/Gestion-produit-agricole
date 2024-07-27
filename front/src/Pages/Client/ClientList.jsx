import React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import AddClient from './AddClient';
import EditClient from './EditClient';
import axios from "axios";
import { UseAppStore } from '../../AppStore';
import "../../Dash.css";
import Grid from "@mui/material/Grid";
import '../../style3.css'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

const ClientList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formind, setFormind] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/client");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [open]);

  // RECHERCHE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search?query=${searchValue}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [open, searchValue]);

  const editUser = (idcli, nom, adresse, contact) => {
    const data = {
      idcli: idcli,
      nom: nom,
      adresse: adresse,
      contact: contact
    };
    setFormind(data);
    handleEditOpen();
  };

  const handleDelete = (idcli) => {
    Swal.fire({
      title: "Confirmation",
      text: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        // Envoyez une requête de suppression ici
        axios
          .delete(`http://localhost:5000/deleteClient/${idcli}`)
          .then(() => {
            Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
            // Vous pouvez également mettre à jour la liste d'utilisateurs après la suppression si nécessaire
            // fetchData();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Erreur",
              "Une erreur s'est produite lors de la suppression.",
              "error"
            );
          });
      }
    });
  };

  ///////////////////////////////////////////////////////DETAIL CLIENT////////////////////////////////////////


  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

    return (
        <>
        <div >
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="backdark"
        >
          <Box sx={style} className="backdark">
            <AddClient CloseEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="backdark"
        >
          <Box sx={style} className="backdark">
            <EditClient CloseEvent={handleEditClose} fid={formind} />
          </Box>
        </Modal>
      </div>
      <div >
        <Paper
          sx={{ width: "100%", overflow: "hidden", padding: "12px" }}
          className="backdark"
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Liste des Clients
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Grid item xs={12} className="inputDark">
              <TextField
                onChange={handleSearchChange}
                size="small"
                label="Recherche"
                sx={{ minWidth: "100%" }}
              />
            </Grid>
          
           
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table className=" table  table-striped">
              <TableHead className="backdark">
                <TableRow className="backdark">
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px" }}
                    className="tabDark"
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px" }}
                    className="tabDark"
                  >
                    Nom
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px" }}
                    className="tabDark"
                  >
                    Adresse
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px" }}
                    className="tabDark"
                  >
                    Contact
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px" }}
                    className="tabDark"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user
                  .filter(
                    (data) =>
                      data.idcli
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      data.nom
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      data.contact
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, id) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                        <TableCell align="left" className="backdark">
                          {data.idcli}
                        </TableCell>
                        <TableCell align="left" className="backdark">
                          {data.nom}
                        </TableCell>
                        <TableCell align="left" className="backdark">
                          {data.adresse}
                        </TableCell>
                        <TableCell align="left" className="backdark">
                          {data.contact}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <Button

                                className='bt3'
                              onClick={() => handleEditClick(data)}
                            >
                              <i className='bi bi-eye-fill fs-5 bt3' ></i>
                            </Button>
                            <Button
                              onClick={(e) => handleDelete(data.idcli)}
                            >
                              <i className='bi bi-trash-fill  fs-5 bt4' ></i>
                            </Button>

                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={user.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedRow && (
            <>
              <Typography variant="h6" id="modal-title">Information du client</Typography>
              <Typography variant="body1" id="modal-description">
                Nom d'utilisateur: {selectedRow.idcli}<br />
                Nom: {selectedRow.nom}<br />
                Mail: {selectedRow.adresse}<br />
                Contacte: {selectedRow.contact}<br />
              </Typography>
            </>
          )}
        </Box>
      </Modal>


      </div>
        </>
    );
};

export default ClientList;