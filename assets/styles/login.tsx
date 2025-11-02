import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#4B0082"
  },
  card: {   
    width: screenWidth - 40,
    height: screenHeight / 3.3,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardView:{   
    width: screenWidth - 30,
    alignItems: 'center',
    flexDirection: "row", 
    marginTop: 50,
    justifyContent: 'space-evenly',
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
    height: screenHeight / 2.5,
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
    overflow: 'hidden',
  },
  cardformContainer:{
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: screenHeight / 2.5,
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    overflow: 'hidden',
    top: screenHeight * 0.18
  },
  textinput: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: screenWidth / 40 * 1.8,
    marginLeft: 9,
  },
  textinputItem: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: screenWidth / 40 * 1.8,
    marginLeft: 9,
    marginTop: 20,
  },
  eyeicon: { 
    bottom: screenHeight * 0.05,
    right: screenWidth * 0.05,
    alignSelf: 'flex-end',
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
    top: screenHeight * 0.1,
    color: "#fff", 
    left: screenWidth * 0.20, 
    fontSize: screenWidth / 40 * 3, 
  },
  fonttext:{
    color: '#fff',
    fontSize: screenWidth / 40 * 1.6,
  },
  register: {
    fontSize: screenWidth / 40 * 1.9,
    color: "#4B0082",
    fontWeight: "bold",
    marginLeft: 7,
  },
  accountText:{
   fontSize: screenWidth / 40 * 1.8, 
   color: "#000"
  },
  login: {
    color: '#fff',
    fontSize: screenWidth / 40 * 1.9,
    fontWeight: "bold",
    width: '100%',
    textAlign: 'center',
  },
  fontText: { 
    color: "#4B0082", 
    fontSize: screenWidth / 40 * 1.8, 
    marginTop: 20, 
    alignSelf: 'flex-end',
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
    color: '#000',
    borderColor: '#4B0082',
    borderWidth: 1,
    backgroundColor: 'transparent',
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
    width: '95%',
    height: '18%',
    borderRadius: 5,
    marginTop: '30%',
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
    width: '70%',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    fontSize: 16,
  },
})

export default styles;