import React, { useState, type PropsWithChildren } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Realm, { BSON } from "realm";
import { addBook, deleteAllBooks, getAllBooks, updateAllBookEditions } from "./src/store/databases";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';

const App = () => {

  // In our page, add the state with default state from our getAllBooks function.
  const [data, setData] = useState(getAllBooks());

  // for (let i = 0; i < 3; i++) {
  //   realm.write(() => {
  //     const book = realm.create('Book', {
  //       title: 'Barry Butter' + i,
  //       pages: 400
  //     });
  //   });
  // }

  return (
    <SafeAreaProvider style={style.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Add Book" style={{ paddingVertical: 8}}
          onPress={() => {
            // Add a book with a random number of pages called "Chronicles of JavaScript"
            addBook("Chronicles of JavaScript", Math.floor(Math.random() * 500))
            setData(getAllBooks())
          }}/>

        <Button title={"update book"} style={{ paddingVertical: 8 }}
          onPress={() => {
            updateAllBookEditions()
            setData(getAllBooks())
          }}/>

        <Button title={"delete all book"} style={{ paddingVertical: 8 }}
          onPress={() => {
            deleteAllBooks()
            setData(getAllBooks())
          }}/>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{item.title}</Text>
              <Text>{item.pages}</Text>
              <Text>{item.edition === null ? 'null' : item.edition}</Text>
            </View>
          )
        }} />
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  }
})

export default App;
