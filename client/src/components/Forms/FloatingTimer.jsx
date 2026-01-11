import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const FloatingTimer = ({ id, label, value = "00:00:00", onChange }) => {
  const [hours, minutes, seconds] = value.split(":");

  const handleChange = (unit, val) => {
    const newTime = {
      hours,
      minutes,
      seconds,
      [unit]: val,
    };
    const formatted = `${newTime.hours}:${newTime.minutes}:${newTime.seconds}`;
    onChange(formatted);
  };

  const renderOptions = (max) =>
    [...Array(max)].map((_, i) => {
      const val = String(i).padStart(2, "0");
      return (
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      );
    });

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            select
            label="Hours"
            value={hours}
            onChange={(e) => handleChange("hours", e.target.value)}
            fullWidth
            size="small"
            id={`${id}-hours`}
            variant="outlined"
            sx={{
              minWidth: "110px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          >
            {renderOptions(24)}
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            label="Minutes"
            value={minutes}
            onChange={(e) => handleChange("minutes", e.target.value)}
            fullWidth
            size="small"
            id={`${id}-minutes`}
            variant="outlined"
            sx={{
              minWidth: "110px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          >
            {renderOptions(60)}
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            label="Seconds"
            value={seconds}
            onChange={(e) => handleChange("seconds", e.target.value)}
            fullWidth
            size="small"
            id={`${id}-seconds`}
            variant="outlined"
            sx={{
              minWidth: "110px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          >
            {renderOptions(60)}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
};

export default FloatingTimer;
