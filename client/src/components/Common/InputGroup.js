import React from 'react'
import classnames from 'classnames';
import propTypes from 'prop-types'

const InputGroup = (props) => {
    const { name, placeholder, value, error, icon, type, onChange } = props;
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>

            </div>
            <input className={classnames('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}


InputGroup.propTypes = {
    type: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    icon: propTypes.string,
    error: propTypes.string,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}


export default InputGroup;
