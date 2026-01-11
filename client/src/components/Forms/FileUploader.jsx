// import React, { useState, useEffect } from "react";
// import { Upload, Modal } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const FileUploader = ({ maxCount = 1, accept = "*", onChange, resetTrigger }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [fileList, setFileList] = useState([]);

//   const handleCancel = () => setPreviewOpen(false);

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf("/") + 1));
//   };

//   const handleChange = async ({ fileList }) => {
//     setFileList(fileList);

//     if (onChange) {
//       const filesData = await Promise.all(
//         fileList.map(async (file) => {
//           if (file.originFileObj) {
//             const base64 = await getBase64(file.originFileObj);
//             const matches = base64.match(/^data:(.+);base64,(.+)$/);
//             return {
//               file_name: file.name,
//               mime_type: matches?.[1] || file.type || "application/octet-stream",
//               base64_content: matches?.[2] || "",
//             };
//           }
//           return null;
//         })
//       );

//       onChange(filesData.filter(Boolean));
//     }
//   };

//   // ⛳ Watch for reset trigger from parent
//   useEffect(() => {
//     if (resetTrigger !== undefined) {
//       setFileList([]);
//       if (onChange) onChange([]);
//     }
//   }, [resetTrigger]);

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <>
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         beforeUpload={() => false}
//         accept={accept}
//         maxCount={maxCount}
//       >
//         {fileList.length >= maxCount ? null : uploadButton}
//       </Upload>

//       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//         {previewImage && <img alt="preview" style={{ width: "100%" }} src={previewImage} />}
//       </Modal>
//     </>
//   );
// };

// export default FileUploader;



import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUploader = ({
  maxCount = 1,
  accept = "*",
  onChange,
  resetTrigger,
  width = "104px",
  height = "104px",
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = async ({ fileList }) => {
    setFileList(fileList);

    if (onChange) {
      const filesData = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) {
            const base64 = await getBase64(file.originFileObj);
            const matches = base64.match(/^data:(.+);base64,(.+)$/);
            return {
              file_name: file.name,
              mime_type: matches?.[1] || file.type || "application/octet-stream",
              base64_content: matches?.[2] || "",
            };
          }
          return null;
        })
      );
      onChange(filesData.filter(Boolean));
    }
  };

  useEffect(() => {
    if (resetTrigger !== undefined) {
      setFileList([]);
      if (onChange) onChange([]);
    }
  }, [resetTrigger]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
        accept={accept}
        maxCount={maxCount}
        className="custom-uploader"
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        {previewImage && <img alt="preview" style={{ width: "100%" }} src={previewImage} />}
      </Modal>

      {/* ✅ Force AntD card sizing */}
      <style>
        {`
          .custom-uploader .ant-upload-list-picture-card-container,
          .custom-uploader .ant-upload-select-picture-card {
            width: ${width} !important;
            height: ${height} !important;
          }
          .custom-uploader .ant-upload-list-item {
            width: ${width} !important;
            height: ${height} !important;
          }
          .custom-uploader .ant-upload-list-item-thumbnail img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </>
  );
};

export default FileUploader;
