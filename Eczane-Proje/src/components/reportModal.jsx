import './reportModal.css';
import { Modal } from 'antd';

const ReportModal = ({ isModalOpen, handleOk, mail, medicines }) => {
    const sonToplam = medicines.reduce((toplam, element) => toplam + Number(element.fiyatı), 0);

    return (
        <Modal
            title="Satış Raporu"
            open={isModalOpen}
            onOk={handleOk}
        >
            <div className="report-modal-content">
                <p><strong>Mail:</strong> {mail}</p>
                <p>
                    <strong>Alınan İlaçlar:</strong>
                    <ul>
                        {medicines.map((element, idx) => (
                            <li key={idx}>
                                {element.ilaçAdı} - {element.ilaçTürü}
                            </li>
                        ))}
                    </ul>
                </p>
                <p><strong>Toplam:</strong> {sonToplam} TL</p>
            </div>
        </Modal>
    );
}

export default ReportModal;