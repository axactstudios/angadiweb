import React from 'react' 

const Address = () => {
  return (
    <div className="update-form">
        <div className="update-form-main">
          <div className="update-form-fields">
            <form
              // onSubmit={clickSubmit}
            >
              <input type="text"
                className="update-form-input"
                placeholder="Enter New Address"
                // onChange={handleChange('name')}
                // value={name}
              />
              <input type="text"
                className="update-form-input"
                placeholder="Enter house no."
                // onChange={handleChange('name')}
                // value={name}
              />
              <input type="text"
                className="update-form-input"
                placeholder="Enter landmark"
                // onChange={handleChange('name')}
                // value={name}
              />
              <div>
              </div>
              <button type="submit" className="update-form-button">Add</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Address;