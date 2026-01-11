import React from "react";
import {
  Typography,
  Tooltip,
  IconButton,
  Divider,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Rnd } from "react-rnd";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { MdContentCopy } from "react-icons/md";

const WidgetPreviewCanvas = ({
  widgets,
  guidelines,
  handleUndo,
  handleRedo,
  past,
  future,
  onDrag,
  onResize,
  handleWidgetUpdate,
  duplicateWidget,
  renderWidgetContent,
  addAutoWidgets,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddCards = (count) => {
    addAutoWidgets("card", count);
    handleMenuClose();
  };

  return (
    <div className="w-full h-full p-4 bg-gray-100 rounded-md overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h6">Preview</Typography>
        <div className="flex gap-2">
          <Tooltip title="Undo (Ctrl+Z)">
            <IconButton onClick={handleUndo} disabled={past.length <= 1}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo (Ctrl+Y)">
            <IconButton onClick={handleRedo} disabled={future.length === 0}>
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <div>
            <Button variant="outlined" size="small" onClick={handleMenuOpen}>
              Add Cards
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {[3, 4, 6].map((num) => (
                <MenuItem key={num} onClick={() => handleAddCards(num)}>
                  {`Add ${num} Cards`}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>

      <Divider className="mb-4" />

      <div className="relative w-full h-full bg-white border rounded-md overflow-hidden">
        {guidelines.x !== null && (
          <div
            className="absolute top-0 w-[1px] h-full bg-red-500 z-[9999]"
            style={{ left: guidelines.x }}
          />
        )}
        {guidelines.y !== null && (
          <div
            className="absolute left-0 w-full h-[1px] bg-red-500 z-[9999]"
            style={{ top: guidelines.y }}
          />
        )}

        {widgets.map((widget) => (
          <Rnd
            key={widget.id}
            bounds="parent"
            size={{ width: widget.width, height: widget.height }}
            position={{ x: widget.x, y: widget.y }}
            onDragStop={(e, d) => {
              handleWidgetUpdate(widget.id, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              handleWidgetUpdate(widget.id, {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                x: position.x,
                y: position.y,
              });
            }}
            onDrag={(e, d) =>
              onDrag(widget.id, d.x, d.y, widget.width, widget.height)
            }
            onResize={(e, direction, ref, delta, position) =>
              onResize(
                widget.id,
                position.x,
                position.y,
                parseInt(ref.style.width),
                parseInt(ref.style.height)
              )
            }
          >
            <div className="relative h-full w-full border rounded-md bg-white shadow-md p-2">
              <div
                className="absolute top-1 right-1 cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => duplicateWidget(widget.id)}
                title="Duplicate Widget"
              >
                <MdContentCopy size={16} />
              </div>
              {renderWidgetContent(widget)}
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default WidgetPreviewCanvas;

