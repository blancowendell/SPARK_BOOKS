import React from "react";
import { Slider, Typography, InputNumber, Row, Col } from "antd";

const FloatingSlider = ({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  required = false,
  showValue = true,
  disabled = false,
}) => {
  const isInvalid = required && (value === undefined || value === null);
  const helperText = isInvalid ? `${label} is required.` : "";

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <Typography.Text strong>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography.Text>
      )}

      <Row gutter={12} align="middle">
        <Col flex="auto">
          <Slider
            id={id}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            disabled={disabled}
            tooltip={{ formatter: (val) => showValue ? val : null }}
          />
        </Col>
        <Col>
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{ width: 80 }}
          />
        </Col>
      </Row>

      {helperText && (
        <Typography.Text type="danger" style={{ fontSize: "12px" }}>
          {helperText}
        </Typography.Text>
      )}
    </div>
  );
};

export default FloatingSlider;
