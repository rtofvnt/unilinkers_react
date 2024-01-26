// PropertyPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPropertyById, updateProperty} from './services/propertyService';


const PropertyPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState({ name: '', address: '' });


    const handleUpdate = async () => {
        try {
      
            await updateProperty(propertyId, property);
            // Handle successful update
        } catch (error) {
            console.error("Failed to update property:", error);
            // Optionally handle the error in the UI
        }
    };

    useEffect(() => {
        const fetchProperty = async () => {
            const propertyData = await getPropertyById(propertyId);

          
            if (propertyData) {
                setProperty(propertyData);
            }
        };

        fetchProperty();
    }, [propertyId]);

    return (
        <div className="container">
            <div className='table'>
            <table className="table table-striped">
                <thead> 
                    <tr>
                        <th colSpan='6'>Edit  Property</th>
                    </tr>    
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Property name"
                                    value={property.name}
                                    onChange={(e) => setProperty({ ...property, name: e.target.value })}
                        />
                               
                    </td>
                    <td colSpan="3">
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Property address"
                                    value={property.address}
                                    onChange={(e) => setProperty({ ...property, address: e.target.value })}
                        />
                             
                    </td>
                    <td >
                        <button className='btn btn-sm btn-success' onClick={handleUpdate}>
                            UPDATE
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

export default PropertyPage;
