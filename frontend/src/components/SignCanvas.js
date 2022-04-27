import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import classNames from "react-canvas-draw";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AuthService from "../services/auth-service"

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
        width: 400,
        height: 400,
        brushRadius: 1,
        lazyRadius: 12,
    };
    userID = AuthService.getCurrentUser().id

    canvasToImage = () => {
        console.log(this.saveableCanvas.canvasContainer.children[1].toDataURL());
        localStorage.setItem("signImage"+this.userID+window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1), this.saveableCanvas.canvasContainer.children[1].toDataURL())
    }

    

    render() {
         //+ "_KA:" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)).toString()
         let sign = ("savedDrawing" + "_uID:" + this.userID).toString();
         let signContract = ("savedDrawing" + "_uID:" + this.userID + "_KA:" + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)).toString();
        //console.log("canvas image to data", this.saveableCanvas.canvasContainer.children[1].toDataURL());
        return (
            <div>
                <Stack direction="row" spacing={2}>
                    <Item>
                        <div className={classNames.tools}>
                            <button
                                onClick={() => {
                                    localStorage.setItem(
                                        sign,
                                        this.saveableCanvas.getSaveData()

                                    ); this.canvasToImage()
                                }}
                            >
                                Opslaan
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
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={this.state.color}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                        />
                    </Item>
                    <Item>
                        <button
                            onClick={() => {
                                this.loadableCanvas.loadSaveData(
                                    localStorage.getItem(sign)
                                );
                                this.canvasToImage()
                            }}
                        >
                            Load what you saved previously into the following canvas. Either by
                            calling `loadSaveData()` on the component's reference or passing it
                            the `saveData` prop:
                        </button>

                        <CanvasDraw
                            style={{ float: 'right' }}
                            disabled
                            hideGrid
                            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                            saveData={localStorage.getItem(sign)}
                        />
                    </Item>
                </Stack>
            </div>
        );
    }
}
