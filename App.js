import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Card from "./components/Card.js";
import Inscription from "./components/inscription";
import Connexion from "./components/connexion.js";
import { Provider } from "react-redux";
import store from "./redux/store";
import { addRestaurant } from "./redux/restaurantSlice.js";

export default function Launcher() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export function App() {
  const [Restaurants, setRestaurants] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [Menu, setMenu] = useState([]);
  const [Panier, setPanier] = useState([]);
  const [ShowInscription, setShowInscription] = useState(false);
  const [ChosenRestoId, setChosenRestoId] = useState(null);

  const datas = useSelector((state) => state.connexionData.value);

  useEffect(() => {
    fetch("http://gelcs.fr/api/restaurant")
      .then((response) => response.json())
      .then((response) => setRestaurants(response));
  }, []);

  const openModal = (infoMenu) => {
    setModalVisible(true);
    setMenu(infoMenu);
  };

  const renderItem = ({ item }) => {
    let menu = item.menu;
    menu = JSON.parse(menu);
    return (
      <Card
        name={item.name}
        address={item.address}
        score={item.score}
        menu={menu}
        openModal={openModal}
      />
    );
  };

  const menuDisplay = Menu.map((dish, key) => {
    const AddToPanier = () => {
      return datas.length != 0
        ? setPanier([...Panier, dish.name])
        : alert("Veuillez vous connecter");
    };
    return (
      <Pressable key={key} onPress={AddToPanier}>
        <Text>{dish.name}</Text>
      </Pressable>
    );
  });

  const sendOrder = () =>
    fetch("http://gelcs.fr/api/order/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menu: Panier,
      }),
    })
      .catch((error) => console.log(error))
      .then((response) => response.json())
      .then((response) => console.log(response));

  return (
    <View style={styles.container}>
      {!ShowInscription && (
        <Button
          title="S'inscrire"
          onPress={() => setShowInscription(!ShowInscription)}
        ></Button>
      )}
      {ShowInscription && (
        <Button
          title="Se connecter"
          onPress={() => setShowInscription(!ShowInscription)}
        ></Button>
      )}

      {ShowInscription && <Inscription />}
      {!ShowInscription && <Connexion />}

      <Modal visible={ModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modal}>{menuDisplay}</View>
          <Button
            title="Retour"
            onPress={() => setModalVisible(false)}
          ></Button>
          <Button title="Test" onPress={() => console.log(Panier)}></Button>
        </View>
      </Modal>
      <Text>Liste de restaurants</Text>
      <FlatList data={Restaurants} renderItem={renderItem}></FlatList>
      <Button title="Commander" onPress={sendOrder}></Button>
      <Button title="Test" onPress={() => console.log(Panier)}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
