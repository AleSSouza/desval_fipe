const BASE_URL = 'https://parallelum.com.br/fipe/api/v2'

// Lista meses/anos de referência
export async function getReferences() {
  const res = await fetch(`${BASE_URL}/references`)
  return res.json()
}

// Lista marcas
export async function getBrands(reference) {
  const res = await fetch(`${BASE_URL}/cars/brands?reference=${reference}`)
  return res.json()
}

// Lista modelos
export async function getModels(reference, brand) {
  const res = await fetch(`${BASE_URL}/cars/brands/${brand}/models?reference=${reference}`)
  return res.json()
}

// Lista anos
export async function getYears(reference, brand, model) {
  const res = await fetch(`${BASE_URL}/cars/brands/${brand}/models/${model}/years?reference=${reference}`)
  return res.json()
}

// Consulta preço
export async function getPrice(reference, brand, model, year) {
  const res = await fetch(`${BASE_URL}/cars/brands/${brand}/models/${model}/years/${year}?reference=${reference}`)
  return res.json()
}
