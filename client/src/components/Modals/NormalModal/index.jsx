import { Modal, Button } from "antd";

const NormalModal = ({
  open,
  title = "Modal",
  children,
  confirmText = "Proceed",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  hideCancel = false,
  width = 600,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      centered
      maskClosable={false}
      width={width}
      footer={[
        !hideCancel && (
          <Button key="cancel" onClick={onCancel}>
            {cancelText}
          </Button>
        ),
        onConfirm && (
          <Button
            key="confirm"
            type="primary"
            style={{
              backgroundColor: "var(--main-color)",
              color: "var(--main-text-color)",
              border: "none",
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        ),
      ]}
    >
      {children}
    </Modal>
  );
};

export default NormalModal;
