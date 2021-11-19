import React, { useState, useEffect } from 'react';
import models from '../constants/models';
const InputForm = ({ onSubmit, target }) => {
  const { user, car, order, types } = models;
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
      {form && Object.keys(form).map((key, i) => {
        if (key === 'active' || key === '__v') return null
        if (key === 'starts_at' || key === 'ends_at') {
          return <div  style={{ margin: 5 }}> 
            {key}: <input type="date" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} />
          </div>
        } else if (key === 'type') {
          return <div style={{ margin: 5 }}>
            {key}: <br/>
            <select name={key} value={form[key]} onChange={handleChange} key={i} >
              {types.map((type, i) => <option value={type} key={i}>{type}</option>)}
            </select>
          </div>
        } else {
          return <div  style={{ margin: 5 }}>
            {key}: <br />
            <input type="text" name={key} placeholder={key} value={form[key]} onChange={handleChange} key={i} />
          </div>

        }
      })}
      <button type="submit" style={{ margin: 5 }}>Add</button>
    </form>
  </div>
}

export default InputForm;
