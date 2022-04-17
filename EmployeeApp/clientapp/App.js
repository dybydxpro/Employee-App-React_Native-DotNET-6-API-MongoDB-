import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Read from './Components/Read';

export default function App() {
  return (
    <View style={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Add" element={<Add/>}/>
          <Route path="/Edit/:id" element={<Edit/>}/>
          <Route path="/Read/:id" element={<Read/>}/>
        </Routes>
      </BrowserRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },*/
});
