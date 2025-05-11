import React from 'react';
import { Modal, Form, Input } from 'antd';

const CustomerMailAddress = ({ isVisible, onOk, onCancel, newCustomer, handleInputChange }) => {
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
                <Form.Item label="Mail adresi"
                    rules={[
                        {
                            required: true,
                            message: 'Mail adresi zorunludur',
                        },
                        {
                            type: 'email',
                            message: 'Geçerli bir mail adresi girin',
                        },
                    ]}>
                    <Input
                        name='mailAdresi'
                        value={newCustomer.mailAdresi}
                        onChange={handleInputChange}
                        placeholder="Mail adresini girin ör: ilaç@gmail.com"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CustomerMailAddress;