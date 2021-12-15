import React, { useState, useRef, useEffect } from "react"
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	ScrollView,
	Dimensions,
} from "react-native"
import Card from "../components/Card"
import MainButton from "../components/MainButton"
import NumberContainer from "../components/NumberContainer"
import BodyText from "../components/BodyText"

import { Ionicons } from "@expo/vector-icons"
const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min)
	max = Math.floor(max)

	const rndNum = Math.floor(Math.random() * (max - min)) + min

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude)
	} else {
		return rndNum
	}
}

const renderListItem = (guess, numOfRound) => (
	<View style={styles.listItem}>
		<BodyText>#{numOfRound}</BodyText>
		<BodyText>{guess}</BodyText>
	</View>
)

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const [pastGuesses, setPastGuesses] = useState([initialGuess])
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	)

	const currentLow = useRef(1)
	const currentHigh = useRef(100)

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(Dimensions.get("window").height)
		}

		Dimensions.addEventListener("change", updateLayout)
		return () => {
			Dimensions.removeEventListener("change", updateLayout)
		}
	})

	const { userChoice, onGameOver } = props
	useEffect(() => {
		if (currentGuess === userChoice) {
			props.onGameOver(pastGuesses.length)
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't Lie", "You know you are wrong!", [
				{ text: "Sorry!", style: "cancel" },
			])
			return
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess
		} else {
			currentLow.current = currentGuess + 1
		}

		const nextGuess = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		)
		setCurrentGuess(nextGuess)
		setPastGuesses(curPastGuess => [nextGuess, ...curPastGuess])
	}

	if (Dimensions.get("window").height < 500) {
		return (
			<View style={styles.screen}>
				<Text>Opponent's Guess</Text>
				<View style={styles.controls}>
					<MainButton
						onPress={() => {
							nextGuessHandler("lower")
						}}
					>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton
						onPress={() => {
							nextGuessHandler("greater")
						}}
					>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) =>
							renderListItem(guess, pastGuesses.length - index)
						)}
					</ScrollView>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainner}>
				<MainButton
					onPress={() => {
						nextGuessHandler("lower")
					}}
				>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton
					onPress={() => {
						nextGuessHandler("greater")
					}}
				>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainner: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
		width: 400,
		maxWidth: "90%",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
	},
	listContainer: {
		flex: 1,
		width: "80%",
	},
	list: {
		alignItems: "center",
		justifyContent: "flex-end",
		flexGrow: 1,
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-around",
		width: "60%",
	},
})

export default GameScreen
