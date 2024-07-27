import React from "react";
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
import AddProduit from "./AddProduit";
import EditProduit from "./EditProduit";
import axios from "axios";
import { UseAppStore } from "../../AppStore";
import "../../Dash.css";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
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

const ProduitList = () => {
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
        const response = await axios.get("http://localhost:8081/produit");
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
          `http://localhost:8081/search?query=${searchValue}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [open, searchValue]);

  const editProduit = (idprod, prod, descri, qt, daty, prix) => {
    const data = {
      idprod: idprod,
      prod: prod,
      descri: descri,
      qt: qt,
      daty: daty,
      prix: prix,
    };
    setFormind(data);
    handleEditOpen();
  };

  const handleDelete = (idprod) => {
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
          .delete(`http://localhost:8081/deleteProduit/${idprod}`)
          .then(() => {
            Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
            window.location.reload();
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

  function formatDateTime(dateTimeString) {
    // Créez un objet Date à partir de la chaîne de date/heure (format "YYYY-MM-DDTHH:mm:ss")
    const dateTime = new Date(dateTimeString);

    // Obtenez le jour, le mois et l'année à partir de l'objet Date
    const day = dateTime.getDate();
    const month = dateTime.getMonth(); // Les mois sont indexés à partir de 0
    const year = dateTime.getFullYear();

    const moisActuel = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ][month];

    // Formatez la date et l'heure au format "DD mois AAAA HH:MM"
    const formattedDateTime = `${day
      .toString()
      .padStart(2, "0")} ${moisActuel} ${year} `;
    return formattedDateTime;
  }

  return (
    <>
      <div>
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="backdark"
        >
          <Box sx={style} className="backdark">
            <AddProduit CloseEvent={handleClose} />
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
            <EditProduit CloseEvent={handleEditClose} fid={formind} />
          </Box>
        </Modal>
      </div>

      <div>
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
            Liste des Produits
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Button
              variant="contained"
              color="success"
              endIcon={<GroupAddIcon />}
              onClick={handleOpen}
            >
              Ajouter
            </Button>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Grid item xs={12} className="inputDark">
              <TextField
                onChange={handleSearchChange}
                size="small"
                label="Recherche"
                color="success"
                sx={{ minWidth: "100%" }}
              />
            </Grid>
          </Stack>
          <Box height={10} />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className=" justify-content-center align-items-center"
          >
            <div>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead className="border">
                    <TableRow className="backdark">
                      <TableCell
                        align="left"
                        style={{ minWidth: "100px" }}
                        className="tabDark"
                      >
                        Produit
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "100px" }}
                        className="tabDark"
                      >
                        Description
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "100px" }}
                        className="tabDark"
                      >
                        Stock
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "100px" }}
                        className="tabDark"
                      >
                        Date
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ minWidth: "100px" }}
                        className="tabDark"
                      >
                        Prix
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
                          data.prod
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          data.descri
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, id) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={id}
                          >
                            <TableCell align="left" className="backdark">
                              {data.prod}
                            </TableCell>
                            <TableCell align="left" className="backdark">
                              {data.descri}
                            </TableCell>
                            <TableCell align="left" className="backdark">
                              {data.qt} kg
                            </TableCell>
                            <TableCell align="left" className="backdark">
                              {formatDateTime(data.daty)}
                            </TableCell>
                            <TableCell align="left" className="backdark">
                              {data.prix} Ariary
                            </TableCell>
                            <TableCell align="left">
                              <Stack spacing={2} direction="row">
                                <Button
                                  className="bt3"
                                  onClick={() =>
                                    editProduit(
                                      data.idprod,
                                      data.prod,
                                      data.descri,
                                      data.qt,
                                      data.daty,
                                      data.prix
                                    )
                                  }
                                >
                                  <i className="bi bi-pencil-fill fs-5 bt3"></i>
                                </Button>

                                <Button
                                  onClick={(e) => handleDelete(data.idprod)}
                                >
                                  <i className="bi bi-trash-fill  fs-5 bt4"></i>
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </motion.div>
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
      </div>
    </>
  );
};

export default ProduitList;
