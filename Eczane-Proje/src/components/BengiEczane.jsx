import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, Layout, theme, Image  } from 'antd';
import './Eczane.css';
import logo from '../assets/logo.png';

const BengiEczane = ({ medicinesData }) => {
    const [medicines, setMedicines] = useState([]);
    const [cart, setCart] = useState([]);
    const [newMedicine, setNewMedicine] = useState({ ilaçAdı: '', ilaçTürü: '', fiyatı: '', stokBilgisi: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Search } = Input;
    const {
      } = theme.useToken();
    const { Content, Footer, Sider } = Layout;
    useEffect(() => {
        if (medicinesData && medicinesData.length > 0) {
            setMedicines(medicinesData);
        }
    }, [medicinesData]);

    const showModal = () => {
        setIsModalVisible(true);
    };

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

    const addToCart = (selectedMedicine) => {
        if(cart.length === 0){
            setCart([selectedMedicine])
        } else {
            setCart([ ...cart, selectedMedicine])
        }
    }

    const onSearch = (value) => {
        const filteredMedicines = medicines.filter(medicine => 
            medicine.ilaçAdı.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredMedicines);
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
            render: (_, record) => (
                <Button onClick={() => addToCart(record)}>
                    Sepete Ekle
                </Button>
            ),
        },
    ];

    return (
        <div>
            
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

            <Modal
                title="Yeni İlaç Ekle"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Ekle"
                cancelText="İptal"
            >
                <Form layout="vertical">
                    <Form.Item label="İlaç Adı">
                        <Input
                            name="ilaçAdı"
                            value={newMedicine.ilaçAdı}
                            onChange={handleNewMedicineInputChange}
                            placeholder="İlaç adını girin ör: Vermidon"
                        />
                    </Form.Item>
                    <Form.Item label="Kategori">
                        <Input
                            name="ilaçTürü"
                            value={newMedicine.ilaçTürü}
                            onChange={handleNewMedicineInputChange}
                            placeholder="Kategori girin ör: Ağrı Kesici"
                        />
                    </Form.Item>
                    <Form.Item label="Fiyat">
                        <Input
                            name="fiyatı"
                            value={newMedicine.fiyatı}
                            onChange={handleNewMedicineInputChange}
                            placeholder="Fiyat girin ör: 10"
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item label="Miktar">
                        <Input
                            name="stokBilgisi"
                            value={newMedicine.stokBilgisi}
                            onChange={handleNewMedicineInputChange}
                            placeholder="Miktarı girin ör: 100"
                            type="number"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BengiEczane;