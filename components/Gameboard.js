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

    // function used in drawitem to see if game is won or not
    winGame() {
        if (this.state.hits > 2) {
            this.gameWon();
            return "winner"
        } else if (this.state.bombs < 1) {
            this.GameOver();
            return "loser"
        } else {
            return ""
        }


    }

    // draws cross or circle depending if it was a hit or not
    // also check if the game was already started
    drawItem(number) {
        if (this.state.Gamestatus) {
            if (board[number] === Start && this.winGame() === "") {
                // reduce the number of bombs
                this.setState({ bombs: this.state.bombs - 1 })
                // used indexof to check if a sertain ship was hit or not --> -1 if not hit
                if (this.state.shipPositions.indexOf(number) != -1) {
                    board[number] = Circle
                    this.setState({ hits: this.state.hits + 1 })
                    this.setState({ ships: this.state.ships - 1 })

                } else {
                    board[number] = Cross
                }

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

    // function to set color of cross and circle
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

    // this function will reset the game
    resetGame() {
        this.setState({
            isCross: true,
            Gamestatus: false,
            statusText: 'Game has not started',
            timer: 0,
            buttonText: "Start Game",
            ships: 3,
            bombs: 15,
            hits: 0,
            shipPositions: []
        })
        clearInterval(this.interval);
        this.initializeBoard();
    }

    // function to set al startvalues
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

    // funciton if game over --> ships remaining and no bombs left
    GameOver() {
        clearInterval(this.interval);
        this.setState({
            Gamestatus: false,
            statusText: 'Game over. Ships remaining',
            buttonText: "New Game"
        })
    }

    // if time is ran out
    gameOverTimeOut() {
        clearInterval(this.interval);
        this.setState({
            Gamestatus: false,
            statusText: 'Timeout. Ships remaining',
            buttonText: "New Game"
        })
    }


    // sinked all the ships
    gameWon() {
        clearInterval(this.interval);
        this.setState({
            Gamestatus: false,
            statusText: 'You sinked all ships.',
            buttonText: "New Game"
        })
    }


    // timer function
    Timer() {
        this.interval = setInterval(() => this.updateSeconds(), 1000);
    }

    //update every second + check if time is still remaining
    updateSeconds() {
        this.setState(state => ({
            timer: state.timer + 1
        }));

        if (this.state.timer === 30) {
            this.gameOverTimeOut();
            clearInterval(this.interval);
        }
    }

    // set random positions for all ships
    ChooseRandomPosition() {
        for (let i = 0; i < 3; i++) {
            let randomNumber = Math.floor(Math.random() * 24 + 0);
            console.log(randomNumber);
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
