import React from 'react';

const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 5
    }
}

const FormInput = ({ type, value, onChange, options }) => {
    if (['active', '_id', '__v'].includes(type)) return null;
    if (['starts_at', 'ends_at'].includes(type)) return <div style={styles.row}><label>{type}</label>{new Date(value).toLocaleString()}<br/><input type='datetime-local' name={type} value={value} onChange={onChange} /></div>;
    if (type === 'type') return <div style={styles.row}><label>{type}</label><select name={type} value={value} onChange={onChange} >
        {options.map((option, i) => <option value={option} key={i}>{option}</option>)}
    </select></div>;
    return <div style={styles.row}><label>{type}</label><input type='text' name={type} value={value} onChange={onChange} /></div>;
}

export default FormInput;
