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

  useEffect(() => {
    startTransition(async () => {
      const data = await getCityTop()
      setCityList(data)
    })

    getNew({ target: { value: '101010100' } })
  }, [])

  const getNew = async ({ target }: { target: { value: string } }) => {
    startTransition(async () => {
      const data = await getWeather(target.value)
      console.log('🚀 ~ getNew ~ data:', data.now)
    })
  }

  return (
    <>
      <p>{isPending ? 'loading' : 'done'}</p>
      <select onChange={getNew}>
        {cityList.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>
    </>
  )
}
