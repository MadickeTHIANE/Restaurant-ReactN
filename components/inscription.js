import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";

export default function inscription() {
  const [name, onChangeName] = React.useState("THIANE");
  const [firstname, onChangeFirstname] = React.useState("Madické");
  const [email, onChangeEmail] = React.useState("madicke.thiane@gmail.com");
  const [password, onChangePassword] = React.useState("@Magatte^");

  const subscribe = () => {
    return fetch("http://gelcs.fr/api/users/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />
      <TextInput
        placeholder="firstname"
        style={styles.input}
        onChangeText={onChangeFirstname}
        value={firstname}
      />
      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />
      <Button title="Valider" onPress={subscribe} />
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
