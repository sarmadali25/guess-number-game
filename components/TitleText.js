import React from "react"
import { View, Text, StyleSheet } from "react-native"

const TitleText = props => {
	return (
		<Text style={{ ...props.style, ...styles.titleText }}>
			{props.children}
		</Text>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontFamily: "open-sans-bold",
	},
})

export default TitleText
