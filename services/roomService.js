import config from '../config/config';

const roomBaseUrl = `${config.baseUrl}room`;

export const getRooms = async () => {
    try {
        const response = await fetch(roomBaseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await fetch(`${roomBaseUrl}/${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching room:', error);
    }
};

export const getRoomsByProperty = async (propertyId) => {
    try {
        const response = await fetch(`${roomBaseUrl}/property/${propertyId}`);

        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching room:', error);
    }
};

export const createRoom = async (data) => {
    try {

        console.log('data:',data);
        const response = await fetch(roomBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating room:', error);
    }
};

export const updateRoom = async (id, data) => {
    try {
        console.log(`Updating room with id ${id} and data:`, data);
        const response = await fetch(`${roomBaseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating room:', error);
    }
};

export const deleteRoom = async (id) => {
    try {
        const response = await fetch(`${roomBaseUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting room:', error);
    }
};
