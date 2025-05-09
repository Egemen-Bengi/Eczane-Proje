import './App.css'
import BengiEczane from './components/BengiEczane'
import GetMedicine from './components/getMedicine'

function App() {
  return <BengiEczane medicinesData={[
    {
      ilaçAdı: 'Aspirin',
      ilaçTürü: 'Ağrı Kesici',
      fiyatı: 10,
      stokBilgisi: 100
    },
    {
      ilaçAdı: 'Parol',
      ilaçTürü: 'Ağrı Kesici',
      fiyatı: 15,
      stokBilgisi: 50
    },
    {
      ilaçAdı: 'Amoksisilin',
      ilaçTürü: 'Antibiyotik',
      fiyatı: 20,
      stokBilgisi: 30
    },
    {
      ilaçAdı: 'Ibuprofen',
      ilaçTürü: 'Ağrı Kesici',
      fiyatı: 12,
      stokBilgisi: 80
    },
    {
      ilaçAdı: 'Kodein',
      ilaçTürü: 'Ağrı Kesici',
      fiyatı: 25,
      stokBilgisi: 20
    }
  ]}></BengiEczane>//<GetMedicine></GetMedicine>
}

export default App