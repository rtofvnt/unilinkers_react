// RoomPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById, updateRoom } from './services/roomService';

const RoomPage = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState({ name: '', area_sqm: '', area_sqft: '' });

    const handleUpdate = async () => {
        try {
            await updateRoom(roomId, room);
            alert("Room data updated");
            
        } catch (error) {
            console.error("Failed to update room:", error);
            // Optionally handle the error in the UI
        }
    };

    useEffect(() => {
        const fetchRoom = async () => {
            const roomData = await getRoomById(roomId);
           
            if (roomData) {
                setRoom(roomData);
            }
        };

        fetchRoom();
    }, [roomId]);

    return (
        <div className="container">
            <div className='table'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th colSpan='5'>Edit Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Room name"
                                    value={room.name}
                                    onChange={(e) => setRoom({ ...room, name: e.target.value })}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Area Sq Meters"
                                    value={room.area_sqm}
                                    onChange={(e) => setRoom({ ...room, area_sqm: e.target.value })}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Area Sq Feet"
                                    value={room.area_sqft}
                                    onChange={(e) => setRoom({ ...room, area_sqft: e.target.value })}
                                    required
                                />
                            </td>
                            <td>
                                <button className='btn btn-sm btn-success' onClick={handleUpdate}>
                                    UPDATE
                                </button>
                            </td>
                            <td>
                                <Link className='btn btn-sm btn-info' to={`/rooms/property/${room.property_id}`} >BACK TO ROOMS</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomPage;
