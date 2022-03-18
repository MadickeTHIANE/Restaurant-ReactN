import { StyleSheet, TextInput, Button } from "react-native";
import { View } from "react-native-web";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/connexionSlice";

export default function connexion() {
  const [Email, onChangeEmail] = React.useState("madicke.thiane@gmail.com");
  const [Password, onChangePassword] = React.useState("@Magatte^");

  const datas = useSelector((state) => state.connexionData.value);
  const dispatch = useDispatch();

  const authentication = () => {
    return fetch("http://gelcs.fr/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    })
      .then((response) => response.json())
      .then((response) => dispatch(addData(response.response[0])))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Votre email"
        onChangeText={onChangeEmail}
        value={Email}
      />
      <TextInput
        style={styles.input}
        placeholder="Votre mot de passe"
        onChangeText={onChangePassword}
        value={Password}
      />
      <Button title="Valider" onPress={authentication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: 100,
    height: 20,
  },
  input: {
    height: 40,
    width: 360,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
