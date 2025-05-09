import React from 'react';
import { Modal, Form, Input } from 'antd';

const MedicineModal = ({ isVisible, onOk, onCancel, newMedicine, handleInputChange }) => {
    return (
        <Modal
            title="Yeni İlaç Ekle"
            visible={isVisible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Ekle"
            cancelText="İptal"
        >
            <Form layout="vertical">
                <Form.Item label="İlaç Adı">
                    <Input
                        name="ilaçAdı"
                        value={newMedicine.ilaçAdı}
                        onChange={handleInputChange}
                        placeholder="İlaç adını girin ör: Vermidon"
                    />
                </Form.Item>
                <Form.Item label="Kategori">
                    <Input
                        name="ilaçTürü"
                        value={newMedicine.ilaçTürü}
                        onChange={handleInputChange}
                        placeholder="Kategori girin ör: Ağrı Kesici"
                    />
                </Form.Item>
                <Form.Item label="Fiyat">
                    <Input
                        name="fiyatı"
                        value={newMedicine.fiyatı}
                        onChange={handleInputChange}
                        placeholder="Fiyat girin ör: 10"
                        type="number"
                    />
                </Form.Item>
                <Form.Item label="Miktar">
                    <Input
                        name="stokBilgisi"
                        value={newMedicine.stokBilgisi}
                        onChange={handleInputChange}
                        placeholder="Miktarı girin ör: 100"
                        type="number"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MedicineModal;