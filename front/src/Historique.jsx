import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";



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

const Historique = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/commande");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

  const handleDelete = (id) => {

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
        axios.defaults.withCredentials = true;
        axios
          .delete(`http://localhost:8081/deleteCommande/${id}`)
          .then(() => {
            Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
         
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

  ///////////////////////////////////////////////////////DATE FORMATER/////////////////////////////////////////////

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const moisActuel = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ][month];


  function formatDateTime(dateTimeString) {
    // Créez un objet Date à partir de la chaîne de date/heure (format "YYYY-MM-DDTHH:mm:ss")
    const dateTime = new Date(dateTimeString);
  
    // Obtenez le jour, le mois et l'année à partir de l'objet Date
    const day = dateTime.getDate();
    const month = dateTime.getMonth(); // Les mois sont indexés à partir de 0
    const year = dateTime.getFullYear() ;
  
    // Obtenez l'heure et les minutes
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
  
    // Noms des mois en français
    const moisActuel = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ][month];
  
    // Formatez la date et l'heure au format "DD mois AAAA HH:MM"
    const formattedDateTime = `${day.toString().padStart(2, '0')} ${moisActuel} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedDateTime;
  }

  //////////////////////////////////////////////////////////////////HISTORIQUE////////////////////////////////////////////////////////
const [userData, setUserData] = useState(null);
useEffect(() => {
  axios.get('http://localhost:8081/')
    .then(res => {
      if(res.data.valid){
          setUserData(res.data);
          setSearchValue(res.data.nom);
      } else {
          console.log(res)
          // Redirection vers la page de connexion si l'utilisateur n'est pas valide
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      alert("Erreur lors de la récupération des données utilisateur");
      // Gérer les erreurs de récupération des données utilisateur
    });
}, []);



const [searchDateValue, setSearchDateValue] = useState("");

// Function to handle changes in the search input field
const handleSearchDateChange = (event) => {
  setSearchDateValue(event.target.value);
};


const filteredData = user.filter(
  (data) =>
    data.daty.toLowerCase().includes(searchDateValue.toLowerCase())
);



  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ padding: "10px" }} style={{textAlign:'center'}}>
          Historique d'achat
        </Typography>
       


          <TextField
           value={searchDateValue}
           onChange={handleSearchDateChange}
            size="small"
            label="Recherche"
          style={{marginLeft:'4%',width:'50vh'}}
          />
 
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="backdark">
              <TableRow className="backdark">
                <TableCell align="left" style={{ minWidth: "100px" }} className="tabDark">Client</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }} className="tabDark">Produit</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }} className="tabDark">Quantité</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }} className="tabDark">Date</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }} className="tabDark">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .filter(data => data.idcli.toLowerCase().includes(searchValue.toLowerCase()))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, id) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <TableCell align="left" className="backdark">{data.idcli}</TableCell>
                    <TableCell align="left" className="backdark">{data.prod}</TableCell>
                    <TableCell align="left" className="backdark">{data.qt}</TableCell>
                    <TableCell align="left" className="backdark">{formatDateTime(data.daty)}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <Button
                          className='bt3'
                          onClick={() => handleEditClick(data)}
                        >
                          <i className='bi bi-eye-fill fs-5 bt3' ></i>
                        </Button>
                        <Button
                          onClick={(e) => handleDelete(data.id)}
                        >
                          <i className='bi bi-trash-fill  fs-5 bt4' ></i>
                        </Button>

                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
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
              <Typography variant="h6" id="modal-title">Détails de la commande</Typography>
              <Typography variant="body1" id="modal-description">
                Client: {selectedRow.idcli}<br />
                Produit: {selectedRow.prod}<br />
                Quantité: {selectedRow.qt}<br />
                Date: {formatDateTime(selectedRow.daty)}<br />
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Historique;
