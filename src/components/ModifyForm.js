import React, { useState, useEffect } from 'react';
import models from '../constants/models';

const ModifyForm = ({ onSubmit, modify, target }) => {
  const { user, car, order } = models;
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

  return (<div>
    <p>{target}: {modify.name} {modify.model}</p>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      {form && Object.keys(form).map((key, i) => {
        if (key === 'starts_at' || key === 'ends_at') {
          return <input type="date" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} style={{ margin: 5 }} />
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
