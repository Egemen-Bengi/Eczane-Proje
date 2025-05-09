import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Layout, theme, Image, notification  } from 'antd';
import './Eczane.css';
import logo from '../assets/logo.png';
import MedicineModal from './NewMedicineModal';
import CustomerMailAddress from './CustomerMailAddress';

const BengiEczane = ({ medicinesData }) => {
    const [medicines, setMedicines] = useState([]);
    const [customerMail, setCustomerMail] = useState('');
    const [cart, setCart] = useState([]);
    const [newMedicine, setNewMedicine] = useState({ ilaçAdı: '', ilaçTürü: '', fiyatı: '', stokBilgisi: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
    const { Search } = Input;
    const {
      } = theme.useToken();
    const { Content, Footer, Sider } = Layout;
    const [mail, mailContextHolder] = notification.useNotification(); 
    const [empty, emptyContextHolder] = notification.useNotification(); 
    const [existing, existingContextHolder] = notification.useNotification();
    const openMailNotification = (placement) => {
        mail.info({
            description: `alınan ilaçlar: ${cart.map(medicine => medicine.ilaçAdı).join(', ')}\n ${customerMail.mailAdresi} adresine mail olarak atıldı`,
            placement,
        });
    };
    const openEmptyNotification = (placement) => {
        empty.info({
            description: "Sepetinizde hiç ilaç yok.",
            placement,
        });
    }
    const openExistingNotification = (placement) => {
        existing.info({
            description: "Bu ilaç zaten sepetinizde mevcut.",
            placement,
        });
    }

    useEffect(() => {
        if (medicinesData && medicinesData.length > 0) {
            setMedicines(medicinesData);
        }
    }, [medicinesData]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalMail = () => {
        setIsCustomerModalVisible(true)
    }

    const handleOk = async () => {
        const POST = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "post",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify([[newMedicine.ilaçAdı, newMedicine.ilaçTürü, newMedicine.fiyatı, newMedicine.stokBilgisi]]),
            };

            fetch("https://v1.nocodeapi.com/bengi/google_sheets/CNbzVtWjswSphVic?tabId=Sayfa1", requestOptions)
                .then(response => response.json())
                .then(result => {
                    return result;
                })
                .catch(error => {
                    throw error;
                });
        }

        //POST();
        setMedicines([...medicines, newMedicine]);
        setNewMedicine({ilaçAdı: '', ilaçTürü: '', fiyatı: '', stokBilgisi: ''});
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleNewMedicineInputChange = (event) => {
        const { name, value } = event.target;

        if ((name === 'fiyatı' || name === 'stokBilgisi') && value < 0) {
            return;
        }

        setNewMedicine({ ...newMedicine, [name]: value });
    };

    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === 'email' && !emailRegex.test(value)) {
            console.error("Geçersiz e-posta adresi formatı");
            return;
        }
        setCustomerMail({ ...customerMail, [name]: value });
    }

    const handleCancelMail = () => {
        setIsCustomerModalVisible(false)
    }

    const addToCart = (selectedMedicine) => {
        if(cart.length === 0){
            setCart([selectedMedicine])
        } else {
            const existingMedicine = cart.find(medicine => medicine.ilaçAdı === selectedMedicine.ilaçAdı);
            if(existingMedicine){
                openExistingNotification('top');
            } else {
                setCart([ ...cart, selectedMedicine])
            }
        }
    }

    const onSearch = (value) => {
        if(value === ""){
            setMedicines(medicinesData);
        } else {
            const filteredMedicines = medicines.filter(medicine => 
                medicine.ilaçAdı.toLowerCase().includes(value.toLowerCase())
            );
            setMedicines(filteredMedicines);
        }
    }

    const sepetiOnayla = () => {
        if(cart.length === 0){
            openEmptyNotification('top');
        } else{
            showModalMail();
            openMailNotification('top');
            console.log(customerMail);
        }
    }

    const columns = [
        {
            title: 'İlaç Adı',
            dataIndex: 'ilaçAdı',
            key: 'ilaçAdı',
        },
        {
            title: 'Kategori',
            dataIndex: 'ilaçTürü',
            key: 'ilaçTürü',
            filters: [
                { text: 'Ağrı Kesici', value: 'Ağrı Kesici' },
                { text: 'Antibiyotik', value: 'Antibiyotik' },
                { text: 'Soğuk Algınlığı', value: 'Soğuk Algınlığı' },
                { text: 'Vitamin', value: 'Vitamin' },
                { text: 'Bebek Bezi', value: 'Bebek Bezi' },
            ],
            onFilter: (value, record) => record.ilaçTürü.includes(value),
        },
        {
            title: 'Fiyat',
            dataIndex: 'fiyatı',
            key: 'fiyatı',
            render: (text) => `${text} TL`
        },
        {
            title: 'Miktar',
            dataIndex: 'stokBilgisi',
            key: 'stokBilgisi',
        },
        {
            title: 'İşlemler',
            key: 'action',
            render: (_, medicine) => (
                <Button onClick={() => addToCart(medicine)}>
                    Sepete Ekle
                </Button>
            ),
        },
    ];

    return (
        <div>
            {existingContextHolder}
            {mailContextHolder}
            {emptyContextHolder}            
            <Layout>
                <div style={{ padding: '0 48px' }}>
                    <Layout>
                    <Sider>
                        <Image
                            width={100}
                            src={logo}
                            alt='logo'
                        />
                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <Button type="primary" onClick={showModal} style={{ width: '100%', marginBottom: '16px' }}>
                                Yeni İlaç Ekle
                            </Button>
                            <Search placeholder="ilaç adı girin" onSearch={onSearch} enterButton />
                            <Button type="primary" onClick={showModalMail} style={{ width: '100%', marginTop: '16px' }}>
                                Sepeti Onayla
                            </Button>
                        </div>
                    </Sider>
                    <Content>
                        <Table columns={columns} dataSource={medicines} rowKey="row_id" />
                    </Content>
                    </Layout>
                </div>
                <Footer>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
            <MedicineModal
                isVisible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                newMedicine={newMedicine}
                handleInputChange={handleNewMedicineInputChange}
            />
            <CustomerMailAddress
                isVisible={isCustomerModalVisible}
                onOk={sepetiOnayla}
                onCancel={handleCancelMail}
                newCustomer={customerMail}
                handleInputChange={handleCustomerInputChange}
            />
        </div>
    );
};

export default BengiEczane;