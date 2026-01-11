// import React from "react";
// import { Modal, Button } from "antd";

// const NormalModal = ({
//   open,
//   title = "Notice",
//   message = "This is a message",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   onConfirm,
//   onCancel,
//   hideCancel = false,
// }) => {
//   return (
//     <Modal
//       title={title}
//       open={open}
//       onCancel={onCancel}
//       closable={!hideCancel}
//       centered
//       maskClosable={false}
//       footer={[
//         !hideCancel && (
//           <Button key="cancel" onClick={onCancel}>
//             {cancelText}
//           </Button>
//         ),
//         <Button
//           key="confirm"
//           type="primary"
//           style={{
//             backgroundColor: "var(--main-color)",
//             color: "var(--main-text-color)",
//             border: "none",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = "var(--main-hover-color)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "var(--main-color)")
//           }
//           onClick={onConfirm}
//         >
//           {confirmText}
//         </Button>,
//       ]}
//     >
//       <p
//         className="font-semibold text-center"
//         style={{ color: "var(--main-color)" }}
//       >
//         {message}
//       </p>
//     </Modal>
//   );
// };

// export default NormalModal;


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
