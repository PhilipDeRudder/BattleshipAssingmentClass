import React, { Component } from 'react';
import { Text, View, Pressable, ShadowPropTypesIOS } from 'react-native';
import styles from '../style/style';
import Entypo from '@expo/vector-icons/Entypo';

let board = [];
const numb_rows = 5, numb_col = 5;
const Start = 'plus';
const Cross = 'cross';
const Circle = 'circle';

export default class Gameboard extends Component {
    //initializatie van het bord
    // de constructor zal als eerste worden aangeroepen en neemt props als een arfument
    //roept de parent aant door de super functie en geeft de props door aan de parent

    constructor(props) {
        super(props)
        this.state = {
            //iscross is een variabele om te zien welke speler aan de beurt is
            isCross: true,
            winner: '',
            Gamestatus: false,
            buttonText: 'Start Game',
            statusText: 'Game has not started',
            hits: 0,
            bombs: 15,
            ships: 3,
            timer: 0,
            shipPositions: []

        }
        this.initializeBoard();
    }





    //we gaan het bord tekenen door een plus te tekenen in elke cel van het bord
    initializeBoard() {
        for (let i = 0; i < numb_rows * numb_col; i++) {
            board[i] = Start;
        }
    }

    winGame() {

        //check if ship is hit
        //we hebben array van posities waar de schepen zich bevinden --> vergelijken met de posities waarop ze gedrukt hebben 
        //indien hit --> hit +1
        // indien niet niks
        // sws bombs -1
        // 

        if (3 === 4) {
            return board[0]
        } else {
            return ""
        }

    }

    drawItem(number) {
        //hier kijken of het een hit is
        if (this.state.Gamestatus) {
            if (board[number] === Start && this.winGame() === "") {
                board[number] = this.state.isCross ? Cross : Circle
                this.setState({ isCross: !this.state.isCross })
                if (this.winGame() !== "") {
                    this.setState({ winner: this.winGame() })
                }
                else if (board.indexOf(Start) === -1) {
                    this.setState({ winner: 'No winner' })
                }
            }
        } else {
            this.setState({ statusText: 'Click the start button first' })
        }

    }


    // neemt een nummer als argument adhv de user die aan de beurt is 
    chooseItemComor(number) {
        if (board[number] === Cross) {
            return "#FF3031"
        }
        else if (board[number] === Circle) {
            return "#45CE30"
        } else {
            return "#74B9FF"
        }
    }

    // deze functie zal alles terug naar het origineel zetten
    resetGame() {
        this.setState({
            isCross: true,
            Gamestatus: false,
            statusText: 'Game has not started',
            timer: 0,
            buttonText: "Start Game",
            ships: 0,
            bombs: 15,
            hits: 0,
            shipPositions: []
        })
        clearInterval(this.interval);
        this.initializeBoard();
    }

    StartGame() {
        if (this.state.buttonText === "Start Game") {
            this.setState({
                Gamestatus: true,
                statusText: 'Game on',
                buttonText: "New Game"
            })
            this.Timer();
            this.ChooseRandomPosition();
        }
        else if (this.state.buttonText === "New Game") {
            this.resetGame();
        }

    }

    GameOver() {
        this.setState({
            Gamestatus: false,
            statusText: 'Game over. Ships remaining',
            buttonText: "New Game"
        })
    }


    Timer() {
        this.interval = setInterval(() => this.updateSeconds(), 1000);
    }

    updateSeconds() {
        this.setState(state => ({
            timer: state.timer + 1
        }));

        if (this.state.timer === 30) {
            this.GameOver();
            clearInterval(this.interval);
        }
    }

    //posities van de schepen zetten
    //TODO: do while om te kijken of de gekozen posities al bestaan 
    ChooseRandomPosition() {
        for (let i = 0; i < 3; i++) {
            let randomNumber = Math.floor(Math.random() * 24 + 0);

            this.state.shipPositions.push(randomNumber);
        }

    }


    render() {
        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];
        const fourthRow = [];
        const fifthRow = [];


        for (let i = 0; i < numb_rows; i++) {
            firstRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemComor(i)}></Entypo>
                </Pressable>
            )
        }

        for (let i = numb_rows; i < numb_rows * 2; i++) {
            secondRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemComor(i)}></Entypo>
                </Pressable>
            )
        }

        for (let i = numb_rows * 2; i < numb_rows * 3; i++) {
            thirdRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemComor(i)}></Entypo>
                </Pressable>
            )
        }
        for (let i = numb_rows * 3; i < numb_rows * 4; i++) {
            fourthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemComor(i)}></Entypo>
                </Pressable>
            )
        }

        for (let i = numb_rows * 4; i < numb_rows * 5; i++) {
            fifthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.chooseItemComor(i)}></Entypo>
                </Pressable>
            )
        }


        return (
            <View style={styles.gameboard}>
                <View style={styles.flex}>{firstRow}</View>
                <View style={styles.flex}>{secondRow}</View>
                <View style={styles.flex}>{thirdRow}</View>
                <View style={styles.flex}>{fourthRow}</View>
                <View style={styles.flex}>{fifthRow}</View>
                <Pressable style={styles.button} onPress={() => this.StartGame()}>
                    <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                </Pressable>
                <Text style={styles.gameinfo}>Hits: {this.state.hits} Bombs: {this.state.bombs} Ships: {this.state.ships}</Text>
                <Text style={styles.gameinfo}>Time: {this.state.timer} seconds </Text>
                <Text>{this.state.statusText}</Text>
            </View>
        )
    }
}
