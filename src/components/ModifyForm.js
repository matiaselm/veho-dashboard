import React, { useState, useEffect } from 'react';

const ModifyForm = ({ onSubmit, modify, target, onClose }) => {
  const [form, setForm] = useState(modify);

  useEffect(() => {
    setForm(modify)
  }, [modify]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm(null)
  }

  return (<div style={{ maxWidth: 400, padding: 10 }}>
    <p>{modify.name} {modify.manufacturer} {modify.model} { onClose && <button onClick={onClose}>Peruuta</button>}</p>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      {form && Object.keys(form).map((key, i) => {
        if( key=== '_id' || key === '__v') {
          return null
        } else if (key === 'starts_at' || key === 'ends_at') {
          return <input type="date" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} style={{ margin: 5 }} />
        } else if(key === 'active' ) {
          return <input type="checkbox" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} style={{ margin: 5 }} />
        } else {
          return <input type="text" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} style={{ margin: 5 }} />
        }
      })}
      <button type="submit" style={{ margin: 5 }}>Submit changes</button>
    </form>
  </div>
  )
}

export default ModifyForm;
