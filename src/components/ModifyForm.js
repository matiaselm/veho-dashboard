import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';

const ModifyForm = ({ onSubmit, modify, target, onClose, options }) => {
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

  useEffect(() => {
    console.log(form)
  }, [form])

  return (<div style={{ maxWidth: 400, padding: 10 }}>
    {onClose && <button onClick={onClose}>Peruuta</button>}
    <p>{modify.name} {modify.manufacturer} {modify.model}</p>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      {form && Object.keys(form).map((key, i) => <FormInput onChange={handleChange} type={key} value={form[key]} options={options} />)}
      <button type="submit" style={{ margin: 5 }}>Submit changes</button>
    </form>
  </div>
  )
}

export default ModifyForm;
