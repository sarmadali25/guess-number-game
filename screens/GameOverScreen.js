import React from "react"
import {
	View,
	Text,
	StyleSheet,
	Button,
	Image,
	Dimensions,
	ScrollView,
} from "react-native"
import BodyText from "../components/BodyText"
import MainButton from "../components/MainButton"
import TitleText from "../components/TitleText"
import colors from "../constants/colors"

const GameOverScreen = props => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						fadeDuration={800}
						/*
				     ! For using network image  
				* source={{
				*	 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkk_BwZTq3ihBnnNKsT6ydAg0A3qcubs6I_g&usqp=CAU",
				* }}
				 */

						/* 
					! For Local image,use following code
					*/
						source={require("../assets/success.png")}
					/>
				</View>
				<View style={styles.resultText}>
					<BodyText
						style={{
							fontSize: Dimensions.get("window").height < 600 ? 10 : 20,
							marginVertical: Dimensions.get("window").height < 600 ? 10 : 20,
							textAlign: "center",
						}}
					>
						Your Phone Needed{" "}
						<Text style={styles.textHighlight}>{props.roundsNumber}</Text> To
						Guess The Number{" "}
						<Text style={styles.textHighlight}>{props.userNumber}</Text>
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>New Game</MainButton>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	textHighlight: {
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
	resultText: {
		marginHorizontal: 60,
	},
})

export default GameOverScreen
