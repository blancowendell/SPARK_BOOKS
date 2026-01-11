import React, { useState } from 'react';
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

const FilePreview = ({ images }) => {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  const onDownload = () => {
    const currentImg = images[current];
    const { mime_type, base64_content, file_name } = currentImg;

    const byteCharacters = atob(base64_content);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mime_type });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file_name || `image-${current}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <Image.PreviewGroup
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          }
        ) => (
          <Space
            size={24}
            className="toolbar-wrapper"
            style={{
              padding: '12px 20px',
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '8px',
              fontSize: '20px',
              color: '#fff',
            }}
          >
            <LeftOutlined onClick={() => onActive?.(-1)} style={{ cursor: 'pointer' }} />
            <RightOutlined onClick={() => onActive?.(1)} style={{ cursor: 'pointer' }} />
            <DownloadOutlined onClick={onDownload} style={{ cursor: 'pointer' }} />
            <SwapOutlined rotate={90} onClick={onFlipY} style={{ cursor: 'pointer' }} />
            <SwapOutlined onClick={onFlipX} style={{ cursor: 'pointer' }} />
            <RotateLeftOutlined onClick={onRotateLeft} style={{ cursor: 'pointer' }} />
            <RotateRightOutlined onClick={onRotateRight} style={{ cursor: 'pointer' }} />
            <ZoomOutOutlined
              disabled={scale === 1}
              onClick={onZoomOut}
              style={{ cursor: 'pointer' }}
            />
            <ZoomInOutlined
              disabled={scale === 50}
              onClick={onZoomIn}
              style={{ cursor: 'pointer' }}
            />
            <UndoOutlined onClick={onReset} style={{ cursor: 'pointer' }} />
          </Space>
        ),
        onChange: (index) => setCurrent(index),
      }}
    >
      {images.map((img, idx) => (
        <Image
          key={idx}
          src={`data:${img.mime_type};base64,${img.base64_content}`}
          alt={img.file_name || `Image-${idx}`}
          width={200}
          style={{ borderRadius: '8px', margin: '8px' }}
        />
      ))}
    </Image.PreviewGroup>
  );
};

export default FilePreview;
