import React from 'react'
import classnames from 'classnames';
import propTypes from 'prop-types'

const SelectListGroup = (props) => {
    const { name, value, error, info, onChange, options } = props;
    const SelectOptions = options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ));
    return (
        <div className="form-group">
            <select className={classnames('form-control form-control-lg', { 'is-invalid': error })} name={name} value={value} onChange={onChange} >
                {SelectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}


SelectListGroup.propTypes = {
    name: propTypes.string.isRequired,

    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired
}


export default SelectListGroup;
