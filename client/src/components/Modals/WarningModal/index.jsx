import { Modal, Button } from "antd";

const WarningModal = ({ open, title, message, buttonText, onButtonClick }) => {
  return (
    <Modal
      title={title || "⚠️ Warning"}
      open={open}
      closable={false}
      centered
      maskClosable={false}
      footer={[
        <Button
          key="action"
          type="primary"
          style={{
            backgroundColor: "var(--main-color)",
            color: "var(--main-text-color)",
            border: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--main-hover-color)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--main-color)")
          }
          onClick={onButtonClick}
        >
          {buttonText || "Proceed"}
        </Button>,
      ]}
    >
      <p
        className="font-semibold text-center"
        style={{ color: "var(--main-color)" }}
      >
        {message || "Something requires your attention."}
      </p>
    </Modal>
  );
};

export default WarningModal;
