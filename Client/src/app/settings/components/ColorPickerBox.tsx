import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { SketchPicker } from "react-color";
import Dialog from "@mui/material/Dialog";

export default function ColorPickerBox() {
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);

  //Convert transparency number to hexadecimal
  const convertTransparencyToHex = (transparency: number): string => {
    const alpha = Math.round(transparency * 255); // Convert transparency to a value between 0 and 255
    return alpha.toString(16).padStart(2, "0"); // Convert to 2-digit hex and pad with '0' if needed
  };

  const handleColorChange = (newColor: any) => {
    //Concat the 2-digit hex as a transparency number to newColor.hex
    const transparentColor = newColor.hex.concat(
      convertTransparencyToHex(newColor.rgb.a)
    );
    setColor(transparentColor); //Push the changed color to color state
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value); //Push the hex code
  };

  //Open and close a color picker
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <Box
      border="1px solid #ACACAC"
      borderRadius={2}
      width={160}
      p={3}
      display="flex"
      alignItems="center"
    >
      <IconButton
        sx={{
          backgroundColor: color,
          border: 1,
          borderRadius: 2,
          p: 6,
          "&:hover": {
            backgroundColor: color,
          },
        }}
        onClick={togglePicker}
      ></IconButton>
      <TextField
        value={color}
        onChange={handleInputChange}
        sx={{
          "& .MuiInputBase-input": { py: 0 },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
      <Dialog onClose={togglePicker} open={showPicker}>
        <SketchPicker color={color} onChange={handleColorChange} />
      </Dialog>
    </Box>
  );
}
