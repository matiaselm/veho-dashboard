import React, { useState, useEffect } from 'react';
import models from '../constants/models';
import FormInput from './FormInput';

const InputForm = ({ onSubmit, target, options }) => {
  const { user, car, order } = models;
  const [form, setForm] = useState(null)

  useEffect(() => {
    console.log(target)
    if (target === 'cars') {
      setForm(car)
    } else if (target === 'users') {
      setForm(user)
    } else if (target === 'orders') {
      setForm(order)
    }
  }, [target, car, user, order])

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

  return <div style={{ padding: 5, border: '1px solid black' }}>
    <p style={{ fontSize: 20 }}>{target.toUpperCase()}</p>
    {form?.image_url && <img style={{ maxWidth: 300 }} src={form.image_url} alt="url" />}
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      {form && Object.keys(form).map((key, i) => <FormInput key={i} name={key} type={key} value={form[key]} onChange={handleChange} options={options} />)}
      <button type="submit" style={{ margin: 5 }}>Add</button>
    </form>
  </div>
}

export default InputForm;
