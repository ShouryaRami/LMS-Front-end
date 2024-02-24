import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Data from './Data';
import Navbar from './Navbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

function Dashboard2() {

    let refresh = useNavigate();

    /* For data change and add */
    const [data, setData] = useState(Data);
    const [formData, setFormData] = useState({
        id: "",
        company_name: "",
        company_password: "",
        company_email: "",
        company_logo: "",
        company_contact_number: "",
        company_address: "",
    });
    
    /*All things for dilog box */
    const [status, setOpen] = useState(false);
    const [item_id, setId] = useState(0);
    const handleClickOpen = (item_id, dilog_id) => {
        setOpen(true);
        setDilog(dilog_id);
        setId(item_id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    /* For all Dilog Box (number)*/
    const [dilog_number, setDilog] = useState(null);

    /* State for alert */
    const [alert, setAlert] = useState(false);

    /* For alert Agree Diagre delete dilog*/
    const handleDelete = () => {
        let dilog_stat = status
        let dilog_num = dilog_number
        let index = Data.map(function (e) {
            return e.id
        },
            handleClose()
        ).indexOf(dilog_stat, dilog_num);
        console.log(alert)
        Data.splice(index, 1);
        setAlert((e) => (!e))
        console.log(alert)
        refresh('/Admin/Dashboard');
        setTimeout(() => {
            setAlert((e) => (!e))
            console.log(alert)
        }, 3000)

    }

    // For handle change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    /* For Handle Edit Click */
    const handleEdit = (edit_id) => {
    }

    return (
        <>
            <Navbar />
            <div>
                <div>
                    <div style={{ padding: '20px', display: "flex", alignItems: 'center' }}>
                        <Fragment >
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                            <Button variant='outlined' onClick={()=>handleClickOpen(null,4)}>Click to Add Company</Button>
                                    </TableHead>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Company Name</b></TableCell>
                                            <TableCell><b>Email</b></TableCell>
                                            <TableCell><b>Passwoard</b></TableCell>
                                            <TableCell><b>Action</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Data && Data.length > 0
                                            ?
                                            Data.map((item) => {
                                                return (
                                                    <TableRow
                                                        key={item.company_name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row" >{item.company_name}</TableCell>
                                                        <TableCell align=''>{item.company_email}</TableCell>
                                                        <TableCell align=''>{item.company_contact_number}</TableCell>
                                                        <TableCell>
                                                            {/* <Link to={'/Admin/Edit'}> */}
                                                            <Button size="small" onClick={() => handleClickOpen(item.id, 1)}>Edit</Button>
                                                            {/* </Link> */}
                                                            <Button size="small" onClick={() => handleClickOpen(item.id, 2)}>Delete</Button>
                                                            <Button size="small" onClick={() => handleClickOpen(item.id, 3)}>Info</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            "No Data Available"
                                        }
                                    </TableBody>
                                </Table>

                            </TableContainer>
                        </Fragment>
                    </div>
                </div>
            </div>

            {/*For Edit dilog box*/}
            <div>
                {
                    (status && dilog_number === 1)
                        ?
                        <Dialog
                            open={handleClickOpen}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    const email = formJson.email;
                                    console.log(email);
                                    handleClose();
                                },
                            }}
                        >
                            <DialogTitle>Edit Details</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Change the details and confirm changes.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_name}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_password}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_email}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="logo"
                                    name="logo"
                                    label="logo"
                                    type="image"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_logo}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="number"
                                    name="number"
                                    label="Contact Number"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_contact_number}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={Data[item_id].company_address}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" onClick={handleEdit(item_id)}>Confirm Changes</Button>
                            </DialogActions>
                        </Dialog>
                        :
                        (
                            (status && dilog_number === 2)
                                ?
                                <Dialog
                                    open={status}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>{"Are you sure you want to delete this activity/"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Click Agree if you want to delete it 22222.
                                            Click Disagree if you dont want to delete it 2222222222.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Disagree</Button>
                                        <Button onClick={handleDelete}>Agree</Button>
                                    </DialogActions>
                                </Dialog>
                                :
                                (
                                    (status && dilog_number === 3)
                                        ?
                                        <Dialog
                                            open={handleClickOpen}
                                            onClose={handleClose}
                                            PaperProps={{
                                                component: 'form',
                                                onSubmit: (event) => {
                                                    event.preventDefault();
                                                    const formData = new FormData(event.currentTarget);
                                                    const formJson = Object.fromEntries(formData.entries());
                                                    const email = formJson.email;
                                                    console.log(email);
                                                    handleClose();
                                                },
                                            }}
                                        >
                                            <DialogTitle>View Details</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="name"
                                                    name="name"
                                                    label="Name"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_name}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="password"
                                                    name="password"
                                                    label="Password"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_password}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="email"
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_email}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="logo"
                                                    name="logo"
                                                    label="logo"
                                                    type="image"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_logo}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="number"
                                                    name="number"
                                                    label="Contact Number"
                                                    type="number"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_contact_number}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="address"
                                                    name="address"
                                                    label="Address"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    defaultValue={Data[item_id].company_address}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                            </DialogActions>
                                        </Dialog>
                                        :
                                        (
                                            (status && dilog_number === 4)
                                                ?
                                                <div>Hello</div>
                                                :
                                                <div></div>
                                        )
                                )
                        )
                }
            </div>

            {/*For Alert on agree*/}
            <div>
                {
                    alert &&
                    <Alert severity="error">
                        Activity { } is successfully deleted <strong>check it out!</strong>
                    </Alert>
                }
            </div>
        </>
    )
}


export default Dashboard2