import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Alert, Container } from '@mui/material';
import Data from './CompanyData';
import Navbar from '../Admin/Navbar';

function CompanyDashboard() {

    //All state for data, dialog open and close, for dilog type (add,edit and info)
    const [data, setData] = useState(Data);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [formData, setFormData] = useState({
        id: "",
        candidate_name: "",
        candidate_password: "",
        candidate_email: "",
        candidate_profilePic: "",
        candidate_contact_number: "",
        candidate_address: "",
    });

    //State for delete and alert
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletedcandidate, setDeletedcandidate] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '' });

    // Function to open dialog for add, edit or view candidate details
    const handleDialogOpen = (type, candidateData) => {
        setDialogType(type);
        if (type === 'edit' || type === 'info') {
            setFormData(candidateData);
        } else {
            setFormData({
                id: "",
                candidate_name: "",
                candidate_password: "",
                candidate_email: "",
                candidate_profilePic: "",
                candidate_contact_number: "",
                candidate_address: "",
            });
        }
        setDialogOpen(true);
    };

    // Function to close dialog
    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({
            id: "",
            candidate_name: "",
            candidate_password: "",
            candidate_email: "",
            candidate_profilePic: "",
            candidate_contact_number: "",
            candidate_address: "",
        });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to add or update candidate details
    const handleAddOrUpdatecandidate = () => {
        if (dialogType === 'add') {
            const newcandidate = { id: data.length + 1, ...formData };
            setData([...data, newcandidate]);
        } else {
            const updatedcandidates = data.map(candidate =>
                candidate.id === formData.id ? { ...candidate, ...formData } : candidate
            );
            setData(updatedcandidates);
        }
        handleDialogClose();
    };

    // Function to confirm deletion of a candidate
    const handleConfirmDelete = (candidate) => {
        setDeletedcandidate(candidate);
        setDeleteDialogOpen(true);
    };

    // Function to delete a candidate
    const handleDeletecandidate = () => {
        const updatedcandidates = data.filter(candidate => candidate.id !== deletedcandidate.id);
        setData(updatedcandidates);
        setDeleteDialogOpen(false);
        setAlert({ open: true, message: `candidate "${deletedcandidate && deletedcandidate.candidate_name}" successfully deleted!` });
        setDeletedcandidate(null);
    };

    //For Search Bar
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearchChange = (event) => {
        setSearchItem(event.target.value); // Update searchItem state as the user types
    };

    useEffect(() => {
        if (!searchItem) {
            setFilteredData(data); // If searchItem is empty, set filteredData to all data
            return;
        }
        const filtered = data.filter(item =>
            item.company_name.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.company_email.toLowerCase().includes(searchItem.toLowerCase()) // Filter data based on company name or email
        );
        setFilteredData(filtered);
    }, [searchItem, data]);

    return (
        <>
            <Navbar />
            <Container maxWidth="xl" sx={{ minHeight: 'calc(100vh - 64px - 128px)', display: 'flex', flexDirection: 'column', paddingTop: 4, paddingBottom: 4 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchItem}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="outlined" color="primary" sx={{ marginBottom: 2 }} onClick={() => handleDialogOpen('add')}>Add Company</Button> {/* Add Company button */}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Candidate Name</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Password</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.candidate_name}</TableCell>
                                    <TableCell>{item.candidate_email}</TableCell>
                                    <TableCell>{item.candidate_password}</TableCell>
                                    <TableCell>
                                        <Button size="small" onClick={() => handleDialogOpen('edit', item)}>Edit</Button>
                                        <Button size="small" onClick={() => handleConfirmDelete(item)}>Delete</Button>
                                        <Button size="small" onClick={() => handleDialogOpen('info', item)}>Info</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/*Edit, Add and Info Dialog box*/}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{dialogType === 'add' ? 'Add Company' : (dialogType === 'edit' ? 'Edit Company' : (dialogType === 'info' ? "Company Information" : ''))}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_name"
                            name="candidate_name"
                            label="Candidate Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_name}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_email"
                            name="candidate_email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_email}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_password"
                            name="candidate_password"
                            label="Password"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_password}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_profilePic"
                            name="candidate_profilePic"
                            label="Logo"
                            type="image"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_profilePic}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_contact_number"
                            name="candidate_contact_number"
                            label="Contact Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_contact_number}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="candidate_address"
                            name="candidate_address"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.candidate_address}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {dialogType === 'add' || dialogType === 'edit' ? (<Button onClick={handleDialogClose}>Cancel</Button>) : null}
                    <Button type="submit" onClick={handleAddOrUpdatecandidate} color="primary">{dialogType === 'add' ? 'Add' : (dialogType === 'edit' ? 'edit' : (dialogType === 'info' ? 'Done' : {}))}</Button>
                </DialogActions>
            </Dialog>

            {/*Delete Dilog box */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete Candidate "{deletedcandidate && deletedcandidate.candidate_name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
                    <Button onClick={handleDeletecandidate} color="primary">Agree</Button>
                </DialogActions>
            </Dialog>
            <div>
                {alert.open &&
                    <Alert severity="success" onClose={() => setAlert({ open: false, message: '' })}>
                        {alert.message}
                    </Alert>
                }
            </div>
        </>
    );
}

export default CompanyDashboard;