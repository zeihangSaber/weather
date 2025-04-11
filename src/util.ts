export async function getWeather(locationId: string) {
  const apiKey = '2a94ca66377344319b9f623ecd98c50f'
  const url = `https://nv2tumpk8e.re.qweatherapi.com/v7/weather/now?location=${locationId}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('获取天气数据失败:', error)
    return null
  }
}

export async function getCityTop() {
  const apiKey = '2a94ca66377344319b9f623ecd98c50f'
  const url = `https://nv2tumpk8e.re.qweatherapi.com/geo/v2/city/top?number=5&range=cn&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.topCityList
  } catch (error) {
    console.error('获取天气数据失败:', error)
    return null
  }
}

// /geo/v2/city/top
