import { Code } from "@mui/icons-material";
import { Grid, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

interface EmptyCodeEditorListProps {}

const EmptyCodeEditorList: React.FC<EmptyCodeEditorListProps> = () => (
  <Grid
    container
    spacing={2}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "65vh" }}
  >
    <Grid item>
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        Ainda não criou nenhum tild?
      </Typography>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        component={RouterLink}
        to="/code/new"
        sx={{
          bgcolor: "secondary.main",
          color: "crimson",
          "&:hover": {
            bgcolor: "#9146FF",
            color: "secondary.main",
          },
          "& .MuiButton-startIcon": {
            display: "flex",
            justifyContent: "center",
          },
        }}
        color="secondary"
        startIcon={<Code />}
      >
        Comece agora mesmo!
      </Button>
    </Grid>
  </Grid>
);

export default EmptyCodeEditorList;
