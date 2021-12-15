import React, { useState, useEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native"
import Colors from "../constants/colors"
import Card from "../components/Card"
import Input from "../components/Input"
import NumberContainer from "../components/NumberContainer"
import TitleText from "../components/TitleText"
import BodyText from "../components/BodyText"
import MainButton from "../components/MainButton"

export default function StartGameScreen(props) {
	const [enteredValue, setEnteredValue] = useState("")
	const [selectedNumber, setSelectedNumber] = useState()
	const [confirmed, setConfirmed] = useState(false)
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	)

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get("window").width / 4)
		}
		Dimensions.addEventListener("change", updateLayout)

		return () => {
			Dimensions.removeEventListener("change", updateLayout)
		}
	})

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""))
	}

	const resetInputHandler = () => {
		setEnteredValue("")
		setConfirmed(false)
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue)

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid Number", "Number should be between 1 and 99", [
				{ text: "Okay", styles: "destructive", onPress: resetInputHandler },
			])
			return
		}
		Keyboard.dismiss()
		setConfirmed(true)
		setSelectedNumber(chosenNumber)
		setEnteredValue("")
	}

	let confirmedOutput
	if (selectedNumber)
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					Start Game
				</MainButton>
			</Card>
		)
	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss()
					}}
				>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start A New Game!</TitleText>
						<Card style={styles.inputContainer}>
							<BodyText>Select A Number</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										title="RESET"
										color={Colors.accent}
										onPress={resetInputHandler}
									/>
								</View>
								<View style={styles.button}>
									<Button
										title="CONFIRM"
										color={Colors.primary}
										onPress={confirmInputHandler}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		padding: 10,
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	inputContainer: {
		width: "80%",
		minWidth: 300,
		maxWidth: "95%",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	// button: {
	// 	// width: 80,
	// 	width: Dimensions.get("window").width / 3,
	// },
	input: {
		width: 50,
		textAlign: "center",
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
})
