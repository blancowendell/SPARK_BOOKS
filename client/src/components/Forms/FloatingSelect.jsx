// import React from 'react';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import InputAdornment from '@mui/material/InputAdornment';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// const FloatingSelect = ({
//   id,
//   label,
//   value,
//   onChange,
//   options = [],
//   fullWidth = true,
//   disabled = false,
// }) => {
//   return (
//     <TextField
//       select
//       id={id}
//       label={label}
//       value={value}
//       onChange={onChange}
//       variant="outlined"
//       fullWidth={fullWidth}
//       size="small"
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           borderRadius: '8px',
//         },
//       }}
//       disabled={disabled}
//     >
//       {options.length > 0 ? (
//         options.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))
//       ) : (
//         <MenuItem disabled value="">
//           <InfoOutlinedIcon
//             fontSize="small"
//             color="warning"
//             style={{ marginRight: 6 }}
//           />
//           No options available
//         </MenuItem>
//       )}
//     </TextField>
//   );
// };

// export default FloatingSelect;


import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FloatingSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  fullWidth = true,
  disabled = false,
}) => {
  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || null;

  return (
    <Autocomplete
      id={id}
      options={options}
      value={selectedOption}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(opt, val) =>
        String(opt.value) === String(val.value)
      }
      onChange={(_, newValue) =>
        onChange({
          target: { value: newValue ? newValue.value : "" },
        })
      }
      disabled={disabled}
      fullWidth={fullWidth}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      )}
    />
  );
};

export default FloatingSelect;
