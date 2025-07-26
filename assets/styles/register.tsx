import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  card:{   
    width: "auto",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    top: 10
  },
  cardposition:{
    position: 'absolute',
    color: '#000',
    fontSize: 16,
  },
  cardform:{
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
    height: 'auto',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textinput: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 29,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  profilePicturePlaceholder:{
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderText: {
    color: '#4B0082',
    fontSize: 14,
    textAlign: 'center',
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
    width: '85%',
    borderColor: '#4B0082',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  button:{
    backgroundColor: '#4B0082',
    color: '#fff',
    width: '85%',
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