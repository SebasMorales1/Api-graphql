import { gql, useQuery } from '@apollo/client'
import styles from './App.module.css'
import { useState } from 'react'

function App() {
  const [ showDetails, SetDetails ] = useState(true)
  const [ info, setInfo ] = useState({})

  function Country({ name, continent, codeImage, capital, languages }) {
    return (
      <div 
        className={styles.country}
        onClick={() => {
          SetDetails(false)
          setInfo({
            name: name,
            continent: continent,
            flag: `https://flagsapi.com/${codeImage}/flat/64.png`,
            capital, // capital: capital
            languages: languages.map(e => e.name).join(', ')
          })
        }}
      >
        <img src={`https://flagsapi.com/${codeImage}/flat/64.png`} alt="flag" />
        <div>
          <h3>{name}</h3>
          <p>{continent}</p>
        </div>
      </div>
    )
  }

  const GET_ALL_COUNTRIES = gql`
    query getAllCountries {
      countries {
        name,
        code, 
        continent {
          name
        },
        capital,
        languages {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: { error.message }</div>

  console.log(data.countries)

  return (
    <div className='container'>
      <h1 className={styles.title}>Countries</h1>
      <section className={styles.countries_container}>
        {
          data.countries.map((country, i) => {
            return (
              <Country
                key={`${i}${country.code}`}
                name={country.name} 
                codeImage={country.code} 
                continent={country.continent.name} 
                capital={country.capital}
                languages={country.languages}
              />
            )
          })
        }
      </section>

      <div className={styles.details_country} hidden={showDetails}>
        <div className={styles.details_btn}>
          <button className={styles.btn} onClick={() => SetDetails(true)}>Close</button>
        </div>
        <img src={info.flag} alt="flag" />
        <p><span className={styles.prop}>Name:</span> {info.name}</p>
        <p><span className={styles.prop}>Continent:</span> {info.continent}</p>
        <p><span className={styles.prop}>Capital:</span> {info.capital}</p>
        <p><span className={styles.prop}>Languages:</span> {info.languages}</p>
      </div>
    </div>
  )
}

export default App
 