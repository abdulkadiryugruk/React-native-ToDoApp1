import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";

export default function App() {
  const [not, setNot] = useState("");
  const [notlar, setNotlar] = useState([]);

  const notEkle = useCallback(() => {
    if (not.trim() !== "") {
      setNotlar(prevNotlar => [...prevNotlar, { key: `${prevNotlar.length}`, text: not }]);
      setNot("");
      Keyboard.dismiss();
    } else {
      alert("Lütfen bir not girin.");
    }
  }, [not]);

  const notSil = useCallback((rowKey) => {
    setNotlar(prevNotlar => prevNotlar.filter(item => item.key !== rowKey));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.top}>To-Do List</Text>

      <SwipeListView
        showsHorizontalScrollIndicator={false}
        data={notlar}
        keyExtractor={item => item.key} // Benzersiz anahtar
        renderItem={(data) => (
          <View style={styles.not}>
            <Text style={styles.notText}>{data.item.text}</Text>
          </View>
        )}
        renderHiddenItem={(data) => (
          <View style={styles.rowBack}>
            <Pressable
              style={styles.backRightBtn}
              onPress={() => notSil(data.item.key)}
            >
              <Text style={styles.backTextWhite}>Sil</Text>
            </Pressable>
          </View>
        )}
        rightOpenValue={-60}
        disableRightSwipe
      />

      <View style={styles.inpBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task"
          placeholderTextColor={'gray'}
          value={not}
          onChangeText={setNot} // Daha kısa ve daha okunabilir
        />
        <Pressable onPress={notEkle} style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#257180",
  },
  top: {
    width: "100%",
    height: 40,
    textAlign: "center",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
  },
  inpBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    margin: 5,
  },
  input: {
    width: "75%",
    height: 40,
    fontSize: 20,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: '#D2E0FB',
  },
  btn: {
    width: "20%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CB6040",
  },
  btnText: {
    fontSize: 45,
    color: "white",
    textAlign: "center",
  },
  not: {
    width: "90%",
    backgroundColor: '#F2E5BF',
    height: 90,
    borderRadius: 15,
    margin: 10,
  },
  notText: {
    fontSize: 20,
    color: '#CB6040',
    textAlign: 'left',
    padding: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#CB6040',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 15,
    borderRadius: 15,
    margin: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: '#FD8B51',
    right: 0,
    borderRadius: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
});
