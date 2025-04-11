import { useEffect, useState, useTransition } from 'react'
import { getCityTop, getWeather } from './util'

export function Weather() {
  const [isPending, startTransition] = useTransition()

  const [cityList, setCityList] = useState([
    {
      id: '101010100',
      name: '北京',
    },
  ])

  const [weather, setWeather] = useState<{
    text: string
    temp: string
    icon: string
  }>({
    text: '',
    temp: '',
    icon: '',
  })

  useEffect(() => {
    startTransition(async () => {
      const data = await getCityTop()
      setCityList(data)
    })

    getNew({ target: { value: '101010100' } })
  }, [])

  const getNew = async ({ target }: { target: { value: string } }) => {
    startTransition(async () => {
      const { now } = await getWeather(target.value)
      setWeather(now)
      console.log('🚀 ~ getNew ~ data:', now)
    })
  }

  return (
    <>
      <select onChange={getNew}>
        {cityList.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>

      {isPending ? (
        <p>loading...</p>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <i className={`qi-${weather.icon}`} />
          <p style={{ marginRight: 20 }}>{weather.text}</p>
          <p>{weather.temp} °C</p>
        </div>
      )}
    </>
  )
}
