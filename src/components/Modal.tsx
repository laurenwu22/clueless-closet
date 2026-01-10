import "./Modal.css"
import Check from "../images/check.svg"

interface ModalProps {
    text: string;
    onClose: () => void;
}

export default function Modal ( {text, onClose} : ModalProps) {
    return (
        <div className="modal">
            <div className="modal-content">
                <img src={Check} />
                <p>{text}</p>
                <div className="btn blue" onClick={onClose}>OK</div>
            </div>
        </div>
    )
}