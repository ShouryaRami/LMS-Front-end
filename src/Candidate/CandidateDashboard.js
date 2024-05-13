import React from "react";
import { Card, CardContent, Typography, Grid, Button, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CandidateSkillData from "./CandidateData";

const CandidateDashboard = () => {
  const cardData = CandidateSkillData;
  const navigate = useNavigate(); // Hook for navigation

  const handleOpenSkill = (skillId) => {
    navigate(`/Candidate/Skill/${skillId}`); // Navigate to skill details page with skillId parameter
  };

  return (
    <>
      <CandidateDashboard />
      <div style={{ padding: 20 }}>
        <Grid container spacing={3}>
          {cardData.map((card) => (
            <Grid item key={card.Skill_id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 8,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1, color: "#333" }}>
                      {card.Skill_name}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ color: "#666" }}>
                      {card.Skill_Description}
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={20}
                    sx={{ marginTop: 5, borderRadius: 4, height: 7 }}
                  />
                </CardContent>
                <Button
                  onClick={() => handleOpenSkill(card.Skill_id)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  Open Skill
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default CandidateDashboard;
