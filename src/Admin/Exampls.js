import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function StudentTable() {
    // State variables for managing students data and dialog
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', address: '123 Main St', phoneNumber: '555-1234' },
        { id: 2, name: 'Jane Smith', address: '456 Elm St', phoneNumber: '555-5678' },
    ]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', phoneNumber: '' });

    // Function to open the dialog for adding or editing a student
    const handleDialogOpen = (type, student) => {
        setDialogType(type);
        // If editing, populate the form data with student details
        if (type === 'edit') {
            setFormData(student);
        } else {
            // Otherwise, reset the form data
            setFormData({ name: '', address: '', phoneNumber: '' });
        }
        // Open the dialog
        setDialogOpen(true);
    };

    // Function to close the dialog and reset form data
    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({ name: '', address: '', phoneNumber: '' });
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to add or update a student
    const handleAddOrUpdateStudent = () => {
        if (dialogType === 'add') {
            // Add new student to the list
            const newStudent = { id: students.length + 1, ...formData };
            setStudents([...students, newStudent]);
        } else {
            // Update existing student in the list
            const updatedStudents = students.map(student =>
                student.id === formData.id ? { ...student, ...formData } : student
            );
            setStudents(updatedStudents);
        }
        // Close the dialog
        handleDialogClose();
    };

    // Function to delete a student
    const handleDeleteStudent = (id) => {
        // Filter out the student with the given id
        const updatedStudents = students.filter(student => student.id !== id);
        setStudents(updatedStudents);
    };

    return (
        <div>
            {/* Button to add new student */}
            <Button variant="contained" color="primary" onClick={() => handleDialogOpen('add')}>
                Add Student
            </Button>

            {/* Table to display students data */}
            <TableContainer component={Paper}>
                <Table aria-label="student table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Map over students data to display each student */}
                        {students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.address}</TableCell>
                                <TableCell>{student.phoneNumber}</TableCell>
                                <TableCell>
                                    {/* Buttons for actions: Info, Edit, Delete */}
                                    <Button onClick={() => handleDialogOpen('info', student)}>Info</Button>
                                    <Button onClick={() => handleDialogOpen('edit', student)}>Edit</Button>
                                    <Button onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for adding/editing a student */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{dialogType === 'add' ? 'Add Student' : 'Edit Student'}</DialogTitle>
                <DialogContent>
                    {/* Form fields for student data */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Address"
                        name="address"
                        fullWidth
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        fullWidth
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    {/* Buttons for dialog actions: Cancel, Add/Update */}
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdateStudent} color="primary">
                        {dialogType === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default StudentTable;
