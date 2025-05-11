import './App.css'
import BengiEczane from './components/BengiEczane'
import GetMedicine from './components/getMedicine'

function App() {
  // return <BengiEczane medicinesData={[
  //   {
  //     row_id: 1,
  //     ilaçAdı: 'Aspirin',
  //     ilaçTürü: 'Ağrı Kesici',
  //     fiyatı: 10,
  //     stokBilgisi: 100
  //   },
  //   {
  //     row_id: 2,
  //     ilaçAdı: 'Parol',
  //     ilaçTürü: 'Ağrı Kesici',
  //     fiyatı: 15,
  //     stokBilgisi: 50
  //   },
  //   {
  //     row_id: 3,
  //     ilaçAdı: 'Amoksisilin',
  //     ilaçTürü: 'Antibiyotik',
  //     fiyatı: 20,
  //     stokBilgisi: 30
  //   },
  //   {
  //     row_id: 4,
  //     ilaçAdı: 'Ibuprofen',
  //     ilaçTürü: 'Ağrı Kesici',
  //     fiyatı: 12,
  //     stokBilgisi: 80
  //   },
  //   {
  //     row_id: 5,
  //     ilaçAdı: 'Kodein',
  //     ilaçTürü: 'Ağrı Kesici',
  //     fiyatı: 25,
  //     stokBilgisi: 20
  //   }
  // ]}></BengiEczane>
  return <GetMedicine></GetMedicine>
}

export default App