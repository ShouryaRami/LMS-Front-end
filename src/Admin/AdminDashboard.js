import React, { useState , useEffect} from 'react';
import Navbar from './Navbar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Alert } from '@mui/material';
import Data from './Data';
import { data_2 } from './Data';
function Dashboard() {
   

    // console.log(data2)
    //All state for data, dialog open and close, for dilog type (add,edit and info)
    const [data, setData] = useState(Data);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [formData, setFormData] = useState({
        id: "",
        company_name: "",
        company_password: "",
        company_email: "",
        company_logo: "",
        company_contact_number: "",
        company_address: "",
    });

    //State for delete and alert
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletedCompany, setDeletedCompany] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '' });


    useEffect(() => {
     const fetchData = async () => {
       try {
         // Simulating fetching real data from an API endpoint
         const rdata = await data_2();
         let fdata = rdata.data;
         console.log("API Data", fdata.response);
         setData(fdata.response); // Set the real data in the state
       } catch (err) {
         console.log("data not fetched", err);
       }
     };
   
     fetchData();
   }, []);
   

    // Function to open dialog for add, edit or view company details
    const handleDialogOpen = (type, companyData) => {
        setDialogType(type);
        if (type === 'edit' || type === 'info') {
            setFormData(companyData);
        } else {
            setFormData({
                id: "",
                company_name: "",
                company_password: "",
                company_email: "",
                company_logo: "",
                company_contact_number: "",
                company_address: "",
            });
        }
        setDialogOpen(true);
    };

    // Function to close dialog
    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({
            id: "",
            company_name: "",
            company_password: "",
            company_email: "",
            company_logo: "",
            company_contact_number: "",
            company_address: "",
        });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to add or update company details
    const handleAddOrUpdateCompany = () => {
        if (dialogType === 'add') {
            const newCompany = { id: data.length + 1, ...formData };
            setData([...data, newCompany]);
        } else {
            const updatedCompanies = data.map(company =>
                company.id === formData.id ? { ...company, ...formData } : company
            );
            setData(updatedCompanies);
        }
        handleDialogClose();
    };

    // Function to confirm deletion of a company
    const handleConfirmDelete = (company) => {
        setDeletedCompany(company);
        setDeleteDialogOpen(true);
    };

    // Function to delete a company
    const handleDeleteCompany = () => {
        const updatedCompanies = data.filter(company => company.id !== deletedCompany.id);
        setData(updatedCompanies);
        setDeleteDialogOpen(false);
        setAlert({ open: true, message: `Company "${deletedCompany && deletedCompany.company_name}" successfully deleted!` });
        setDeletedCompany(null);
    };

    return (
        <>
            <Navbar />
            <div>
                <div style={{ padding: '20px', display: "flex", alignItems: 'center' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <Button variant="outlined" color="primary" onClick={() => handleDialogOpen('add')}>
                                    Add Company
                                </Button>
                            </TableHead>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Company Name</b></TableCell>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell><b>Password</b></TableCell>
                                    <TableCell><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.company_name}</TableCell>
                                        <TableCell>{item.company_email}</TableCell>
                                        <TableCell>{item.company_password}</TableCell>
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
                </div>
            </div>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{dialogType === 'add' ? 'Add Company' : (dialogType === 'edit' ? 'Edit Company' : (dialogType === 'info' ? "Company Information" : ''))}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_name"
                            name="company_name"
                            label="Company Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.company_name}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_email"
                            name="company_email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={formData.company_email}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_password"
                            name="company_password"
                            label="Password"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.company_password}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_logo"
                            name="company_logo"
                            label="Logo"
                            type="file"
                            fullWidth
                            variant="standard"
                            value={formData.company_logo}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_contact_number"
                            name="company_contact_number"
                            label="Contact Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={formData.company_contact_number}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="company_address"
                            name="company_address"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formData.company_address}
                            onChange={handleChange}
                            InputProps={dialogType === 'info' ? { readOnly: true } : {}}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {dialogType === 'add' || dialogType === 'edit' ? (<Button onClick={handleDialogClose}>Cancel</Button>) : null}
                    <Button type="submit" onClick={handleAddOrUpdateCompany} color="primary">{dialogType === 'add' ? 'Add' : (dialogType === 'edit' ? 'edit' : (dialogType === 'info' ? 'Done' : {}))}</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete company "{deletedCompany && deletedCompany.company_name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
                    <Button onClick={handleDeleteCompany} color="primary">Agree</Button>
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

export default Dashboard;