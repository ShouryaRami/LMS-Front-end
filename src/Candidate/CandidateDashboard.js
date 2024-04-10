import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CandidateSkillData from './CandidateData';
import CompanyDashboard from '../Company/CompanyDashboard';
import CompanyNavbar from '../Component/CompanyNavbar';

const CandidateDashboard = () => {
  // const cardData = Array.from(Array(20).keys()).map((index) => ({
  //   id: index + 1,
  //   title: `Card ${index + 1}`,
  //   description: `This is the description for Card ${index + 1}`,
  // }));
  const cardData=CandidateSkillData

  return (
    <>
    <CompanyNavbar/>
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        {cardData.map((card) => (
          <Grid item key={card.Skill_id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Card Media (Image) */}
              <CardMedia
        component="img"
        height="140"
        image="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
        alt=""
      />

              {/* Card Content */}
              <CardContent sx={{ flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}>
                {/* Card Title */}
                <Typography variant="h5" component="div">
                  {card.Skill_name}
                </Typography>

                {/* Card Description */}
                <Typography variant="body2" component="p" mt={1}>
                  {card.Skill_Description}
                </Typography>

                {/* Location Icon and Text */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                  <LocationOnRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2" component="span">
                    California, USA
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
};

export default CandidateDashboard;
