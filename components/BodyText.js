import React from "react"
import { View, Text, StyleSheet } from "react-native"

const BodyText = props => {
	return (
		<Text style={{ ...props.style, ...styles.bodyText }}>{props.children}</Text>
	)
}

const styles = StyleSheet.create({
	bodyText: {
		fontFamily: "open-sans",
	},
})

export default BodyText
