import React, { useState, useEffect } from 'react';

export default function Address({ address, onSaveAddress }) {
  // Initialize the local state with the passed address
  const [street, setStreet] = useState(address.street);
  const [suburb, setSuburb] = useState(address.suburb);
  const [province, setProvince] = useState(address.province);
  const [postcode, setPostcode] = useState(address.postcode);

  // Update the local state if the address prop changes
  useEffect(() => {
    setStreet(address.street);
    setSuburb(address.suburb);
    setProvince(address.province);
    setPostcode(address.postcode);
  }, [address]);

  // Function to handle saving the address
 const handleSaveAddress = () => {
  console.log('Saving address...', street, suburb, province, postcode);
  const newAddress = {
    street,
    suburb,
    province,
    postcode,
  };
  console.log('New Address:', newAddress);
  onSaveAddress(newAddress);
};

  

  return (
    <div className='address'>
      <div className="address-container">
        <label htmlFor="street">Street</label>
        <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
      </div>

      <div className="address-container">
        <label htmlFor="suburb">Suburb</label>
        <input type='text' id="suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)} />
      </div>

      <div className="address-container">
        <label htmlFor="province">Province</label>
        <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
      </div>

      <div className="address-container">
        <label htmlFor="postcode">Postcode</label>
        <input type='text' id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
      </div>
      <button onClick={handleSaveAddress}>Save</button>
    </div>
  );
}
