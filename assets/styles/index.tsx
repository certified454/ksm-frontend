import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchcontaiiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  searchContainer: {
    width: "57%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    paddingLeft: 20,
    left: 50,
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  card:{   
    width: "auto",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
  },
  postcard: {
    width: "100%",
    height: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    top: 5,
    marginTop: 10
  },
  match: {
    width: 300,
    height: 170,
    backgroundColor: "#4B0082",
    marginLeft: 5,
    borderRadius: 5,
    marginInline: 3,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row"
  },
  imagecard:{
    width: 300,
    height: 190,
    borderRadius: 5,
  },
  textcontainer: {
    width: "100%",
    height: 30,
    position: "absolute",
    flex: 1,
    flexDirection: "row"
  },
  league: {
    position: "absolute",
    fontSize: 20,
    fontWeight: 600,
    color: "#fff"
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
    position: "absolute",
    top: 10,
    left: "55%",
    transform: [{ translateX: -50 }],
    objectFit: "cover"
  },
  generaltext: {
    color: "#4B0082",
    fontSize: 23,
    fontFamily: "serif",
    fontWeight: "bold",
    right: 100,
    paddingTop: 10
  },
  matchlogo:{
    width: 65,
    maxHeight: 65,
    position: "absolute",
    top: 50,
    left: 27,
    borderRadius: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  teamlogo: {
    width: 130,
    height: 130,
    objectFit: "contain",
    borderRadius: "100%"
  }
})

export default styles;