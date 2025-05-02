import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';

const BengiEczane = ({medicinesData}) => {
    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({name: '', category: '', price: '', stock: ''});
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    
    
    useEffect(() => {
        if(medicinesData && medicinesData.length > 0) {
            setMedicines(medicinesData);
        } 
    }, [medicinesData]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(newMedicine);
        const POST = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "post",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify([[newMedicine.name, newMedicine.category, newMedicine.price, newMedicine.stock]])
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
        setNewMedicine({name: '', category: '', price: '', stock: ''});
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handleNewMedicineInputChange = (event) => {
        const { name, value } = event.target;

        if((name === 'price' || name === 'stock') && value < 0){
            return;
        }

        setNewMedicine({ ...newMedicine, [name]: value });
    }

    const addToCart = (medicine) => {
        
    }

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
                Yeni İlaç Ekle
            </Button>

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
                        name="name"
                        value={newMedicine.name}
                        onChange={handleNewMedicineInputChange}
                        placeholder="İlaç adını girin ör: vermidon"
                        />
                    </Form.Item>
                    <Form.Item label="Kategori">
                        <Input
                        name="category"
                        value={newMedicine.category}
                        onChange={handleNewMedicineInputChange}
                        placeholder="Kategori girin ör: ağrı kesici"
                        />
                    </Form.Item>
                    <Form.Item label="fiyat">
                        <Input
                        name="price"
                        value={newMedicine.price}
                        onChange={handleNewMedicineInputChange}
                        placeholder="fiyat girin ör: 10"
                        type="number"
                        />
                    </Form.Item>
                    <Form.Item label="Miktar">
                        <Input
                        name="stock"
                        value={newMedicine.stock}
                        onChange={handleNewMedicineInputChange}
                        placeholder="Miktarı girin ör: 100"
                        type='number'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default BengiEczane;