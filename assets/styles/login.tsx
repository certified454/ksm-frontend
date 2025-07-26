import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",

  },
  card:{   
    width: "auto",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
  },
  cardposition:{
    position: 'absolute',
    color: '#000',
    fontSize: 16,
  },
  cardform:{
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: 600,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
    overflow: 'hidden',
  },
  textinput: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 9,
  },
  text: {
    color: '#4B0082',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  fonttext:{
    color: '#fff',
    fontSize: 21,
  },
  image: {
    width: 400,
    height: 250,
    borderRadius: 30
  },
  inputform: {
    margin: 7,
    height: 45,
    width: '95%',
    borderColor: '#4B0082',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  button:{
    backgroundColor: '#4B0082',
    color: '#fff',
    width: '95%',
    height: 'auto',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 70,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
  },
  onpress: {
    backgroundColor: '#fff',
    borderColor: '#ACACAC',
    borderWidth: 1,
    textAlign: 'center',
    color: '#000',
    width: '70%',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    fontSize: 16,
  },
})

export default styles;