import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  card: {
    backgroundColor: '#ddd',
    margin: 5,
    maxWidth: 500
  }
}

const Cars = (props) => {
  const [cars, setCars] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/cars').then(res => {
      setCars(res.data)
    }).catch(err => console.log(err))
  }, [])

  return <div>
    <h1>Cars</h1>
    <div>
      {(Array.isArray(cars) && cars.length > 0) && cars.map(car => {
        return <div key={car.id} style={styles.card}>
          <p>{car.name} {car.manufacturer} {car.model}</p>
          <p>{car.year} {car.km} {car.fueltype}</p>
        </div>
      })}
    </div>
  </div>
}

export default Cars;
