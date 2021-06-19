import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02375a',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 2.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_header1: {
    marginTop: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  forgot: {
    color: '#02375a',
    marginTop: 5,
    padding: 10,
    alignSelf: 'flex-end',
  },
  signup: {
    color: '#FF2B00',
    marginTop: 15,
    padding: 10,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonx: {
    alignItems: 'center',
    backgroundColor: '#02375a',
    paddingVertical: 10,
    width: '60%',
    height: 50,
    borderRadius: 8,
    marginTop: 20,
    padding: 20,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#FF2B00',
    paddingVertical: 10,
    marginTop: 10,
    width: '60%',
    height: '6%',
    borderRadius: 8,
  },
});
export default styles;