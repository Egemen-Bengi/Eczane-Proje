import { Form, Input, Modal } from 'antd';

const CustomerMailAddress = ({ isVisible, onOk, onCancel, newCustomer, handleInputChange }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log('Geçerli:', values);
                onOk(values);
                form.resetFields();
            })
            .catch((errorInfo) => {
                console.log('Validasyon hatası:', errorInfo);
            });
    };

    return (
        <Modal
            title="Satış Raporu"
            visible={isVisible}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Satış raporu oluştur"
            cancelText="İptal"
        >
            <Form form={form} layout="vertical" name="mailForm">
                <Form.Item
                    label="Mail adresi"
                    name="mailAdresi"
                    rules={[
                        {
                            required: true,
                            message: 'Mail adresi zorunludur',
                        },
                        {
                            type: 'email',
                            message: 'Geçerli bir mail adresi girin',
                        },
                    ]}
                >
                    <Input 
                        name='mailAdresi'
                        placeholder="ör: ilac@gmail.com"
                        value={newCustomer.mailAdresi}
                        onChange={handleInputChange}
                        />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CustomerMailAddress;