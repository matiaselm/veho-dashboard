import { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../url';
import InputForm from '../components/InputForm'
import ModifyForm from '../components/ModifyForm'
import Box from '../components/Box';

const Cars = (props) => {
  const [cars, setCars] = useState(null)
  const [modify, setModify] = useState(null);
  const [addFormVisible, setAddFormVisible] = useState(false);

  useEffect(() => {
    getCars()
  }, [])

  const getCars = async () => {
    axios.get(`${url}/cars`).then(res => {
      setCars(res.data)
    }).catch(err => console.error(err))
  }

  const onModify = () => {
    axios.post(`${url}/cars/${modify._id}`, modify).then(res => {
      console.log(res)
      getCars()
    }).catch(err => console.error(err))
  }

  const onSubmit = (body) => {
    axios.post(`${url}/cars`, body).then(res => {
      console.log(res)
      getCars()
    }).catch(err => console.error(err))
  }

  const onRemove = (car) => {
    const c = window.confirm(`Remove ${car.manufacturer} ${car.model}?`)
    if(c) axios.delete(`${url}/cars/${car._id}`).then(res => {
      console.log(res)
      getCars()
    }).catch(err => console.error(err))
  }

  return <div>
    <h1>Cars</h1>
    {modify && <ModifyForm modify={modify} target='cars' onSubmit={onModify} onClose={() => setModify(null)}/>}
    {addFormVisible && <InputForm target='cars' onSubmit={onSubmit} />}
    <div>
      Autot <button onClick={getCars}>Refresh</button><button onClick={() => setAddFormVisible(!addFormVisible)}>Add</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {(Array.isArray(cars) && cars.length > 0) && cars.map(car => {
          return <Box key={car._id} image_url={car.image_url} onPressModify={() => setModify(car)} onPressRemove={() => onRemove(car)} >
            <p>{car.name} {car.manufacturer} {car.model}</p>
            <p>{car.year} {car.km} {car.fueltype}</p>
            <p>ID: {car._id}</p>
          </Box>
        })}
      </div>
    </div>
  </div>
}

export default Cars;
