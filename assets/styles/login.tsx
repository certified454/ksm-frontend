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
  cardView:{   
    width: "auto",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: "row", 
    marginTop: 50
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
  cardformContainer:{
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: 600,
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    overflow: 'hidden',
    position: "absolute", 
    top: 180
  },
  textinput: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 9,
  },
  textinputItem: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 9,
    marginTop: 20,
  },
  eyeicon: { 
    position: "absolute", 
    top: 158, 
    right: 40 
  },  
  text: {
    color: '#4B0082',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  textWelcome: {
    fontWeight: 'bold',
    fontFamily: 'serif',
    position: "absolute",
    top: 90,
    color: "#fff", 
    left: 85, 
    fontSize: 30 
  },
  fonttext:{
    color: '#fff',
    fontSize: 21,
  },
  register: {
    fontSize: 18,
    color: "#4B0082",
    fontWeight: "bold",
    marginLeft: 7,
  },
  accountText:{
   fontSize: 18, 
   color: "#000"
  },
  login: {
    color: '#fff',
    fontSize: 21,
    fontWeight: "bold" 
  },
  fontText: { 
    color: "#4B0082", 
    fontSize: 15, 
    marginTop: 20, 
    left: 195 
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
  buttonInside:{
    backgroundColor: '#4B0082',
    color: '#fff',
    width: '95%',
    height: 'auto',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center"
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