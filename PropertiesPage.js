// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProperties, createProperty, deleteProperty } from './services/propertyService';




const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [newPropertyName, setNewPropertyName] = useState('');
    const [newPropertyAddress, setNewPropertyAddress] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchProperties();
    }, []);


    const fetchProperties = async () => {
        const propertiesData = await getProperties();
        setProperties(propertiesData);
    };

    const handleAddNewProperty = async () => {
        const newPropertyData = {
            name: newPropertyName,
            address: newPropertyAddress,
        };

        const newErrors = {};
        if (!newPropertyName.trim()) {
            newErrors.name = ["The name field is required."];
        }
        if (!newPropertyAddress.trim()) {
            newErrors.address = ["The address field is required."];
        }

        if (Object.keys(newErrors).length) {
            setFormErrors(newErrors);
            return; // Stop the function if there are validation errors
        }

        try {
            const addedProperty = await createProperty(newPropertyData);
            setProperties(prevProperties => [...prevProperties, addedProperty]);
            setNewPropertyName('');
            setNewPropertyAddress('');
            setFormErrors({}); // Clear previous errors
        } catch (error) {
            if (error && error.status === 422) {
                const errorData = await error.json(); // Parse the JSON error response
                setFormErrors(errorData.errors);
            } else {
                console.error("Failed to add new property:", error);
                // Optionally handle other types of errors in the UI
            }
        }
    };

    const handleDeleteProperty = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this property?");
        if (isConfirmed) {
            try {
                await deleteProperty(id);
                setProperties(prevProperties => prevProperties.filter(property => property.id !== id));
            } catch (error) {
                console.error("Failed to delete property:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className='table'>
            <table className="table table-striped">

                <thead> 
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Rooms</th>
                    <th colSpan='2'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* Property Rows */}
                {properties.map(property => (
                    <tr key={property.id}>
                        <td>{property.name}</td>
                        <td>{property.address}</td>
                        <td>
                            <Link className='btn btn-sm btn-success' to={`/rooms/property/${property.id}`}>View Rooms ({property.rooms ? property.rooms.length : 0})</Link>
                        </td>
                        <td>
                            <Link className='btn btn-sm btn-info'  to={`/property/${property.id}`} >EDIT</Link>
                        </td>
                        <td>    
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={() => handleDeleteProperty(property.id)}
                            >
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))}

                <tr>
                    <th colSpan='5'>Add New Property</th>

                </tr>    
                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Property name"
                            value={newPropertyName}
                            onChange={e => setNewPropertyName(e.target.value)}
                            required
                        />
                                {formErrors.name && <div className="alert alert-danger">{formErrors.name[0]}</div>}
                    </td>
                    <td colSpan="3">
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Property address"
                            value={newPropertyAddress}
                            onChange={e => setNewPropertyAddress(e.target.value)}
                            required
                        />
                                {formErrors.address && <div className="alert alert-danger">{formErrors.address[0]}</div>}
                    </td>
                    <td colSpan="2">
                        <button
                            className='btn btn-sm btn-success'
                            onClick={handleAddNewProperty}
                        >
                            Add New Property
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PropertiesPage;
