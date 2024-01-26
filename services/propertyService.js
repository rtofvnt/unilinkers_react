// propertyService.js
import config from '../config/config';

const propertyBaseUrl = `${config.baseUrl}property`;

export const getProperties = async () => {
    try {
        const response = await fetch(propertyBaseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
};

export const getPropertyById = async (id) => {
    try {
        const response = await fetch(`${propertyBaseUrl}/${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching property with id ${id}:`, error);
    }
};

export const createProperty = async (data) => {
    try {

        
        const response = await fetch(propertyBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        console.log('response:',response);
        if (!response.ok) {

            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating property:', error);
    }
};

export const updateProperty = async (id, data) => {
    try {

        console.log(`${propertyBaseUrl}/${id}`); 
        const response = await fetch(`${propertyBaseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        console.log('response:', response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating property:', error);
    }
};

export const deleteProperty = async (id) => {
    try {
        const response = await fetch(`${propertyBaseUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting property:', error);
    }
};
