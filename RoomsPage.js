// RoomsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getRoomsByProperty, createRoom, deleteRoom } from './services/roomService';

const RoomsPage = () => {
    const { propertyId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomAreaSqm, setNewRoomAreaSqm] = useState('');
    const [newRoomAreaSqft, setNewRoomAreaSqft] = useState('');
    

    useEffect(() => {
        const fetchRooms = async () => {
            console.log('propertyId:', propertyId);
            const roomsData = await getRoomsByProperty(propertyId);
            setRooms(roomsData);
        };

        fetchRooms();
    }, [propertyId]);

    const handleAddNewRoom = async () => {
        const newRoomData = {
            name: newRoomName,
            area_sqm: newRoomAreaSqm,
            area_sqft: newRoomAreaSqft,
            property_id: propertyId // Assuming this is the property ID to which the room belongs
        };

        try {
            const addedRoom = await createRoom(newRoomData);
            setRooms([...rooms, addedRoom]);
            // Reset form fields
            setNewRoomName('');
            setNewRoomAreaSqm('');
            setNewRoomAreaSqft('');
            
        } catch (error) {
            // Handle errors (e.g., set formErrors based on the error response)
        }
    };
    
    const handleDeleteRoom = async (roomId) => {
        
        const isConfirmed = window.confirm("Are you sure you want to delete this room?");
        if (isConfirmed) {
            try {
                await deleteRoom(roomId);
                setRooms(rooms.filter(room => room.id !== roomId));
            } catch (error) {
                // Handle errors
            }
        }    
    };

    // Add functions for createRoom, updateRoom, deleteRoom here
    // These functions should call the respective service functions and then refetch the rooms
    
    return (
        <div className="container">
            <div className='table'>
                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Area Sq Meters</th>
                            <th>Area Sq Feets</th>
                            <th colSpan='2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            {/* Add components for creating, updating, and deleting rooms here */}
            {rooms.map(room => (
                <tr key={room.id}>
                    <td>{room.name}</td>
                    <td>{room.area_sqm}</td>
                    <td>{room.area_sqft}</td>
                    
                    <td>
                        <Link className='btn btn-sm btn-info' to={`/room/${room.id}`} >EDIT</Link>
                    </td>
                    <td>
                        <button
                            className='btn btn-sm btn-danger'
                            onClick={() => handleDeleteRoom(room.id)}
                        >
                            DELETE
                        </button>
                    </td>
                </tr>
            ))}
            
                        <tr>

                            <th colSpan='5'>Add new room to property</th>
                        </tr>

                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Room name"
                                    value={newRoomName}
                                    onChange={e => setNewRoomName(e.target.value)}
                                    required
                                />
                                {/* Error message display */}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="area_sqm"
                                    placeholder="Area Sq Meters"
                                    value={newRoomAreaSqm}
                                    onChange={e => setNewRoomAreaSqm(e.target.value)}
                                />
                                {/* Error message display */}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="area_sqft"
                                    placeholder="Area Sq Feet"
                                    value={newRoomAreaSqft}
                                    onChange={c => setNewRoomAreaSqft(c.target.value)}
                                />
                                {/* Error message display */}
                            </td>
                            <td>
                                <button
                                    className='btn btn-sm btn-success'
                                    onClick={handleAddNewRoom}
                                >
                                    Add New Room
                                </button>
                            </td>
                            <td> <Link className='btn btn-sm btn-info' to={`/properties/`} >BACK TO PROPERTIES</Link> </td>
                        </tr>
            </tbody>
            </table>

           </div>     
        </div>
    );
};

export default RoomsPage;