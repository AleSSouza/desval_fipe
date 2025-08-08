import React, { useEffect, useState } from 'react'
import { getReferences, getBrands, getModels, getYears, getPrice } from './api'

export default function App() {
  const [references, setReferences] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])

  const [selectedReference, setSelectedReference] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const [price, setPrice] = useState(null)

  // Carrega as referências (meses/anos)
  useEffect(() => {
    getReferences().then(setReferences)
  }, [])

  // Carrega marcas ao selecionar referência
  useEffect(() => {
    if (selectedReference) {
      getBrands(selectedReference).then(setBrands)
    }
  }, [selectedReference])

  // Carrega modelos ao selecionar marca
  useEffect(() => {
    if (selectedBrand) {
      getModels(selectedReference, selectedBrand).then(setModels)
    }
  }, [selectedBrand, selectedReference])

  // Carrega anos ao selecionar modelo
  useEffect(() => {
    if (selectedModel) {
      getYears(selectedReference, selectedBrand, selectedModel).then(setYears)
    }
  }, [selectedModel, selectedBrand, selectedReference])

  // Consulta preço
  const handleSearch = () => {
    getPrice(selectedReference, selectedBrand, selectedModel, selectedYear).then(setPrice)
  }

  return (
    <div className="container">
      <h1>Consulta Tabela FIPE</h1>

      <label>Período (Mês/Ano)</label>
      <select value={selectedReference} onChange={(e) => setSelectedReference(e.target.value)}>
        <option value="">Selecione</option>
        {references.map((ref) => (
          <option key={ref.codigo} value={ref.codigo}>
            {ref.mes}
          </option>
        ))}
      </select>

      <label>Marca</label>
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">Selecione</option>
        {brands.map((brand) => (
          <option key={brand.codigo} value={brand.codigo}>
            {brand.nome}
          </option>
        ))}
      </select>

      <label>Modelo</label>
      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="">Selecione</option>
        {models.map((model) => (
          <option key={model.codigo} value={model.codigo}>
            {model.nome}
          </option>
        ))}
      </select>

      <label>Ano</label>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Selecione</option>
        {years.map((year) => (
          <option key={year.codigo} value={year.codigo}>
            {year.nome}
          </option>
        ))}
      </select>

      <button onClick={handleSearch} disabled={!selectedYear}>Consultar</button>

      {price && (
        <div className="result">
          <h2>Resultado</h2>
          <p><strong>Preço:</strong> {price.Valor}</p>
          <p><strong>Marca:</strong> {price.Marca}</p>
          <p><strong>Modelo:</strong> {price.Modelo}</p>
          <p><strong>Ano Modelo:</strong> {price.AnoModelo}</p>
          <p><strong>Mês Referência:</strong> {price.MesReferencia}</p>
        </div>
      )}
    </div>
  )
}
