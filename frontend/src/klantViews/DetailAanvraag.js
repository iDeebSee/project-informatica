import * as React from 'react';
import FeedbackDocumentPDF from '../components/FeedbackDocumentPDF';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';






export default function Detailaanvraag() {
    return (
     
                 <div >
            
           
                    
                        <Grid container spacing={0} style={{top: 20,height:500, position: 'relative',left: 5}}>
                           
                            <Grid item xs={2}  >
                            <Box sx={{  maxWidth: 200, bgcolor: 'Background.paper' }}>
                            
                                    <List>
                                    <ListItem  disablePadding>
                                        <ListItemText primary="Persoonsgegevens" />
                                    </ListItem>
                                    </List>
                                <Divider />
                                    <List>
                                    <ListItem >
                                        <ListItemText primary="naam" />
                                    </ListItem>
                                    <ListItem >
                                        <ListItemText primary="telNr..." />
                                    </ListItem>
                                    </List>
                                
                                </Box>
                              </Grid>
                              
                            <Grid item xs={2} >
                            <Box sx={{ width: '50%', maxWidth: 200, bgcolor: 'background.paper' }}>
                            
                                    <List>
                                    <ListItem  disablePadding>
                                       
                                        <ListItemText primary="fnancieel" />
                                    </ListItem>
                                    </List>
                                <Divider />
                                    <List>
                                    <ListItem >
                                        
                                        <ListItemText primary="zelf gefinancieerd" />
                                    </ListItem>
                                    <ListItem >
                                        <ListItemText primary="status" />
                                    </ListItem>
                                    </List>
                                
                                </Box>
                              </Grid>
                              <Grid item xs={8}>
                            <Box sx={{ width: '50%', maxWidth: 200, bgcolor: 'background.paper' }}>
                            
                                    <List>
                                    <ListItem disablePadding>
                                        
                                       
                                        <ListItemText primary="feedback document" />
                                    </ListItem>
                                    </List>
                                <Divider />
                                    <List>
                                    <ListItem >
                                        <ListItemText primary="hier komt feedbackdocument" />
                                    </ListItem>
                                    </List>
                                
                                </Box>
                              </Grid>




                            <Grid item xs={12} md={4}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{position: 'relative'}}>
                                <Button variant="contained">contract uploaden</Button>
                                <Button variant="contained">contract tekenen</Button>
                                <Button variant="contained">contract bekijken</Button>
                                </ButtonGroup>
                            </Grid>
                           
                        </Grid>
                   
    </div> 
           
    );
};

