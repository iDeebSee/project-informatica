import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import classNames from "react-canvas-draw";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AuthService from "../services/auth-service"
import ContractService from "../services/contract-service"


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default class SignCanvas extends Component {


    state = {
        color: "#192846",
        width: 300,
        height: 300,
        brushRadius: 1,
        lazyRadius: 12,
    };
    userID = AuthService.getCurrentUser().id


    SaveHandtekening(id, handtekening) {

        console.log("handtekening", handtekening.split(';base64,')[1]);
        const handtekeningBase64 = handtekening.split(';base64,')[1];

        ContractService.update(id, handtekeningBase64);
        window.location.reload();
    }

  


    render() {
         
        return (
            <div>
                <Stack direction="row" spacing={2}>
                    <Item>
                        <div className={classNames.tools}>
                            <button
                                onClick={() => {
                                 
                                    this.SaveHandtekening(this.props.id, this.saveableCanvas.canvasContainer.children[1].toDataURL());

                                }}
                            >
                                Sla handtekening op
                            </button>
                            <button
                                onClick={() => {
                                    this.saveableCanvas.eraseAll();
                                }}
                            >
                                Verwijder
                            </button>
                            <button
                                onClick={() => {
                                    this.saveableCanvas.undo();
                                }}
                            >
                                Maak ongedaan
                            </button>

                        </div>
                        <CanvasDraw
                            id="divToPrint"
                            hideGrid
                            hideInterface
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={this.state.color}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                        />
                    </Item>
                    
                </Stack>
            </div>
        );
    }
}
