import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 3,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4B0082",
    fontFamily: "serif",
  },
  container: {
    backgroundClip: "#eeeeee",
    flex: 1,
    justifyContent: "center",
    top: 20,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "auto",
    marginTop:10,
  },
  profile: {
    width:60,
    height: 60,
    borderRadius: 100,
    marginTop: 0,
    borderWidth: 0.2
  },
  card:{   
    width: "93%",
    height: 250,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    right: 2,
    overflow: "hidden",
    justifyContent: "center",
    bottom: 20
  },
  createcard: {
    width: "93%",
    height: "auto",
    borderRadius: 10,
    bottom: 30,
    marginTop: 80
  },
  imagecard:{
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover"
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
  text: {
    fontSize: 25,
    fontFamily: "serif"
  },
  post: {
    width: "93%",
    height: "auto",
  },
  button:{
    backgroundColor: '#4B0082',
    color: '#fff',
    width: "100%",
    height: "auto",
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    top: 15
  },
  fonttext:{
    color: '#fff',
    fontSize: 21,
  },
  
})

export default styles;