import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 10,
    alignItems: 'center',
  },
  card:{   
    width: "auto",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    top: 10
  },
  cardItem:{   
    borderRadius: 10,
    alignItems: 'center',
    marginTop: screenHeight * 0.08,
  },
  cardItems: {  
    width: screenWidth - 40, 
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  textInputView: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  cardposition:{
    position: 'absolute',
    color: '#000',
    fontSize: 16,
  },
  passwordContainer: { 
    position: "absolute", 
    right: 20 
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
    fontSize: screenWidth / 40 * 1.8,
    marginLeft: screenWidth / 40 * 1,
  },
  textinputItem: {
    color: '#000',
    alignSelf: 'flex-start',
    fontSize: screenWidth / 40 * 1.8,
    marginLeft: screenWidth / 40 * 1,
    marginTop: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  profilePicturePlaceholder:{
    width: screenWidth / 3 * 1.5,
    height: screenHeight / 11 * 1.5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  placeholderText: {
    color: '#4B0082',
    fontSize: screenWidth / 40 * 1.8,
    textAlign: 'center',
  },
  text: {
    color: '#4B0082',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  createText: {
    color: '#4B0082',
    fontSize: screenWidth / 40 * 2.5,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginTop: 10, 
  },
  inputForm: {
    marginTop: 15,
    borderBottomWidth: 1,
    width: screenWidth - 150,
    fontSize: screenWidth / 40 * 1.8
  },
  pen: {
    bottom: screenHeight * 0.03,
    right: screenWidth * 0.15,
    alignSelf: 'flex-end',
  },
  fonttext:{
    color: '#fff',
    fontSize: screenWidth / 40 * 1.9,
    fontWeight: "bold",
    textAlign: 'center',
  },
  login: {
    fontSize: screenWidth / 40 * 1.8,
    fontWeight: "bold",
    color: '#4B0082'
  },
  fontText:{
    fontSize: screenWidth / 40 * 1.8, 
    color: "#000" 
  },
  sepration: { 
    fontSize: screenWidth / 40 * 1.8, 
    color: "#000"
  },
  image: {
    width: 400,
    height: 250,
    borderRadius: 30
  },
  inputform: {
    margin: 7,
    height: 45,
    width: screenWidth / 40 * 35,
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
    width: screenWidth / 40 * 35,
    height: screenHeight / 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50,
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