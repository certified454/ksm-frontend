import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 40,
    maxHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  recordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'blue',
  },
  errorText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'red',
  },
});

export default styles;